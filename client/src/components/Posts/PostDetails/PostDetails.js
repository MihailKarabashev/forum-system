import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RichTextEditor } from '@mantine/rte';

import * as postService from "../../../services/postServices";

import CommentCard from "../../Comments/CommentCard/CommentCard";
import Tags from '../../Tags/Tags';

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
        console.log(Array.isArray(data.replies));
        setPost(data);
      });
  }, []);

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

      {/* Add library like TimyMC to escape html when writting */}
      <div className="tt-wrapper-inner">
        <form className="pt-editor form-default">
          <h6 className="pt-title">Post Your Reply</h6>
          <div className="form-group">
            <RichTextEditor value={value} onChange={onChange} controls={controls}
              onImageUpload={() => console.log('Function here')}
              styles={{
                root: { background: '#E2E7EA' },
                toolbar: { background: '#E2E7EA' },
              }}
              style={
                { paddingTop: 10, paddingBottom: 100 }
              }
            />
          </div>
          <div className="pt-row">
            <div className="col-auto">
              <div className="checkbox-group">
                <input type="checkbox" id="checkBox21" name="checkbox" />
                <label htmlFor="checkBox21">
                  <span className="check"></span>
                  <span className="box"></span>
                  <span className="tt-text">Subscribe to this topic.</span>
                </label>
              </div>
            </div>
            <div className="col-auto">
              <a href="#" className="btn btn-secondary btn-width-lg">Reply</a>
            </div>
          </div>
        </form>
      </div>
    </div>


  )
};

export default PostDetails;