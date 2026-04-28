<script lang="ts">
  import { page } from '$app/state';
  import { api } from '$lib/api';
  import FileUpload from '$lib/components/FileUpload.svelte';
  import { onMount } from 'svelte';

  let files: File[] = $state([]);

  function handleSelect(selected: File[]) {
    files = selected;
    console.log('Selected files:', selected);
  }

  function handleError(message: string) {
    console.error(message);
  }

  interface ProjectFile {
    filePath: string;
    fileSize: number;
    project: Project;
  }

  interface Project {
    projectId: string;
    title: string;
    description: string;
    createdAt: Date;
    lastEdited: Date;
    files: ProjectFile[];
  }

  let project: Project | null = $state(null);
  let loading = $state(true);

  let Cdate = $state();
  let Ctime = $state();
  let Edate = $state();
  let Etime = $state();

  let pFiles: ProjectFile[] | undefined = $state();

  onMount(async () => {
    const id = page.params.projectId;
    const result = await api.get<Project>(`/projects/${id}`);

    if (result.ok) {
      project = result.data;
      const createdAt = new Date(project.createdAt);
      const lastEdited = new Date(project.lastEdited);

      Cdate = createdAt.toDateString();
      Ctime = createdAt.toTimeString();

      Edate = lastEdited.toDateString();
      Etime = lastEdited.toTimeString();

      pFiles = project.files;
    }

    loading = false;
  });
</script>

{#if loading}
  <loading></loading>
{:else if !project}
  <p>Project not found.</p>
{:else}
  <article>
    <h1>{project.title}</h1>
    <p>{project.description}</p>
    <p>Project Created: <strong>{Cdate}</strong> <em>at</em> <strong>{Ctime}</strong></p>
    <p>Project Last Edited: <strong>{Edate}</strong> <em>at</em> <strong>{Etime}</strong></p>

    {#each pFiles as file (project.projectId)}
  </article>

  <FileUpload
    bind:files
    accept="image/*,.pdf"
    multiple
    maxSize={10 * 1024 * 1024}
    label="Upload your files"
    onSelect={handleSelect}
    onError={handleError}
  />
{/if}
