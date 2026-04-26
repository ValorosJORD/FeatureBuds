<script lang="ts">
  import { auth } from '$lib/auth.svelte';

  let id = $state();

  async function accountClicked(): Promise<void> {
    if (auth.user) {
      id = auth.user.userId;
    }
  }
</script>

<nav class="navbar">
  <ul>
    <li><a href="/" class="contrast-text"><strong>FeatureBuds</strong></a></li>
  </ul>
  <ul>
    <li><a href="/projects" class="contrast-text">Projects</a></li>
    <li><a href="/posts" class="contrast-text">Forum</a></li>
    <li>
      {#if auth.loading}
        <p aria-busy="true" class="contrast-text">Checking session…</p>
      {:else if auth.user}
        <a onclick={accountClicked} href="/users/{id}" class="contrast-text">Account</a>
      {:else}
        <a href="/login" class="contrast-text">Login/Register</a>
      {/if}
    </li>
  </ul>
</nav>

<style>
  .navbar {
    background-color: var(--pico-primary);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .contrast-text {
    color: var(--pico-primary-inverse);
  }
</style>
