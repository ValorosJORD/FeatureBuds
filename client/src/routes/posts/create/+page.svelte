<script lang='ts'>
  import {goto} from '$app/navigation';
  import { api } from '$lib/api';

  let title = $state('');
  let topic = $state('');
  let bodyText = $state('');
  let submitting = $state(false);
  let created = $state(false);

  async function handleSubmit(event: Event): Promise<void> {
      event.preventDefault();
      submitting = true;
      created = false;

      const result = await api.post('/api/posts',{
        title,
        topic,
        bodyText
      });

      if (!result.ok) {
        console.error('Failed to create post');
        submitting = false;
        return;
      }
      const newPost = result.data;
      submitting = false;
      created = true;

      goto(`/posts/${newPost.postId}`);
  }
</script>



<h1>Create Post</h1>

<form onsubmit={handleSubmit}>
  <label>
    Title
    <input type="text" bind:value={title} required />
  </label>

  <label>
    Topic
    <input type="text" bind:value={topic} required />
  </label>

  <label>
    Body
    <textarea bind:value={bodyText} required></textarea>
    <!-- represents a multiline -->
  </label>

  <button type="submit" disabled={submitting || created}>
    {submitting ? 'Creating...' : created ? 'Created!' : 'Create Post'}
  </button>
</form>

<p><a href="/posts">Back to posts</a></p>
