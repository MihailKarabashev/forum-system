import { useState, useEffect } from "react";

import PostCard from "./PostCard/PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch('https://localhost:7229/api/posts', {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify({ title: 'Title', description: 'Desc', categoryId: 1 })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //   });

    fetch('https://localhost:7229/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email: 'misho@abv.bg', password: '123456' })
    }).then(res => res.json()).then(data => {
      console.log(data);
    });

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
          <div className="tt-col-value">Activity</div>
        </div>
        <div className="tt-topic-alert tt-alert-default" role="alert">
          <a href="#" target="_blank">4 new posts</a> are added recently, click here to load them.
        </div>
        {/* Use map and add all postCard here */}
        {
          posts.map(x => <PostCard key={x.id} post={x} />)
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