const PostCard = () => {
    return (
        <div className="tt-item tt-itemselect">
            <div className="tt-col-avatar">
                <svg className="tt-icon">
                    <use xlinkHref="#icon-ava-k"></use>
                </svg>
            </div>
            <div className="tt-col-description">
                <h6 className="tt-title"><a href="page-single-topic.html">
                    <svg className="tt-icon">
                        <use xlinkHref="#icon-pinned"></use>
                    </svg>
                    Halloween Costume Contest 2018
                </a></h6>
                <div className="row align-items-center no-gutters">
                    <div className="col-11">
                        <ul className="tt-list-badge">
                            <li className="show-mobile"><a href="#"><span className="tt-color01 tt-badge">politics</span></a></li>
                            <li><a href="#"><span className="tt-badge">contests</span></a></li>
                            <li><a href="#"><span className="tt-badge">authors</span></a></li>
                        </ul>
                    </div>
                    <div className="col-1 ml-auto show-mobile">
                        <div className="tt-value">1h</div>
                    </div>
                </div>
            </div>
            <div className="tt-col-category"><span className="tt-color01 tt-badge">politics</span></div>
            <div className="tt-col-value hide-mobile">985</div>
            <div className="tt-col-value tt-color-select hide-mobile">502</div>
            <div className="tt-col-value hide-mobile">15.1k</div>
            <div className="tt-col-value hide-mobile">1h</div>
        </div>
    );
}

export default PostCard;