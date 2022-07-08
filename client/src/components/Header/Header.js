import { Link } from "react-router-dom";
import { useAuthContext } from '../../contexts/AuthContext';

const Header = () => {
  const { user } = useAuthContext();

  const guestNavigation =
    (
      <div className="col-auto ml-auto">
        <div className="tt-account-btn">
          <Link to="/login" className="btn btn-primary">Log in</Link>
          <Link to="/register" className="btn btn-secondary">Sign up</Link>
        </div>
      </div>
    )

  const userNavigation =
    (
      <div className="col-auto ml-auto">
        <div className="tt-user-info d-flex justify-content-center">
          <Link to="#" className="tt-btn-icon">
            <i className="tt-icon"><svg><use xlinkHref="#icon-notification"></use></svg></i>
          </Link>
          <div className="tt-avatar-icon tt-size-md">
            <i className="tt-icon"><svg><use xlinkHref={`#icon-ava-${user.username[0]}`}></use></svg></i>
          </div>
          <div className="custom-select-01">
            <select>
              <option value="Default Sorting">{user.username}</option>
            </select>
          </div>
        </div>
      </div>
    )

  const userNavLinks = (
    <>
      <li><Link to="/posts/create">Create Topic</Link></li>
      <li><Link to="page-single_settings.html">Single User Settings</Link></li>
    </>
  );

  const guestNavLinks = (
    <>
      <li><Link to="/register">Sign up</Link></li>
      <li><Link to="/login">Log in</Link></li>
    </>
  )


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
                  <li><Link to="/categories"><span>Categories</span></Link></li>
                  <li><Link to="page-tabs.html"><span>Trending</span></Link></li>
                  <li><Link to="page-tabs.html"><span>About</span></Link></li>
                  <li>
                    <Link to="page-single-user.html"><span>Pages</span></Link>
                    <ul>
                      <li><Link to="/">Home</Link></li>
                      {user.email
                        ? userNavLinks
                        : guestNavLinks
                      }
                      <li><Link to="page-categories.html">Categories</Link></li>
                      <li><Link to="_demo_modal-advancedSearch.html">Advanced Search</Link></li>
                      <li><Link to="error404.html">Error 404</Link></li>
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
          {
            user.email
              ? userNavigation
              : guestNavigation
          }
        </div>
      </div>
    </header>
  );
};

export default Header;