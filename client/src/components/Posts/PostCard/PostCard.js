import { Link } from "react-router-dom";
import Tags from "../../Tags/Tags";

import { generateSvgIcon } from '../../../utils/getProfilePicture';
import { generateRandomInteger } from '../../../utils/categoryColorHelper';

const
    PostCard = ({
        data
    }) => {

        const menu = (
            <>
                <div className="tt-col-value hide-mobile">{data.reaction ? data.reaction.likes : data.likesCount}</div>
                <div className="tt-col-value tt-color-select hide-mobile">{data.repliesCount}</div>
                <div className="tt-col-value hide-mobile">{data.views}</div>
            </>
        )

        const tagsMenu = (
            <div className="row align-items-center no-gutters">
                <div className="col-11">
                    <Tags tags={data.tags} />
                </div>
            </div>
        )

        return (
            <div className="tt-item">
                <div className="tt-col-avatar">
                    <svg className="tt-icon">
                        <use xlinkHref={`#icon-ava-${generateSvgIcon(data.authorUserName)}`}></use>
                    </svg>
                </div>
                <div className="tt-col-description">
                    <h6 className="tt-title">
                        <Link to={`/posts/details/${data.id}`}>
                            <svg className="tt-icon">
                                <use xlinkHref="#icon-pinned"></use>
                            </svg>
                            {data.title || data.postTitle}
                        </Link>
                    </h6>

                    {
                        data.tags ? tagsMenu : <div className="tt-content"> {data.description}</div>
                    }
                </div>
                <div className="tt-col-category"><span className={`tt-color${generateRandomInteger(1, 20)} tt-badge`}>{data.categoryName}</span></div>
                {data.views && menu}
                <div className="tt-col-value hide-mobile">{data.activity || data.postViews}</div>
            </div>
        );
    }

export default PostCard;