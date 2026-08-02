'use client';

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

const SearchBox = ({ value, onSearch }: SearchBoxProps) => {
  return (
    <input
      type='text'
      placeholder='Search notes'
      value={value}
      onChange={e => onSearch(e.target.value)}
    />
  );
};

export default SearchBox;
