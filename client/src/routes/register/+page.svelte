<!-- client/src/routes/register/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { api } from '$lib/api';
  import { toast } from '$lib/toast.svelte';

  let email = $state('');
  let password = $state('');
  let username = $state('');
  let name = $state();
  let submitting = $state(false);

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;

    const result = await api.post('/users', { email, password, username, name });

    submitting = false;

    if (!result.ok) {
      toast.show('Registration failed. Try a different email.', 'error');
      return;
    }

    toast.show('Account created! Please log in.', 'success');
    goto('/login');
  }
</script>

<article>
  <h1>Register</h1>

  <form onsubmit={handleSubmit}>
    <label>
      Email (*)
      <input type="email" bind:value={email} required />
    </label>

    <label>
      Password (*)
      <input type="password" bind:value={password} required />
    </label>

    <label>
      Username (*)
      <input type="username" bind:value={username} required />
    </label>

    <label>
      Name (Optional)
      <input type="name" bind:value={name} />
    </label>

    <button type="submit" disabled={submitting}>
      {submitting ? 'Creating account...' : 'Register'}
    </button>
  </form>

  <p>Already have an account? <a href="/login">Log in</a></p>
</article>
