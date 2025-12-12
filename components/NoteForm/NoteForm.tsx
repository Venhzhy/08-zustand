'use client';

import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function NoteForm({
  onSuccessClose,
}: {
  onSuccessClose?: () => void;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: (data: { title: string; content: string; tag: string }) =>
      createNote(data),
    onSuccess: () => {
      clearDraft();
      toast.success('Note created');

      queryClient.invalidateQueries({ queryKey: ['notes'] });

      if (onSuccessClose) {
        onSuccessClose();
      } else {
        router.back();
      }
    },
    onError: () => {
      toast.error('Could not create note.');
    },
  });

  const handleCancel = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();

    if (onSuccessClose) {
      onSuccessClose();
    } else {
      router.back();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!draft.title || draft.title.trim().length < 3) {
      toast.error('Title is required (min 3 characters).');
      return;
    }

    mutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <fieldset className={css.formGroup}>
        <label htmlFor="note-title">Title</label>
        <input
          id="note-title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={e => setDraft({ title: e.target.value })}
          minLength={3}
          maxLength={50}
        />
      </fieldset>

      <fieldset className={css.formGroup}>
        <label htmlFor="note-content">Content</label>
        <textarea
          id="note-content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={e => setDraft({ content: e.target.value })}
          maxLength={500}
        />
      </fieldset>

      <fieldset className={css.formGroup}>
        <label htmlFor="note-tag">Tag</label>
        <select
          id="note-tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={e => setDraft({ tag: e.target.value })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </fieldset>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending || draft.title.trim().length < 3}
        >
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}

