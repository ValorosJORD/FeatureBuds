<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { api } from '$lib/api';
  import { goto } from '$app/navigation';

  interface Reply {
    replyId: string;
    commentId: string;
    userId: string;
    bodyText: string;
    createdAt: string;
  }

  let bodyText = $state('');
  let updated = $state(false);
  let deleted = $state(false);

  const projectId = page.params.projectId;
  const replyId = page.params.replyId;

  onMount(async () => {
  const result = await api.get<Reply>(`/replies/${replyId}`);

    if (result.ok) {
      bodyText = result.data.bodyText;
    }
  });

  async function updateReply(): Promise<void> {

    const result = await api.patch(`/replies/${replyId}`, {
      bodyText
    });

    if (!result.ok) {
      return;
    }
    
    updated = true;
    deleted = false;
        
  }

  async function deleteReply(): Promise<void> {
    const result = await api.del(`/replies/${replyId}`);
    if(result.ok) {
      updated = false;
      deleted = true;

      goto(`/projects/${projectId}`)

    }
  }
</script>

 
<h1>Your Reply</h1>

  <label>
    Body
    <textarea bind:value={bodyText}></textarea>
  </label>

  <button onclick={updateReply}>Update</button>
  <button onclick={deleteReply}>Delete</button>
  {#if deleted}
    <p>Reply Deleted</p>
  {/if}

  {#if updated}
    <p>Reply Updated</p>
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