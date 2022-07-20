import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext';

import * as postService from "../../../services/postServices";
import * as replyService from "../../../services/replyService";
import * as reactionService from "../../../services/reactionService";

import { generateSvgIcon } from '../../../utils/getProfilePicture';
import { hasPermissions } from '../../../utils/hasPermissions';

import Tags from '../../Tags/Tags';
import Modal from '../../Modal/Modal';
import LoginAction from '../../Login/LoginAction';
import CreatePostReply from '../PostReplies/CreatePostReply';
import ReactionButton from '../../ReactionButton/ReactionButton';
import CommentCard from "../../Comments/CommentCard/CommentCard";
import PostDetailsSkeleton from '../../Skeletons/PostDetailsSkeleton';

const PostDetails = () => {
  const [post, setPost] = useState({});
  const [replies, setPostReplies] = useState([]);
  const [reactions, setPostReactions] = useState({});
  const [isReplyCreated, setIsReplyCreated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { postId } = useParams();
  const { user } = useAuthContext();


  useEffect(() => {
    postService.getPostById(postId)
      .then(data => {
        setTimeout(() => {
          setPost(data);
          setPostReactions(data.reaction);
          setPostReplies(data.replies);
          setLoading(false);
        }, 2000);
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


  const reactionHandler = (e, id, collection, reactionType, state) => {
    e.preventDefault();

    reactionService.createReaction(id, collection, reactionType)
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
    postService.remove(postId)
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

  const onRemovePostReply = (e, replyId) => {
    e.preventDefault()
    console.log(replyId);
    replyService.remove(replyId)
      .then(res => {
        setPostReplies(replies => {
          return replies.filter(reply => reply.id !== replyId);
        })
      })
      .catch(err => {
        console.log(err);
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
      {showModal && <Modal onClose={() => setShowModal(false)} onSave={(e) => deleteHandler(e)} />}
      {loading ? <PostDetailsSkeleton /> :
        (<div className="container">
          <div className="tt-single-topic-list">
            <div className="tt-item" >
              <div className="tt-single-topic">
                <div className="tt-item-header">
                  <div className="tt-item-info info-top">
                    <div className="tt-avatar-icon">
                      <i className="tt-icon"><svg><use xlinkHref={`#icon-ava-${generateSvgIcon(post.authorUserName)}`}></use></svg></i>
                    </div>
                    <div className="tt-avatar-title">
                      <Link to="#">{post.authorUserName}</Link>
                    </div>
                    {(hasPermissions(user, post)) ? ownerButtons : ''}
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
                  <ReactionButton
                    reaction={reactions.likes}
                    isReaction={reactions.isLiked}
                    iconType={'like'}
                    style={{ fill: 'green' }}
                    onReact={(e) => reactionHandler(e, postId, 'posts', 'like', setPostReactions)}
                  />

                  <ReactionButton
                    reaction={reactions.dislikes}
                    isReaction={reactions.isDisliked}
                    iconType={'dislike'}
                    style={{ fill: 'red' }}
                    onReact={(e) => reactionHandler(e, postId, 'posts', 'dislike', setPostReactions)}
                  />
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
                    onRemove={onRemovePostReply}
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
        </div>)
      }
    </>

  )
};

export default PostDetails;