import SearchCard from "./SearchCard.js/SearchCard"

const Search = ({
    value,
    suggestions,
    suggestionsActive,
    handleChange,
    handleKeyDown,
    handleClick
}) => {
    return (
        <div className="tt-search">
            <div className="search-wrapper">
                <div className="search-form">
                    <input
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={value}
                        type="text" className="tt-search__input"
                        placeholder="Search"
                    />
                    <button className="tt-search__btn" type="submit">
                        <svg className="tt-icon">
                            <use xlinkHref="#icon-search"></use>
                        </svg>
                    </button>
                </div>
                <div className="search-results" style={suggestionsActive ? { display: 'inline-block' } : { display: 'none' }}>
                    <div className="tt-search-scroll">
                        <ul>
                            {
                                suggestionsActive
                                &&
                                suggestions.map(suggestion =>
                                    <SearchCard
                                        key={suggestion.id}
                                        suggestion={suggestion}
                                        handleClick={handleClick}
                                    />
                                )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search