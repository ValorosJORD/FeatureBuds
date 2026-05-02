<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { api } from '$lib/api';
  import { goto } from '$app/navigation';

  interface Comment {
    projectId: string;
    commentId: string;
    userId: string;
    bodyText: string;
    createdAt: string;
  }

  let bodyText = $state('');
  let updated = $state(false);
  let deleted = $state(false);

  const projectId = page.params.projectId;
  const commentId = page.params.commentId;

  onMount(async () => {
  const result = await api.get<Comment>(`/comments/${commentId}`);

    if (result.ok) {
      bodyText = result.data.bodyText;
    }
  });

  async function updateComment(): Promise<void> {

    const result = await api.patch(`/comments/${commentId}`, {
      bodyText
    });

    if (!result.ok) {
      return;
    }
    
    updated = true;
    deleted = false;
        
  }

  async function deleteComment(): Promise<void> {
    const result = await api.del(`/comments/${commentId}`);
    if(result.ok) {
      updated = false;
      deleted = true;

      goto(`/projects/${projectId}`)

    }
  }
</script>

 
<h1>Your Comment</h1>

  <label>
    Body
    <textarea bind:value={bodyText}></textarea>
  </label>

  <button onclick={updateComment}>Update</button>
  <button onclick={deleteComment}>Delete</button>
  {#if deleted}
    <p>Comment Deleted</p>
  {/if}

  {#if updated}
    <p>Comment Updated</p>
  {/if}
  
<p><a href={`/projects/${projectId}`}>Back to Project</a></p>


<style>
  h1, label, p, a{
    color: white;
  }

  textarea {
    color: black;
  }

</style>