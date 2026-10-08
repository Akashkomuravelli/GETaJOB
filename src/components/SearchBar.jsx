function SearchBar({ value, onChange }) {
  return (
    <div className="search-box">
      <span className="search-icon">⌕</span>

      <input
        type="text"
        placeholder="Search jobs, companies, skills..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange("")}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;