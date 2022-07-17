import { useEffect, useState } from "react";
import * as userService from '../../services/userService';
import PostCard from "../Posts/PostCard/PostCard";

const UserReplies = () => {
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        userService.getUserReplies()
            .then(data => {
                setReplies(data);
            })
    }, []);

    return (
        <div className="tab-pane tt-indent-none" id="tt-tab-03" role="tabpanel">
            <div className="tt-topic-list">
                <div className="tt-list-header">
                    <div className="tt-col-topic">Topic</div>
                    <div className="tt-col-category">Category</div>
                    <div className="tt-col-value">Views</div>
                </div>

                {
                    replies && replies.map(x => <PostCard key={x.id} data={x} />)
                }

            </div>
        </div>
    )
}

export default UserReplies