import { useAuthContext } from '../../contexts/AuthContext';

import { useNavigate, Link } from "react-router-dom";
import * as authService from '../../services/authService';
import useForm from '../../hooks/useForm';

import './Login.css';

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const formLogin = () => {
    authService
      .login(values.email, values.password)
      .then(authData => {
        login(authData);
        //notification on success
        navigate('/');
      })
      .catch(error => {
        // notifiation error
        console.log('error ===>', error);
      });
  };

  const { values, errors, handleChange, handleSubmit } = useForm(formLogin);

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
          <form className="form-default" method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="loginEmail">Email</label>
              <input type="text" name="email"
                className="form-control" id="loginEmail"
                placeholder="email" value={values.email}
                onChange={handleChange}
              />
            </div>
            <p style={{ color: 'red' }}>{errors.email}</p>

            <div className="form-group">
              <label htmlFor="loginUserPassword">Password</label>
              <input type="password" name="password"
                className="form-control" id="loginUserPassword"
                placeholder="************" value={values.password}
                onChange={handleChange}
              />
            </div>
            <p style={{ color: 'red' }}>{errors.password}</p>

            <div className="form-group">
              <button type="submit" className="btn btn-secondary btn-block">Log in</button>
            </div>
            <p>Or login with social network</p>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <Link to="#" className="btn btn-color01 btn-secondary btn-block">
                    <i>
                      <svg className="icon">
                        <use xlinkHref="#facebook-f-brands"></use>
                      </svg>
                    </i>
                    Facebook
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <Link to="#" className="btn btn-color02 btn-block">
                    <i>
                      <svg className="icon">
                        <use xlinkHref="#twitter-brands"></use>
                      </svg>
                    </i>
                    Twitter
                  </Link>
                </div>
              </div>
            </div>
            <p>Don’t have an account? <Link to="/register" className="tt-underline">Signup here</Link></p>
            <div className="tt-notes">
              By Logging in, signing in or continuing, I agree to
              Forum19’s  <Link to="#" className="tt-underline">Terms of Use</Link>
              and <Link to="#" className="tt-underline">Privacy Policy.</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;