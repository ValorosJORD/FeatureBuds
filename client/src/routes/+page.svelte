<script lang="ts">
  import { auth } from '$lib/auth.svelte';
</script>

<h1>Welcome</h1>
<p>This is your Svelte + Express starter template.</p>

{#if auth.loading}
  <p aria-busy="true">Checking session…</p>
{:else if auth.user}
  <p>Signed in as <strong>{auth.user.username}</strong> ({auth.user.email}).</p>
{:else}
  <p>You are not signed in.</p>
{/if}

<article>
  <header><strong>Next steps</strong></header>
  <ol>
    <li>Add API routes in <code>src/index.ts</code> under the <code>/api</code> prefix.</li>
    <li>Build pages under <code>client/src/routes/</code>.</li>
    <li><a href="/projects">View Projects</a></li>
  </ol>
  <footer>
    <a href="/login" class="button-link">
      <button>Login Now</button>
    </a>
  </footer>
</article>
