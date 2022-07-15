import React from 'react'

const UserReplies = () => {
    return (
        <div className="tab-pane tt-indent-none" id="tt-tab-03" role="tabpanel">
            <div className="tt-topic-list">
                <div className="tt-list-header">
                    <div className="tt-col-topic">Topic</div>
                    <div className="tt-col-category">Category</div>
                    <div className="tt-col-value">Activity</div>
                </div>
                <div className="tt-item">
                    <div className="tt-col-avatar">
                        <svg className="tt-icon">
                            <use xlinkHref="#icon-ava-d"></use>
                        </svg>
                    </div>
                    <div className="tt-col-description">
                        <h6 className="tt-title"><a href="#">
                            Does Envato act against the authors of Envato markets?
                        </a></h6>
                        <div className="row align-items-center no-gutters hide-desktope">
                            <div className="col-9">
                                <ul className="tt-list-badge">
                                    <li className="show-mobile"><a href="#"><span className="tt-color06 tt-badge">movies</span></a></li>
                                </ul>
                            </div>
                            <div className="col-3 ml-auto show-mobile">
                                <div className="tt-value">5 Jan,19</div>
                            </div>
                        </div>
                        <div className="tt-content">
                            I really liked new badge - T-shirt. Will there be new contests with new badges for AudioJungle?
                        </div>
                    </div>
                    <div className="tt-col-category"><a href="#"><span className="tt-color06 tt-badge">movies</span></a></div>
                    <div className="tt-col-value-large hide-mobile">5 Jan,19</div>
                </div>
            </div>
        </div>
    )
}

export default UserReplies