import { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

import { useNavigate, Link } from "react-router-dom";
import * as authService from '../../services/authService';

const initialValues = {
  username: '',
  password: ''
}

const Login = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }

    return errors;
  }




  const onLoginHandler = (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let formData = new FormData(e.currentTarget);

      let email = formData.get('email');
      let password = formData.get('password');

      authService
        .login(email, password)
        .then(authData => {
          login(authData);
          //notification please
          navigate('/');
        })
        .catch(err => {
          // show notification and do nothing
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="tt-loginpages-wrapper">
        <div className="tt-loginpages">
          <a href="index-2.html" className="tt-block-title">
            <img src="images/logo.png" alt="" />
            <div className="tt-title">
              Welcome to Forum19
            </div>
            <div className="tt-description">
              Log into your account to unlock true power of community.
            </div>
          </a>
          <form className="form-default" method="POST" onSubmit={onLoginHandler}>
            <div className="form-group">
              <label htmlFor="loginUserName">Username</label>
              <input type="text" name="username"
                className="form-control" id="loginUserName"
                placeholder="username" value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p style={{ color: 'red' }}>{formErrors.username}</p>
            <div className="form-group">
              <label htmlFor="loginUserPassword">Password</label>
              <input type="password" name="password"
                className="form-control" id="loginUserPassword"
                placeholder="************" value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p style={{ color: 'red' }}>{formErrors.password}</p>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <div className="checkbox-group">
                    <input type="checkbox" id="settingsCheckBox01" name="checkbox" />
                    <label htmlFor="settingsCheckBox01">
                      <span className="check"></span>
                      <span className="box"></span>
                      <span className="tt-text">Remember me</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col ml-auto text-right">
                <a href="#" className="tt-underline">Forgot Password</a>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-secondary btn-block">Log in</button>
            </div>
            <p>Or login with social network</p>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <a href="#" className="btn btn-color01 btn-secondary btn-block">
                    <i>
                      <svg className="icon">
                        <use xlinkHref="#facebook-f-brands"></use>
                      </svg>
                    </i>
                    Facebook
                  </a>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <a href="#" className="btn btn-color02 btn-block">
                    <i>
                      <svg className="icon">
                        <use xlinkHref="#twitter-brands"></use>
                      </svg>
                    </i>
                    Twitter
                  </a>
                </div>
              </div>
            </div>
            <p>Don’t have an account? <a href="#" className="tt-underline">Signup here</a></p>
            <div className="tt-notes">
              By Logging in, signing in or continuing, I agree to
              Forum19’s <a href="#" className="tt-underline">Terms of Use</a> and <a href="#" className="tt-underline">Privacy Policy.</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;