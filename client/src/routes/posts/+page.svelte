<script lang="ts">
  import { onMount } from 'svelte';
  import Loading from '$lib/components/Loading.svelte';
  import { api } from '$lib/api';
  import { goto } from '$app/navigation';

  interface Post {
    postId: string;
    userId: string;
    title: string;
    topic: string;
    bodyText: string;
    createdAt: string;
  }

  let posts: Post[] = $state([]);
  let loading = $state(true);

  onMount(async() => {
    const result = await api.get<{ result: Post[] }>('/posts');

    if (result.ok) {
      posts = result.data.result;
    }
    loading = false;
  });
  </script>

  <h1>Posts</h1>

  <button onclick={() => goto('/posts/create')}>
    Create a Post
  </button>

  {#if loading}
    <Loading/>
  {:else if posts.length === 0}
    <p>No posts yet.</p>
  {:else}
    {#each posts as post}
    <div class="post-card">
      <h2>{post.title}</h2>

      <p>User:{post.userId}</p>
      <p>Created:{post.createdAt}</p>
      <p>Topic:{post.topic}</p>
      <p>{post.bodyText}</p>
      <a href={`/posts/${post.postId}`}>View details</a>
    </div>
  {/each}
{/if}

<style>
  .post-card {
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;

    color: white;
  }
  h1, h2, p, a{
    color: white;
  }
  a{
    text-decoration: underline;
  }

  button {
    color: white;
    border: 1px solid white;
    margin-bottom: 20px;
  }


</style>


