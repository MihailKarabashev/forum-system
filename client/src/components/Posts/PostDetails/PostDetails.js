import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import * as postService from "../../../services/postServices";

import Tags from '../../Tags/Tags';
import CommentCard from "../../Comments/CommentCard/CommentCard";
import CreatePostReply from '../PostReplies/CreatePostReply';


const controls = [
  ['bold', 'italic', 'underline', 'link', 'image'],
  ['unorderedList', 'h1', 'h2', 'h3'],
  ['alignLeft', 'alignCenter', 'alignRight'],
];

const PostDetails = () => {
  const [value, onChange] = useState('');
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    postService.getPostById(postId)
      .then(data => {
        setPost(data);
      });
  }, []);

  const onTextEditorChange = (val) => {
    onChange(val);
  }

  return (
    <div className="container">
      <div className="tt-single-topic-list">
        <div className="tt-item">
          <div className="tt-single-topic">
            <div className="tt-item-header">
              <div className="tt-item-info info-top">
                <div className="tt-avatar-icon">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-ava-d"></use></svg></i>
                </div>
                <div className="tt-avatar-title">
                  <Link to="#">AUTHOR NAME</Link>
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
              <Link to="#" className="tt-icon-btn">
                <i className="tt-icon"><svg><use xlinkHref="#icon-like"></use></svg></i>
                <span className="tt-text">671</span>
              </Link>
              <Link to="#" className="tt-icon-btn">
                <i className="tt-icon"><svg><use xlinkHref="#icon-dislike"></use></svg></i>
                <span className="tt-text">39</span>
              </Link>
              <div className="col-separator"></div>
            </div>
          </div>
        </div>

        {
          post.replies && post.replies.map(reply => <CommentCard key={reply.id} reply={reply} />)
        }
      </div>

      <div className="tt-wrapper-inner">
        <h4 className="tt-title-separator"><span>You’ve reached the end of replies</span></h4>
      </div>

      <CreatePostReply
        onChange={onTextEditorChange}
        controls={controls}
        value={value}
      />

    </div>


  )
};

export default PostDetails;