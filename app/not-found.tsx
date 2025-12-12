export const metadata = {
  title: '404 — Page not found — NoteHub',
  description: 'The page you requested does not exist on NoteHub.',
  openGraph: {
    title: '404 — Page not found — NoteHub',
    description: 'The page you requested does not exist on NoteHub.',
    url: 'https://my-domain.com/404',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

import css from "./NotFoundPage.module.css";

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