import { Link } from "react-router-dom"

import './SearchCard.css';

const SearchCard = ({
    post,
    handleClick
}) => {
    return (
        <li className="suggestions" key={post.id} onClick={() => handleClick(post.id)}>
            <Link to={`/posts/details/${post.id}`}>
                <h6 className="tt-title">{post.title}</h6>
                <div className="tt-description">
                    {post.description.slice(0, 50) + '...'}
                </div>
            </Link>
        </li>
    )
}

export default SearchCard