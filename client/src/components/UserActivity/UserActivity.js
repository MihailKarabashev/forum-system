import { useState, useEffect } from "react"
import * as userService from '../../services/userService';


import PostCard from "../Posts/PostCard/PostCard";

const UserActivity = () => {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        userService.getUserPosts()
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
                    <div className="tt-col-value">Likes</div>
                    <div className="tt-col-value">Replies</div>
                    <div className="tt-col-value">Views</div>
                    <div className="tt-col-value">Activity</div>
                </div>
                {
                    posts && posts.map(post => <PostCard key={post.id} data={post} />)
                }

            </div>
        </div>
    )
}

export default UserActivity