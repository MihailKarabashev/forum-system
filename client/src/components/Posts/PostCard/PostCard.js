import { Link } from "react-router-dom";

const PostCard = ({
    post
}) => {

    console.log(post);
    return (
        <div className="tt-item tt-itemselect">
            <div className="tt-col-avatar">
                <svg className="tt-icon">
                    <use xlinkHref="#icon-ava-k"></use>
                </svg>
            </div>
            <div className="tt-col-description">
                <h6 className="tt-title"><Link to="page-single-topic.html">
                    <svg className="tt-icon">
                        <use xlinkHref="#icon-pinned"></use>
                    </svg>
                    {post.title}
                </Link></h6>
                <div className="row align-items-center no-gutters">
                    <div className="col-11">
                        <ul className="tt-list-badge">
                            <li className="show-mobile"><Link to="#"><span className="tt-color01 tt-badge">politics</span></Link></li>
                            <li><Link to="#"><span className="tt-badge">contests</span></Link></li>
                            <li><Link to="#"><span className="tt-badge">authors</span></Link></li>
                        </ul>
                    </div>
                    <div className="col-1 ml-auto show-mobile">
                        <div className="tt-value">1h</div>
                    </div>
                </div>
            </div>
            <div className="tt-col-category"><span className="tt-color01 tt-badge">{post.categoryName}</span></div>
            <div className="tt-col-value hide-mobile">985</div>
            <div className="tt-col-value tt-color-select hide-mobile">{post.repliesCount}</div>
            <div className="tt-col-value hide-mobile">15.1k</div>
            <div className="tt-col-value hide-mobile">{post.createdOn}</div>
        </div>
    );
}

export default PostCard;