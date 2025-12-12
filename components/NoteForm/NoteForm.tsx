'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import css from './NoteForm.module.css';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import { toast } from 'react-hot-toast';

export default function NoteForm({
  onSuccessClose,
}: {
  onSuccessClose?: () => void;
}) {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // local state mirrors draft for controlled inputs (optional, could use draft directly)
  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState(draft.tag);

  // sync local state with persisted draft when component mounts (in case draft exists)
  useEffect(() => {
    setTitle(draft.title);
    setContent(draft.content);
    setTag(draft.tag);
  }, [draft.title, draft.content, draft.tag]);

  // update draft in store on each change
  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  const handleCancel = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    // per requirements: Cancel should NOT clear draft
    if (onSuccessClose) {
      onSuccessClose();
    } else {
      router.back();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || title.length < 3) {
      toast.error('Title is required (min 3 characters).');
      return;
    }
    setIsSubmitting(true);
    try {
      await createNote({ title, content, tag });
      clearDraft(); // очищаємо draft після успішного створення
      toast.success('Note created');
      // повертаємось назад або закриваємо модалку
      if (onSuccessClose) {
        onSuccessClose();
      } else {
        router.back();
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not create note.');
    } finally {
      setIsSubmitting(false);
    }
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
          value={title}
          onChange={e => setTitle(e.target.value)}
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
          value={content}
          onChange={e => setContent(e.target.value)}
          maxLength={500}
        />
      </fieldset>

      <fieldset className={css.formGroup}>
        <label htmlFor="note-tag">Tag</label>
        <select
          id="note-tag"
          name="tag"
          className={css.select}
          value={tag}
          onChange={e => setTag(e.target.value)}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </fieldset>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting || title.trim().length < 3}
        >
          {isSubmitting ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}