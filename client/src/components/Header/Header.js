import { Link } from "react-router-dom";
import { useAuthContext } from '../../contexts/AuthContext';

const Header = () => {

  const { email } = useAuthContext();

  return (
    <header id="tt-header">
      <div className="container">
        <div className="row tt-row no-gutters">
          <div className="col-auto">
            <div className="tt-logo">
              <Link to="/"><img src="images/logo.png" alt="" /></Link>
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
                      <li><Link to="/">Home</Link></li>
                      <li><a href="page-create-topic.html">Create Topic</a></li>
                      <li><a href="page-single_settings.html">Single User Settings</a></li>
                      <li><Link to="/register">Sign up</Link></li>
                      <li><Link to="/login">Log in</Link></li>
                      <li><a href="page-categories.html">Categories</a></li>
                      <li><Link to="page-tabs.html">About</Link></li>
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
            {
              email
                ? ''
                : <div className="tt-account-btn">
                  <Link to="/login" className="btn btn-primary">Log in</Link>
                  <Link to="/register" className="btn btn-secondary">Sign up</Link>
                </div>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;