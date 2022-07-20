import Skeleton from "react-loading-skeleton"

const PostCommentSkeleton = () => {
    return (
        <div className="tt-item">
            <div className="tt-single-topic">
                <div className="tt-item-header pt-noborder">
                    <div className="tt-item-info info-top">
                        <div className="tt-avatar-icon">
                            <Skeleton className="tt-icon" circle width={40} height={40} />
                        </div>
                        <Skeleton className="tt-avatar-title" width={45} height={15} />
                        <div className="tt-info-time">
                            <Skeleton inline className="tt-icon" width={65} height={19} />
                            <Skeleton inline className="tt-icon" width={20} height={20} circle />
                        </div>
                    </div>
                </div>
                <div className="tt-item-description" >
                    <div className="topic-inner-list">
                        <div className="topic-inner">
                            <div className="topic-inner-title">
                                <Skeleton count={3} className="tt-icon" width={800} height={30} style={{ marginBottom: "13px" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCommentSkeleton;