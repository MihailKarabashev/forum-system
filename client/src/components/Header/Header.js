import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from '../../contexts/AuthContext';

import { PostDataContext } from "../../contexts/PostDataContext";

import { generateSvgIcon } from "../../utils/getProfilePicture";

import Search from "../Search/Search";


const Header = () => {
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  // const { posts, setPosts } = useContext(PostDataContext);
  const { user } = useAuthContext();

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 1) {
      const filterSuggestions = posts.filter(
        suggestion => suggestion.title.toLowerCase().indexOf(query) > -1
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (postId) => {
    setSuggestions([]);
    setValue("");
    setSuggestionsActive(false);

    navigate(`/posts/details/${postId}`)
  };


  const handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex].title);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

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
              value={value}
              suggestions={suggestions}
              suggestionsActive={suggestionsActive}
              handleChange={handleChange}
              handleKeyDown={(e) => handleKeyDown(e)}
              handleClick={handleClick}
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