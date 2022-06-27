const Header = () => {
  return (
    <header id="tt-header">
      <div className="container">
        <div className="row tt-row no-gutters">
          <div className="col-auto">
            <div className="tt-logo">
              <a href="index-2.html"><img src="images/logo.png" alt="" /></a>
            </div>
            <div className="tt-desktop-menu">
              <nav>
                <ul>
                  <li><a href="page-categories.html"><span>Categories</span></a></li>
                  <li><a href="page-tabs.html"><span>Trending</span></a></li>
                  <li><a href="page-create-topic.html"><span>New</span></a></li>
                  <li>
                    <a href="page-single-user.html"><span>Pages</span></a>
                    <ul>
                      <li><a href="index-2.html">Home</a></li>
                      <li><a href="page-single-topic.html">Single Topic</a></li>
                      <li><a href="page-create-topic.html">Create Topic</a></li>
                      <li><a href="page-single_settings.html">Single User Settings</a></li>
                      <li><a href="page-signup.html">Sign up</a></li>
                      <li><a href="page-login.html">Log in</a></li>
                      <li><a href="page-categories.html">Categories</a></li>
                      <li><a href="page-tabs.html">About</a></li>
                      <li><a href="_demo_modal-advancedSearch.html">Advanced Search</a></li>
                      <li><a href="error404.html">Error 404</a></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="tt-search">
              <button className="tt-search-toggle" data-toggle="modal" data-target="#modalAdvancedSearch">
                <svg className="tt-icon">
                  <use xlinkHref="#icon-search"></use>
                </svg>
              </button>
              <form className="search-wrapper">
                <div className="search-form">
                  <input type="text" className="tt-search__input" placeholder="Search" />
                  <button className="tt-search__btn" type="submit">
                    <svg className="tt-icon">
                      <use xlinkHref="#icon-search"></use>
                    </svg>
                  </button>
                  <button className="tt-search__close">
                    <svg className="tt-icon">
                      <use xlinkHref="#cancel"></use>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-auto ml-auto">
            <div className="tt-account-btn">
              <a href="page-login.html" className="btn btn-primary">Log in</a>
              <a href="page-signup.html" className="btn btn-secondary">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;