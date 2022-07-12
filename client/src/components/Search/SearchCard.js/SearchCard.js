import { Link } from "react-router-dom"

const SearchCard = ({
    suggestion,
    handleClick
}) => {
    return (
        <li className="suggestions" key={suggestion.id} onClick={() => handleClick(suggestion.id)}>
            <Link to={`/posts/details/${suggestion.id}`}>
                <h6 className="tt-title">{suggestion.title}</h6>
                <div className="tt-description">
                    {suggestion.description.slice(0, 50) + '...'}
                </div>
            </Link>
        </li>
    )
}

export default SearchCard