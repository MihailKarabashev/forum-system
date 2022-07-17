import SearchCard from "./SearchCard.js/SearchCard"

const Search = ({
    search,
    posts,
    searchActive,
    handleChange,
    handleClick
}) => {
    return (
        <div className="tt-search">
            <div className="search-wrapper">
                <div className="search-form">
                    <input
                        onChange={handleChange}
                        value={search}
                        type="text" className="tt-search__input"
                        placeholder="Search"
                    />
                    <button className="tt-search__btn" type="submit">
                        <svg className="tt-icon">
                            <use xlinkHref="#icon-search"></use>
                        </svg>
                    </button>
                </div>
                <div className="search-results" style={searchActive ? { display: 'inline-block' } : { display: 'none' }}>
                    <div className="tt-search-scroll">
                        <ul>
                            {
                                searchActive
                                &&
                                posts.map(post =>
                                    <SearchCard
                                        key={post.id}
                                        post={post}
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