'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api/clientApi';
import type { NewNote } from '@/lib/api/clientApi';
import { useNoteStore } from '@/lib/store/noteStore';

import css from './NoteForm.module.css';

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const createMutation = useMutation({
    mutationFn: createNote,

    onSuccess: async () => {
      clearDraft();

      await queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      router.push('/notes/filter/all');
    },
  });

  return (
    <form
      className={css.form}
      action={async (formData: FormData) => {
        try {
          const note: NewNote = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            tag: formData.get('tag') as NewNote['tag'],
          };

          await createMutation.mutateAsync(note);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <div className={css.formGroup}>
        <label htmlFor='title'>Title</label>

        <input
          id='title'
          name='title'
          type='text'
          className={css.input}
          defaultValue={draft.title}
          onChange={e =>
            setDraft({
              title: e.target.value,
            })
          }
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor='content'>Content</label>

        <textarea
          id='content'
          name='content'
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={e =>
            setDraft({
              content: e.target.value,
            })
          }
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor='tag'>Tag</label>

        <select
          id='tag'
          name='tag'
          className={css.select}
          defaultValue={draft.tag}
          onChange={e =>
            setDraft({
              tag: e.target.value as NewNote['tag'],
            })
          }
        >
          <option value='Todo'>Todo</option>
          <option value='Work'>Work</option>
          <option value='Personal'>Personal</option>
          <option value='Meeting'>Meeting</option>
          <option value='Shopping'>Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type='button'
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button
          type='submit'
          className={css.submitButton}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
