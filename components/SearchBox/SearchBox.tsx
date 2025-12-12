import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ search, onChange }: SearchBoxProps) {
  return (
    <input
      value={search}           
      onChange={onChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}