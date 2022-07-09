import { useEffect } from "react";

import * as postService from "../../services/postServices";
import { usePagination } from "../../hooks/usePagination";

import PostCard from "./PostCard/PostCard";

const Posts = () => {
  //add loader
  const { setPosts, setPostPerPage, setLoading, currentPosts, loading } = usePagination([]);

  useEffect(() => {
    let ignore = false;

    postService.getPosts()
      .then(data => {
        if (!ignore) setPosts(data);
      })
      .catch(err => console.log(err))


    return () => { ignore = true };
  }, []);



  const onPaginationClickHandler = () => {
    setTimeout(() => {
      setPostPerPage(ss => ss += 2);
    }, 1000);
  }


  return (
    <div className="container">
      <div className="tt-topic-list">
        <div className="tt-list-header">
          <div className="tt-col-topic">Topic</div>
          <div className="tt-col-category">Category</div>
          <div className="tt-col-value hide-mobile">Likes</div>
          <div className="tt-col-value hide-mobile">Replies</div>
          <div className="tt-col-value hide-mobile">Views</div>
          <div className="tt-col-value">Activity</div>
        </div>
        {
          currentPosts.map(post => <PostCard key={post.id} post={post} />)
        }

        <div className="tt-row-btn">
          <button onClick={onPaginationClickHandler} type="button" className="btn-icon js-topiclist-showmore">
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