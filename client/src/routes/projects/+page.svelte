<script lang="ts">
  import { api } from '$lib/api';
  import { onMount } from 'svelte';

  interface Project {
    projectId: string;
    title: string;
    description: string;
    createdAt: Date;
    lastEdited: Date;
  }

  let projects: Project[] = $state([]);
  let loading = $state(true);

  onMount(async () => {
    const result = await api.get<Project[]>('/projects');

    projects = result;

    loading = false;
  });
</script>

{#if loading}
  <loading></loading>
{:else if projects.length === 0}
  <p>You haven't joined any households yet.</p>
{:else}
  <ul>
    {#each projects as project (project.projectId)}
      <li>
        <a href="/projects/{project.projectId}">{project.title}</a>
      </li>
    {/each}
  </ul>
{/if}
