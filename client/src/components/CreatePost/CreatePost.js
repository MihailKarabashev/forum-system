const CreatePost = () => {
    return (
        <div className="container">
            <div className="tt-wrapper-inner">
                <h1 className="tt-title-border">
                    Create New Topic
                </h1>
                <form className="form-default form-create-topic">
                    <div className="form-group">
                        <label htmlFor="inputTopicTitle">Topic Title</label>
                        <div className="tt-value-wrapper">
                            <input type="text" name="name" className="form-control" id="inputTopicTitle" placeholder="Subject of your topic" />
                            <span className="tt-value-input">99</span>
                        </div>
                        <div className="tt-note">Describe your topic well, while keeping the subject as short as possible.</div>
                    </div>
                    <div className="pt-editor">
                        <h6 className="pt-title">Topic Body</h6>

                        <div className="form-group">
                            <textarea name="message" className="form-control" rows="5" placeholder="Lets get started"></textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="inputTopicTitle">Category</label>
                                    <select className="form-control">
                                        <option value="Select">Select</option>
                                        <option value="Value 01">Value 01</option>
                                        <option value="Value 02">Value 02</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="form-group">
                                    <label htmlFor="inputTopicTags">Tags</label>
                                    <input type="text" name="name" className="form-control" id="inputTopicTags" placeholder="Use comma to separate tags" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto ml-md-auto">
                                <a href="#" className="btn btn-secondary btn-width-lg">Create Post</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="tt-topic-list tt-offset-top-30">
                <div className="tt-list-search">
                    <div className="tt-title">Suggested Topics</div>

                    <div className="tt-search">
                        <form className="search-wrapper">
                            <div className="search-form">
                                <input type="text" className="tt-search__input" placeholder="Search for topics" />
                                <button className="tt-search__btn" type="submit">
                                    <svg className="tt-icon">
                                        <use xlinkHref="#icon-search"></use>
                                    </svg>
                                </button>
                                <button className="tt-search__close">
                                    <svg className="tt-icon">
                                        <use xlinkHref="#icon-cancel"></use>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="tt-list-header tt-border-bottom">
                    <div className="tt-col-topic">Topic</div>
                    <div className="tt-col-category">Category</div>
                    <div className="tt-col-value hide-mobile">Likes</div>
                    <div className="tt-col-value hide-mobile">Replies</div>
                    <div className="tt-col-value hide-mobile">Views</div>
                    <div className="tt-col-value">Activity</div>
                </div>
                <div className="tt-item">
                    <div className="tt-col-avatar">
                        <svg className="tt-icon">
                            <use xlinkHref="#icon-ava-n"></use>
                        </svg>
                    </div>
                    <div className="tt-col-description">
                        <h6 className="tt-title"><a href="#">
                            Does Envato act against the authors of Envato markets?
                        </a></h6>
                        <div className="row align-items-center no-gutters hide-desktope">
                            <div className="col-auto">
                                <ul className="tt-list-badge">
                                    <li className="show-mobile"><a href="#"><span className="tt-color05 tt-badge">music</span></a></li>
                                </ul>
                            </div>
                            <div className="col-auto ml-auto show-mobile">
                                <div className="tt-value">1d</div>
                            </div>
                        </div>
                    </div>
                    <div className="tt-col-category"><span className="tt-color05 tt-badge">music</span></div>
                    <div className="tt-col-value hide-mobile">358</div>
                    <div className="tt-col-value tt-color-select hide-mobile">68</div>
                    <div className="tt-col-value hide-mobile">8.3k</div>
                    <div className="tt-col-value hide-mobile">1d</div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;

