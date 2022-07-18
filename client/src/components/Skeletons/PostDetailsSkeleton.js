import Skeleton from "react-loading-skeleton"

const PostDetailsSkeleton = () => {
    return (
        <div class="container">
            <div class="tt-single-topic-list">
                <div class="tt-item">
                    <div class="tt-single-topic">
                        <div class="tt-item-header">
                            <div class="tt-item-info info-top">
                                <div class="tt-avatar-icon">
                                    <Skeleton circle width={40} height={40} />
                                </div>
                                <div class="tt-avatar-title">
                                    <Skeleton width={40} />
                                </div>

                                <div className="col-auto ml-auto">
                                    <Skeleton count={2} className="tt-offset-27" inline width={80} height={30} style={{ marginLeft: '6px' }} />
                                </div>
                                <div class="tt-info-time">
                                    <Skeleton circle width={18} height={18} />
                                </div>
                            </div>
                            <h3 class="tt-item-title">
                                <div>
                                    <Skeleton width={400} />
                                </div>
                            </h3>
                            <div class="tt-item-tag">
                                <div class="tt-list-badge">
                                    <Skeleton width={60} count={3} className="tt-badge" inline style={{ marginLeft: '6px' }} />
                                </div>
                            </div>
                        </div>
                        <div class="tt-item-description">
                            <Skeleton count={4} height={30} style={{ marginBottom: '5px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetailsSkeleton