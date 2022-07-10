import { useEffect } from "react";

import * as postService from "../../services/postServices";
import { usePagination } from "../../hooks/usePagination";

import PostCard from "./PostCard/PostCard";
import Pagination from "../Pagination/Pagination";

const amountPerPage = 4;

const Posts = () => {
  //add loader
  const {
    setPosts,
    setPostPerPage,
    setLoading,
    currentPosts,
    loading } = usePagination([], 1, amountPerPage);

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
    setPostPerPage(state => state += amountPerPage);
    console.log('here');
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

        <Pagination onPaginationClickHandler={onPaginationClickHandler} />
      </div>
    </div>
  );
}

export default Posts;