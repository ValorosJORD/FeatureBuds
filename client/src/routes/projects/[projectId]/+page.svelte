<script lang="ts">
  import { page } from '$app/state';
  import { api } from '$lib/api';
  import FileUpload from '$lib/components/FileUpload.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { uploadFiles } from '$lib/upload';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let isOpen = $state(false);
  let selectedFile: ProjectFile | null = $state(null);

  function openFile(file: ProjectFile) {
    selectedFile = file;
    isOpen = true;
  }

  let files: File[] = $state([]);
  let progress = $state(0);
  let uploading = $state(false);

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
    originalName: string;
  }

  interface Project {
    projectId: string;
    title: string;
    description: string;
    createdAt: Date;
    lastEdited: Date;
    projectFiles: ProjectFile[];
  }

  interface Comment {
    projectId: string;
    commentId: string;
    userId: string;
    bodyText: string;
    createdAt: string;
  }

  interface Reply {
    replyId: string;
    commentId: string;
    userId: string;
    bodyText: string;
    createdAt: string;
  }

  let project: Project | null = $state(null);
  let loading = $state(true);

  let Cdate = $state();
  let Ctime = $state();
  let Edate = $state();
  let Etime = $state();

  let pFiles: ProjectFile[] = $state([]);

  let comments: Comment[] = $state([]);
  let replies: Reply[] = $state([]);

  onMount(async () => {
    const id = page.params.projectId;
    const result = await api.get<Project>(`/projects/${id}`);
    const comment = await api.get<Comment[]>(`/projects/${id}/comments`);
    const reply = await api.get<Reply[]>('/replies');

    if (result.ok) {
      project = result.data;
      const createdAt = new Date(project.createdAt);
      const lastEdited = new Date(project.lastEdited);

      Cdate = createdAt.toDateString();
      Ctime = createdAt.toTimeString();

      Edate = lastEdited.toDateString();
      Etime = lastEdited.toTimeString();

      pFiles = project.projectFiles;

      console.log(project);
    }

    if(comment.ok){
      comments = comment.data;
      console.log(' COMMENTS: ', comments);
    } else{
      console.error('Failed to get comments')
    }

    if(reply.ok){
      replies = reply.data;
      console.log(' REPLIES: ', replies);
    } else{
      console.error('Failed to get replies')
    }

    loading = false;
  });

  
  
  async function handleUpload() {
    if (files.length === 0) return;
    if (!project || !project.projectId) return;

    uploading = true;
    progress = 0;

    try {
      const result = await uploadFiles<{ message: string; urls: string[] }>(
        `/projects/${project.projectId}`,
        files,
        {
          onProgress: (p) => {
            progress = p;
          },
          fieldName: 'files',
        },
      );

      console.log('Upload success:', result);
      files = []; // clear after upload
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      uploading = false;
    }
  }


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

  </article>

  <article>
    <FileUpload
      bind:files
      accept="audio/*"
      multiple
      maxSize={512 * 1024 * 1024}
      label="Upload your files"
      onSelect={handleSelect}
      onError={handleError}
    />
    <button onclick={handleUpload} disabled={uploading || files.length === 0}>
      {uploading ? `Uploading... ${progress}%` : 'Upload Files'}
    </button>
  </article>

  <article style="margin-top: 1rem;">
    <h1>Files</h1>
    <ul>
      {#each pFiles as pFile (pFile.filePath)}
        <article style="background-color: var(--pico-primary);">
          <button onclick={() => openFile(pFile)}>
            {pFile.originalName}
          </button>
        </article>
      {/each}
    </ul>
  </article>
{/if}

  <article style="margin-top: 1rem;">
  <h1>Comments</h1>
    {#if comments.length > 0}
      {#each comments as comment}
        <div class="comment-card">
          <small>User: {comment.userId}</small>
          <small>Date: {comment.createdAt}</small>
          <p>Comment: {comment.bodyText}</p>
          <button class="replyButton" onclick={() => goto(`/projects/${project.projectId}/comments/${comment.commentId}/replies/create`)}>
            Reply to this message
          </button>
          {#each replies.filter((reply) => reply.commentId === comment.commentId) as reply}
            <div class="reply-card">
              <small>User: {reply.userId}</small>
              <small>Date: {reply.createdAt}</small>
              <p>Reply: {reply.bodyText}</p>
            </div>
          {/each}
        </div>
      {/each}
    {:else}
      <p>No comments...</p>
    {/if}
    {#if project}
      <button onclick={() => goto(`/projects/${project.projectId}/comments/Create`)}>
        Comment to this post!!
      </button>
    {/if}
  </article>

{#if selectedFile}
  <Modal bind:open={isOpen} title={selectedFile?.originalName}>
    {#if selectedFile}
      <audio controls>
        <source src={`/api/${selectedFile.filePath}`} type="audio/mpeg" />
      </audio>
    {/if}
  </Modal>
{/if}

<style>
  .comment-card {
    border-bottom: 1px solid gray;
    margin-bottom: 15px;
    padding-bottom: 15px;
  }

  .replyButton{
    background: none;
    border: none;
    padding: 0;
    color: gray;
    text-decoration: underline;
  }

  .reply-card{
    margin-left: 20px;
    font-size: small;
  }
</style>




        
  

