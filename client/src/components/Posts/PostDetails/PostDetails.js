import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext';

import * as postService from "../../../services/postServices";
import * as replyService from "../../../services/replyService";
import * as reactionService from "../../../services/reactionService";
import { generateSvgIcon } from '../../../utils/getProfilePicture';

import Tags from '../../Tags/Tags';
import LoginAction from '../../Login/LoginAction';
import CreatePostReply from '../PostReplies/CreatePostReply';
import CommentCard from "../../Comments/CommentCard/CommentCard";
import Modal from '../../Modal/Modal';


const PostDetails = () => {
  const [post, setPost] = useState({});
  const [replies, setPostReplies] = useState([]);
  const [reactions, setPostReactions] = useState({});
  const [isReplyCreated, setIsReplyCreated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { postId } = useParams();
  const { user } = useAuthContext();


  useEffect(() => {
    postService.getPostById(postId)
      .then(data => {
        setPost(data);
        setPostReactions(data.reaction);
        setPostReplies(data.replies);
      });
  }, [postId]);


  const onSubmitFormHandler = (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let description = formData.get('message');
    replyService.createPostReply(postId, description)
      .then(createdReply => {
        setPostReplies(oldPostReplies => [
          ...oldPostReplies,
          createdReply
        ]);
        setIsReplyCreated(true);
        setTimeout(() => {
          setIsReplyCreated(false);
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      })

    e.target.reset();
  }


  const reactionHandler = (e, id, service, reactionType, state) => {
    e.preventDefault();
    console.log(state);

    service.createReaction(id, reactionType)
      .then(reaction => {
        state(reaction);
      });

  }


  const onDeleteClickHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  const deleteHandler = (e) => {
    e.preventDefault();
    postService.deletePost(postId)
      .then(res => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowModal(false);
      })
  }

  const ownerButtons = (
    <div className="col-auto ml-auto">
      <Link to="#" className="btn btn-primaryCustom tt-offset-27" onClick={onDeleteClickHandler}>Delete</Link>
      <Link to={`posts/edit/${postId}`} className="btn btn-secoundaryCustom tt-offset-27">Update</Link>
    </div>
  );

  return (
    <>
      {showModal && <Modal onClose={() => setShowModal(false)} onSave={deleteHandler} />}
      <div className="container">
        <div className="tt-single-topic-list">
          <div className="tt-item" >
            <div className="tt-single-topic">
              <div className="tt-item-header">
                <div className="tt-item-info info-top">
                  <div className="tt-avatar-icon">
                    <i className="tt-icon"><svg><use xlinkHref={`#icon-ava-${generateSvgIcon(post.authorUserName)}`}></use></svg></i>
                  </div>
                  {
                    (user.id === post.authorId || user.roleName === 'Admin')
                      ? ownerButtons
                      : ''
                  }

                  <div className="tt-avatar-title">
                    <Link to="#">{post.authorUserName}</Link>
                  </div>
                  <Link to="#" className="tt-info-time">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-time"></use></svg></i>{post.createdOn}
                  </Link>
                </div>
                <h3 className="tt-item-title">
                  <Link to="#">{post.title}</Link>
                </h3>
                <div className="tt-item-tag">
                  {post.tags && <Tags tags={post.tags} />}
                </div>
              </div>
              <div className="tt-item-description">
                <h6 className="tt-title">BOLD TITLE IF POSSIBLE</h6>
                <p> {post.description}</p>
              </div>
              <div className="tt-item-info info-bottom">
                <Link to="#" onClick={(e) => reactionHandler(e, postId, reactionService, 'like', setPostReactions)} className="tt-icon-btn">
                  <i className="tt-icon" ><svg style={reactions.isLiked ? { fill: 'green' } : {}}><use xlinkHref="#icon-like"></use></svg></i>
                  {
                    reactions && <span className="tt-text">{reactions.likes}</span>
                  }
                </Link>
                <Link to="#" onClick={(e) => reactionHandler(e, postId, reactionService, 'dislike', setPostReactions)} className="tt-icon-btn">
                  <i className="tt-icon"><svg style={reactions.isDisliked ? { fill: 'red' } : {}} ><use xlinkHref="#icon-dislike"></use></svg></i>
                  {
                    reactions && <span className="tt-text">{reactions.dislikes}</span>
                  }
                </Link>

                <div className="col-separator"></div>
              </div>
            </div>
          </div>
          {
            replies &&
            replies.map(
              (reply, index, array) =>
                <CommentCard
                  key={reply.id}
                  reply={reply}
                  isReplyCreated={isReplyCreated}
                  array={array}
                  index={index}
                />)
          }
        </div>

        <div className="tt-wrapper-inner">
          <h4 className="tt-title-separator"><span>You’ve reached the end of replies</span></h4>
        </div>
        {
          user.email
            ? <CreatePostReply
              onSubmitFormHandler={onSubmitFormHandler}
            />
            : <LoginAction />
        }
      </div>
    </>
  )
};

export default PostDetails;