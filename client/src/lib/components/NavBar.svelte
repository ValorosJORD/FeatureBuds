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
    <li>
      <a href="/" class="contrast-text link">
        <strong>
          <img src="/logo/featurebudslogo.png" class="logo-image" alt="Home" />
        </strong>
      </a>
    </li>
  </ul>
  <ul>
    <li><strong><a href="/projects" class="contrast-text link">Projects</a></strong></li>
    <li><strong><a href="/posts" class="contrast-text link">Forum</a></strong></li>
    <li>
      {#if auth.loading}
        <p aria-busy="true" class="contrast-text link">Checking session…</p>
      {:else if auth.user}
        <strong>
          <a onclick={accountClicked} href="/users/{id}" class="contrast-text link">Account</a>
        </strong>
      {:else}
        <strong><a href="/login" class="contrast-text link">Login/Register</a></strong>
      {/if}
    </li>
  </ul>
</nav>

<style>
  .navbar {
    aspect-ratio: 15 / 1;
    width: 100%;
    background-image: url('/navbarbg/navbar.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .contrast-text {
    color: var(--pico-primary-inverse);
  }

  .logo-image {
    width: 8rem;
    aspect-ratio: 8 / 3;
    border: none;
    cursor: pointer;
  }

  .link {
    transition: 0.25s;
  }

  .link:hover {
    transform: scale(1.1);
    transition: 0.25s;
  }
</style>
