import type { Metadata } from 'next';
import css from './NotFoundPage.module.css';

export const metadata: Metadata = {
  title: '404 — Page not found — NoteHub',
  description: 'The page you requested does not exist on NoteHub.',
  openGraph: {
    title: '404 — Page not found — NoteHub',
    description: 'The page you requested does not exist on NoteHub.',
    url: 'https://my-domain.com/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function NotFoundPage() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
