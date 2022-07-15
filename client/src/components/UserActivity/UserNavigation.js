import { Routes, Route, Link } from "react-router-dom";
import UserActivity from "./UserActivity";
import UserReplies from "./UserReplies";

const UserNavigation = () => {
    return (
        <div className="container">
            <div className="tt-tab-wrapper">
                <div className="tt-wrapper-inner">
                    <ul className="nav nav-tabs pt-tabs-default" role="tablist">
                        <li className="nav-item show">
                            <Link className="nav-link active" data-toggle="tab" to="/user/activity" role="tab"><span>Activity</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" data-toggle="tab" to="/user/replies" role="tab"><span>Replies</span></Link>
                        </li>
                        <li className="nav-item tt-hide-md">
                            <Link className="nav-link" data-toggle="tab" to="/user/categories" role="tab"><span>Categories</span></Link>
                        </li>
                    </ul>
                </div>
                <Routes>
                    <Route index element={<UserActivity />} />
                    <Route path="activity" element={<UserActivity />} />
                    <Route path="replies" element={<UserReplies />} />
                </Routes>
            </div>
        </div >
    )
}

export default UserNavigation