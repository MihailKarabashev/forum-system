import { useState, useEffect } from "react"
import * as userService from '../../services/userService';

import { useAuthContext } from '../../contexts/AuthContext';


import PostCard from "../Posts/PostCard/PostCard";

const UserActivity = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useAuthContext();


    useEffect(() => {
        userService.getUserPosts(user.id)
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