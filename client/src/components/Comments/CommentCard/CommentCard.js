import { Link } from "react-router-dom";

import { generateSvgIcon } from "../../../utils/getProfilePicture";
import { hasPermissions } from "../../../utils/hasPermissions";

import { useAuthContext } from "../../../contexts/AuthContext";

import CommentReply from "../CommentReply";
import './CommentCard.css';


const CommentCard = ({
  reply,
  isReplyCreated,
  array,
  index,
  onRemove
}) => {

  const { user } = useAuthContext();

  const deleteBtn = (
    <div className="row">
      <div className="col-auto ml-auto">
        <Link to="#" onClick={(e) => onRemove(e, reply.id)} className="btn btn-primaryCustom tt-offset-27">Delete</Link>
      </div>
    </div>
  )


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

            {
              (hasPermissions(user, reply)) ? deleteBtn : ''
            }


          </div>
        </div>
      </div>
    </>
  )
}

export default CommentCard;