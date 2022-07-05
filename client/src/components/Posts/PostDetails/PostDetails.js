import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext';

import * as postService from "../../../services/postServices";
import * as replyService from "../../../services/replyService";
import { generateSvgIcon } from '../../utils/getProfilePicture';

import Tags from '../../Tags/Tags';
import LoginAction from '../../Login/LoginAction';
import CreatePostReply from '../PostReplies/CreatePostReply';
import CommentCard from "../../Comments/CommentCard/CommentCard";


const PostDetails = () => {
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [replies, setPostReplies] = useState([]);

  const { postId } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    postService.getPostById(postId)
      .then(data => {
        setPost(data);
        setPostReplies(data.replies)
        setTags(post.tags);
        setReactions(post.reaction);
      });
  }, []);


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
      })
      .catch(err => {
        console.log(err);
      })

    e.target.reset();
  }


  return (
    <div className="container">
      <div className="tt-single-topic-list">
        <div className="tt-item">
          <div className="tt-single-topic">
            <div className="tt-item-header">
              <div className="tt-item-info info-top">
                <div className="tt-avatar-icon">
                  <i className="tt-icon"><svg><use xlinkHref={`#icon-ava-${generateSvgIcon(post.authorUserName)}`}></use></svg></i>
                </div>
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
                {tags && <Tags tags={tags} />}
              </div>
            </div>
            <div className="tt-item-description">
              <h6 className="tt-title">BOLD TITLE IF POSSIBLE</h6>
              <p> {post.description}</p>
            </div>
            <div className="tt-item-info info-bottom">
              <Link to="#" className="tt-icon-btn">
                <i className="tt-icon"><svg><use xlinkHref="#icon-like"></use></svg></i>
                {
                  reactions && <span className="tt-text">{reactions.likes}</span>
                }
              </Link>
              <Link to="#" className="tt-icon-btn">
                <i className="tt-icon"><svg><use xlinkHref="#icon-dislike"></use></svg></i>
                {
                  reactions && <span className="tt-text">{reactions.dislikes}</span>
                }
              </Link>
              <div className="col-separator"></div>
            </div>
          </div>
        </div>

        {
          replies && replies.map(reply => <CommentCard key={reply.id} reply={reply} />)
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


  )
};

export default PostDetails;