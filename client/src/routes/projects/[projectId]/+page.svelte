<script lang="ts">
  import { page } from '$app/state';
  import { api } from '$lib/api';
  import { onMount } from 'svelte';

  interface Project {
    projectId: string;
    title: string;
    description: string;
    createdAt: Date;
    lastEdited: Date;
  }

  let project: Project | null = $state(null);
  let loading = $state(true);

  onMount(async () => {
    const id = page.params.projectId;
    const result = await api.get<Project>(`/projects/${id}`);

    project = result;

    loading = false;
  });
</script>

{#if loading}
  <loading></loading>
{:else if !project}
  <p>Household not found.</p>
{:else}
  <h1>{project.title}</h1>
  <p>{project.description}</p>
  <p>{project.createdAt.toDateString} at {project.createdAt.toTimeString}</p>
  <p>{project.lastEdited}</p>
{/if}
