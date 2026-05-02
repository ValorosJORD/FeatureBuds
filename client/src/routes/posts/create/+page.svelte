<script lang='ts'>
  import {goto} from '$app/navigation';
  import { api } from '$lib/api';
  import { onMount } from 'svelte';


  let title = $state('');
  let topic = $state('');
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

  async function handleSubmit(event: Event): Promise<void> {
      event.preventDefault();
      submitting = true;
      created = false;

      if(!userId){
        console.error('User not logged yet');
        submitting = false;
        return;
      }
      

      const result = await api.post('/posts',{
        title,
        topic,
        bodyText,
        userId
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

<style>
  h1, label, p, a{
    color: white;
  }

  input, textarea {
    color: black;
  }
</style>