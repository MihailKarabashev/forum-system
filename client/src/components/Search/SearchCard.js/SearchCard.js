import { Link } from "react-router-dom"

const SearchCard = ({
    suggestion,
    handleClick
}) => {
    return (
        <li className="suggestions" key={suggestion.id} onClick={handleClick}>
            <Link to={`/posts/details/${suggestion.id}`}>
                <h6 className="tt-title">{suggestion.name}</h6>
                <div className="tt-description">
                    {suggestion.email}
                </div>
            </Link>
        </li>
    )
}

export default SearchCard