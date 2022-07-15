import { Link } from "react-router-dom";
import Tags from "../../Tags/Tags";


const PostCard = ({
    post,
    decoration
}) => {
    console.log(post);


    return (
        <div className={`tt-item ${decoration}`}>
            <div className="tt-col-avatar">
                <svg className="tt-icon">
                    <use xlinkHref={`#icon-ava-${post.authorUserName[0].toLowerCase()}`}></use>
                </svg>
            </div>
            <div className="tt-col-description">
                <h6 className="tt-title">
                    <Link to={`/posts/details/${post.id}`}>
                        <svg className="tt-icon">
                            <use xlinkHref="#icon-pinned"></use>
                        </svg>
                        {post.title}
                    </Link>
                </h6>

                <div className="row align-items-center no-gutters">
                    <div className="col-11">
                        <Tags tags={post.tags} />
                    </div>
                </div>
            </div>
            <div className="tt-col-category"><span className="tt-color01 tt-badge">{post.categoryName}</span></div>
            <div className="tt-col-value hide-mobile">{post.reaction ? post.reaction.like : post.likesCount}</div>
            <div className="tt-col-value tt-color-select hide-mobile">{post.repliesCount}</div>
            <div className="tt-col-value hide-mobile">{post.views}</div>
            <div className="tt-col-value hide-mobile">{post.activity}</div>
        </div>
    );
}

export default PostCard;