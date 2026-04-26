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

    if (result.ok) {
      projects = result.data;
    }

    loading = false;
  });
</script>

{#if loading}
  <loading></loading>
{:else if projects.length === 0}
  <p>No projects currently exist.</p>
{:else}
  <ul>
    {#each projects as project (project.projectId)}
      <li style="list-style-type: none;">
        <article>
          <a href="/projects/{project.projectId}">
            <h1 class="contrast-text">
              <strong>{project.title}</strong>
            </h1>
          </a>
          <p>{project.description}</p>
        </article>
      </li>
    {/each}
  </ul>
{/if}
