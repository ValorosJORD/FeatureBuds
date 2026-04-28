<script lang="ts">
  import { auth } from '$lib/auth.svelte';
</script>

<article>
  <h1>Welcome to FeatureBuds</h1>

  {#if auth.loading}
    <p aria-busy="true">Checking session…</p>
  {:else if auth.user}
    <p>Signed in as <strong>{auth.user.username}</strong> ({auth.user.email}).</p>
  {:else}
    <p>
      You are not signed in. If this is your first time using FeatureBuds, register for an account!
    </p>
    <a href="/register" class="button-link">
      <button>Register Now</button>
    </a>
  {/if}
</article>

<article>
  <h1><strong>What is FeatureBuds?</strong></h1>
  <p>
    FeatureBuds is the ultimate repository for all artists looking to manage their musical works
    quickly and effectively. With support for nearly every audio file type, and plans for increased
    DAW support, FeatureBuds is designed to put you on the cutting edge of project management so you
    can spend more time doing what you actually love.
  </p>
  <h2>How many files can a FeatureBuds repo hold?</h2>
  <p>
    Each project is alotted up to 512MB of space currently. Theoretically, as many files as you can
    hold within that limit is allowed.
  </p>
  <h2>How do I export my projects from FeatureBuds to my DAW?</h2>
  <p>While an export feature is not yet implemented, it is planned!</p>

  <footer></footer>
</article>
