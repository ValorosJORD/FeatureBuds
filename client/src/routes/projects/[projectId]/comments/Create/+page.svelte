<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { api } from '$lib/api';
  import { goto } from '$app/navigation';

  let bodyText = $state('');
  let submitting = $state(false);
  let created = $state(false);
  let userId = $state('');

 onMount(async () => {
    const user = await api.get<{ userId: string }>('/me');
    if (user.ok) {
      userId = user.data.userId;
    }
  });

  async function createComment(event: Event): Promise<void> {
      event.preventDefault();
      submitting = true;
      created = false;

      if(!userId){
        console.error('User not logged yet');
        submitting = false;
        return;
      }
      

      const result = await api.post(`/projects/${page.params.projectId}/comments`,{
        userId,
        bodyText
      });

      if (!result.ok) {
        console.error('Failed to create comment');
        submitting = false;
        return;
      }
    
      submitting = false;
      created = true;

      goto(`/projects/${page.params.projectId}`);
  }

  </script>

  <h1>Create Comment</h1>

  <form onsubmit={createComment}>
    <label>
      Comment
      <textarea bind:value={bodyText} required></textarea>
    </label>

    <button type="submit" disabled={submitting || created}>
      {submitting ? 'Creating...' : created ? 'Created!' : 'Create Comment'}
    </button>
  </form>

<p><a href={`/projects/${page.params.projectId}`}>Back to project</a></p>

<style>
  h1, label, p, a{
    color: white;
  }

  input, textarea {
    color: black;
  }
</style>
