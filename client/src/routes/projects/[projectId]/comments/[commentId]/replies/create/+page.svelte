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

  async function createReply(event: Event): Promise<void> {
    event.preventDefault();

    submitting = true;
    created = false;

    if (!userId) {
      console.error('User not logged yet');
      submitting = false;
      return;
    }

    const result = await api.post('/replies', {
      commentId: page.params.commentId,
      userId,
      bodyText
    });

    if (!result.ok) {
      console.error('Failed to create reply');
      submitting = false;
      return;
    }

    submitting = false;
    created = true;

    goto(`/projects/${page.params.projectId}`);
  }
</script>

<h1>Create Reply</h1>

<form onsubmit={createReply}>
  <label>
    Reply
    <textarea bind:value={bodyText} required></textarea>
  </label>

  <button type="submit" disabled={submitting || created}>
    {submitting ? 'Creating...' : created ? 'Created!' : 'Create Reply'}
  </button>
</form>

<p>
  <a href={`/projects/${page.params.projectId}`}>Back to project</a>
</p>

<style>
  h1,　label,　p, a {
    color: white;
  }

  textarea {
    color: black;
  }
</style>