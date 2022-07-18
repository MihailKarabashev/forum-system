import { useEffect } from "react";

import * as postService from "../../services/postServices";
import { usePagination } from "../../hooks/usePagination";

import PostCard from "./PostCard/PostCard";
import Pagination from "../Pagination/Pagination";

import { useState } from "react";

import PostCardSkeleton from "../Skeletons/PostCardSkeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const amountPerPage = 4;

const Posts = () => {
  //add loader
  const [posts, setPosts] = useState([]);
  const {
    setPostPerPage,
    setLoading,
    currentPosts,
    loading } = usePagination(posts, 1, amountPerPage);

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
        <PostCardSkeleton />
        {
          currentPosts.map(post => <PostCard key={post.id} data={post} decoration={"tt-itemselect"} />)
        }

        <Pagination onPaginationClickHandler={onPaginationClickHandler} />
      </div>
    </div>
  );
}

export default Posts;