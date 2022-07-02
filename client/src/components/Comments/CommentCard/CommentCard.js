import CommentReply from "../CommentReply";

const CommentCard = ({
  reply
}) => {

  // Check all comments and make hybrid from all based on created comment
  return (
    <>
      <div className="tt-item">
        <div className="tt-single-topic">
          <div className="tt-item-header pt-noborder">
            <div className="tt-item-info info-top">
              <div className="tt-avatar-icon">
                <i className="tt-icon"><svg><use xlinkHref="#icon-ava-t"></use></svg></i>
              </div>
              <div className="tt-avatar-title">
                <a href="#">{reply.authorUserName}</a>
              </div>
              <a href="#" className="tt-info-time">
                <i className="tt-icon"><svg><use xlinkHref="#icon-time"></use></svg></i>{reply.createdOn}
              </a>
            </div>
          </div>
          <div className="tt-item-description">
            {reply.description}

            {
              reply.parentId && <CommentReply reply={reply} />
            }

            <div className="tt-item-info info-bottom">
              <a href="#" className="tt-icon-btn">
                <i className="tt-icon"><svg><use xlinkHref="#icon-like"></use></svg></i>
                <span className="tt-text">671</span>
              </a>
              <a href="#" className="tt-icon-btn">
                <i className="tt-icon"><svg><use xlinkHref="#icon-dislike"></use></svg></i>
                <span className="tt-text">39</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentCard;