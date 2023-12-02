type SearchInputProps = {
  readonly onSearchChange: (searchTerm: string) => void
}

export default function SearchInput({onSearchChange}: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Search issues..."
      data-cy="search-input"
      onChange={e => onSearchChange(e.target.value)}
    />
  )
}
