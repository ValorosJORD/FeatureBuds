<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { api } from '$lib/api';
  import { goto } from '$app/navigation';

  interface Post {
    postId: string;
    title: string;
    topic: string;
    bodyText: string;
  }

  let title = $state('');
  let topic = $state('');
  let bodyText = $state('');
  let updated = $state(false);
  let deleted = $state(false);

  const projectId = page.params.projectId;

  const postId = page.params.postId;

  onMount(async () => {
  const result = await api.get<{ result: Post }>(`/posts/${postId}`);

    if (result.ok) {
      title = result.data.result.title;
      topic = result.data.result.topic;
      bodyText = result.data.result.bodyText;
    }
  });

  async function updatePost(): Promise<void> {

    const result = await api.patch(`/posts/${postId}`, {
      title,
      topic,
      bodyText
    });

    if (!result.ok) {
      return;
    }
    
    updated = true;
    deleted = false;
        
  }

  async function deletePost(): Promise<void> {
    const result = await api.del(`/posts/${postId}`);
    if(result.ok) {
      updated = false;
      deleted = true;

      goto(`/projects/${projectId}/posts`);

    }
  }
</script>

 
<h1>Your Post</h1>

  <label>
    Title
    <input type="text" bind:value={title} />
  </label>

  <label>
    Topic
    <input type="text" bind:value={topic} />
  </label>

  <label>
    Body
    <textarea bind:value={bodyText}></textarea>
  </label>

  <button onclick={updatePost}>Update</button>
  <button onclick={deletePost}>Delete</button>
  {#if deleted}
    <p>Post Deleted</p>
  {/if}

  {#if updated}
    <p>Post Updated</p>
  {/if}

<p><a href={`/projects/${projectId}/posts`}>Back to Posts</a></p>


<style>
  h1, label, p, a{
    color: white;
  }

</style>