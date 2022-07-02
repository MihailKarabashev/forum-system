import { useState, useEffect } from "react";

import * as postService from "../../services/postServices";

import PostCard from "./PostCard/PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getPosts()
      .then(data => {
        setPosts(data);
      })
      .catch(err => console.log(err))
  }, []);


  return (
    <div className="container">
      <div className="tt-topic-list">
        <div className="tt-list-header">
          <div className="tt-col-topic">Topic</div>
          <div className="tt-col-category">Category</div>
          <div className="tt-col-value hide-mobile">Likes</div>
          <div className="tt-col-value hide-mobile">Replies</div>
          <div className="tt-col-value hide-mobile">Views</div>
          <div className="tt-col-value">Created On</div>
        </div>
        {
          posts.map(post => <PostCard key={post.id} post={post} />)
        }

        <div className="tt-row-btn">
          <button type="button" className="btn-icon js-topiclist-showmore">
            <svg className="tt-icon">
              <use xlinkHref="#icon-load_lore_icon"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Posts;