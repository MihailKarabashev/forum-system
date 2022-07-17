import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from '../../contexts/AuthContext';

import { generateSvgIcon } from "../../utils/getProfilePicture";

import * as postService from "../../services/postServices";

import Search from "../Search/Search";
import useDebounce from "../../hooks/useDebounce";

const initialState = {
  posts: [],
  search: "",
  searchActive: false,
}

const Header = () => {
  const [headSearch, setHeadSearch] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(headSearch.search, 500);


  useEffect(() => {

    if (debouncedSearch) {
      setLoading(true);
      postService.searchForPosts(debouncedSearch)
        .then(data => {
          setHeadSearch(state => ({
            ...state,
            posts: data
          }));

          setLoading(false);
        });
    }

  }, [debouncedSearch]);


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
            <i className="tt-icon"><svg><use xlinkHref={`#icon-ava-${generateSvgIcon(user.username)}`}></use></svg></i>
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
      <li><Link to="/user">Single User Settings</Link></li>
    </>
  );

  const guestNavLinks = (
    <>
      <li><Link to="/register">Sign up</Link></li>
      <li><Link to="/login">Log in</Link></li>
    </>
  )

  const onChange = (e) => {
    const query = e.target.value.toLowerCase();

    setHeadSearch(state => ({
      ...state,
      search: query
    }));

    if (query.length > 1) {
      setHeadSearch(state => ({
        ...state,
        searchActive: true
      }));
    } else {
      setHeadSearch(state => ({
        ...state,
        searchActive: false
      }));
    }

  }

  const onHandlerClick = (postId) => {
    setHeadSearch(initialState);

    navigate(`/posts/details/${postId}`)
  }

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
                      <li><Link to="/categories">Categories</Link></li>
                      <li><Link to="_demo_modal-advancedSearch.html">Advanced Search</Link></li>
                      <li><Link to="error404.html">Error 404</Link></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <Search
              search={headSearch.search}
              posts={headSearch.posts}
              searchActive={headSearch.searchActive}
              handleChange={onChange}
              handleClick={onHandlerClick}
            />
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