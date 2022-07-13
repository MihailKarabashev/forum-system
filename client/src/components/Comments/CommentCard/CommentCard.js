import { Link } from "react-router-dom";

import CommentReply from "../CommentReply";
import { generateSvgIcon } from "../../../utils/getProfilePicture";

const CommentCard = ({
  reply,
  isReplyCreated,
  array,
  index
}) => {

  return (
    <>
      <div className={(array.length - 1 === index && isReplyCreated) ? "tt-item tt-wrapper-success" : "tt-item"}>
        <div className="tt-single-topic">
          <div className="tt-item-header pt-noborder">
            <div className="tt-item-info info-top">
              <div className="tt-avatar-icon">
                <i className="tt-icon"><svg><use xlinkHref={`#icon-ava-${generateSvgIcon(reply.authorUserName)}`}></use></svg></i>
              </div>
              <div className="tt-avatar-title">
                <Link to="#">{reply.authorUserName}</Link>
              </div>
              <Link to="#" className="tt-info-time">
                <i className="tt-icon"><svg><use xlinkHref="#icon-time"></use></svg></i>{reply.createdOn}
              </Link>
            </div>
          </div>
          <div className="tt-item-description">
            {reply.description}

            {
              reply.parentId && <CommentReply reply={reply} />
            }

            <div className="row">
              <div className="tt-item-info info-bottom">
                <Link to="#" className="tt-icon-btn">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-like"></use></svg></i>
                  <span className="tt-text">671</span>
                </Link>
                <Link to="#" className="tt-icon-btn">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-dislike"></use></svg></i>
                  <span className="tt-text">39</span>
                </Link>
              </div>
              <div className="col-auto ml-auto">
                <Link to="#" className="btn btn-primaryCustom tt-offset-27">Delete</Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default CommentCard;