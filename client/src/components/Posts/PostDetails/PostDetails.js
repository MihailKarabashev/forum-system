import CommentCard from "../../Comments/CommentCard/CommentCard";

const PostDetails = () => {
  return (
    <>
      <div className="container">
        <div className="tt-single-topic-list">
          <div className="tt-item">
            <div className="tt-single-topic">
              <div className="tt-item-header">
                <div className="tt-item-info info-top">
                  <div className="tt-avatar-icon">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-ava-d"></use></svg></i>
                  </div>
                  <div className="tt-avatar-title">
                    <a href="#">dylan89</a>
                  </div>
                  <a href="#" className="tt-info-time">
                    <i className="tt-icon"><svg><use xlinkHref="#icon-time"></use></svg></i>6 Jan,2019
                  </a>
                </div>
                <h3 className="tt-item-title">
                  <a href="#">Web Hosting Packages for ThemeForest WordPress</a>
                </h3>
                <div className="tt-item-tag">
                  <ul className="tt-list-badge">
                    <li><a href="#"><span className="tt-color03 tt-badge">exchange</span></a></li>
                    <li><a href="#"><span className="tt-badge">themeforest</span></a></li>
                    <li><a href="#"><span className="tt-badge">elements</span></a></li>
                  </ul>
                </div>
              </div>
              <div className="tt-item-description">
                <h6 className="tt-title">Get ready for Movember!</h6>
                <p>
                  It’s time to channel your inner Magnum P.I., Ron Swanson or Hercule Poroit! It’s the time that all guys (or gals) love and all our
                  partners hate It’s Movember!
                </p>
                <p>
                  Throughout November we will be inviting all community members to help raise awareness and funds for the lives of men affected
                  by cancer and mental health problems via the Movember Foundation 10.
                </p>
                <h6 className="tt-title">How Does it Work?</h6>
                <p>
                  Authors and customers with facial hair unite! Simply grow, groom, and share your facial hair during November! Even females can enter if they desire (be creative, ladies!). Be inspired by checking out last year’s highlights 28.
                </p>
              </div>
              <div className="tt-item-info info-bottom">
                <a href="#" className="tt-icon-btn">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-like"></use></svg></i>
                  <span className="tt-text">671</span>
                </a>
                <a href="#" className="tt-icon-btn">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-dislike"></use></svg></i>
                  <span className="tt-text">39</span>
                </a>
                <a href="#" className="tt-icon-btn">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-favorite"></use></svg></i>
                  <span className="tt-text">12</span>
                </a>
                <div className="col-separator"></div>
                <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-share"></use></svg></i>
                </a>
                <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-flag"></use></svg></i>
                </a>
                <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                  <i className="tt-icon"><svg><use xlinkHref="#icon-reply"></use></svg></i>
                </a>
              </div>
            </div>
          </div>

          {/* foreach all comments */}
          <CommentCard />

        </div>
        <div className="tt-wrapper-inner">
          <h4 className="tt-title-separator"><span>You’ve reached the end of replies</span></h4>
        </div>

        {/* Add library like TimyMC to escape html when writting */}
        <div className="tt-wrapper-inner">
          <form className="pt-editor form-default">
            <h6 className="pt-title">Post Your Reply</h6>
            <div className="form-group">
              <textarea name="message" className="form-control" rows="5" placeholder="Lets get started"></textarea>
            </div>
            <div className="pt-row">
              <div className="col-auto">
                <div className="checkbox-group">
                  <input type="checkbox" id="checkBox21" name="checkbox" />
                  <label htmlFor="checkBox21">
                    <span className="check"></span>
                    <span className="box"></span>
                    <span className="tt-text">Subscribe to this topic.</span>
                  </label>
                </div>
              </div>
              <div className="col-auto">
                <a href="#" className="btn btn-secondary btn-width-lg">Reply</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
};

export default PostDetails;