import { useState, useEffect } from "react"
import * as postService from '../../services/postServices';

import PostCard from "../Posts/PostCard/PostCard";

const UserActivity = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postService.getPosts()
            .then(data => {
                setPosts(data);
            })
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
                {
                    posts && posts.map(post => <PostCard key={post.id} post={post} />)
                }

            </div>
        </div>
    )
}

export default UserActivity