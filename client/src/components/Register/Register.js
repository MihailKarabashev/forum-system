import { useAuthContext } from '../../contexts/AuthContext';

import { useNavigate, Link } from 'react-router-dom';
import * as authService from '../../services/authService';

import useForm from '../../hooks/useForm';

const Register = () => {
  const { register } = useAuthContext();
  const navigate = useNavigate();

  const formRegister = () => {
    authService
      .register(values.username, values.email, values.password)
      .then(authData => {
        console.log(authData);
        register(authData);
        navigate('/');
      })
      .catch(error => {
        // navigation error
        console.log('ERRRRRRRRROR', error);
      })

    console.log(values.username, values.email, values.password);
  }

  const { values, errors, handleChange, handleSubmit } = useForm(formRegister);


  return (
    <div className="container">
      <div className="tt-loginpages-wrapper">
        <div className="tt-loginpages">
          <a href="index-2.html" className="tt-block-title">
            <img src="images/logo.png" alt="" />
            <div className="tt-title">
              Welcome to ForumSystem
            </div>
            <div className="tt-description">
              Join the forum to unlock true power of community.
            </div>
          </a>
          <form className="form-default" method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="registerUsername">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                id="registerUsername"
                placeholder="username"
                value={values.username}
                onChange={handleChange} />
            </div>
            <p style={{ color: 'red' }}>{errors.username}</p>

            <div className="form-group">
              <label htmlFor="registerEmail">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                id="registerEmail"
                placeholder="Sample@sample.com"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <p style={{ color: 'red' }}>{errors.email}</p>

            <div className="form-group">
              <label htmlFor="registerUserPassword">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="registerUserPassword"
                placeholder="************"
                value={values.password}
                onChange={handleChange} />
            </div>
            <p style={{ color: 'red' }}>{errors.password}</p>
            <div className="form-group">
              <button type="submit" className="btn btn-secondary btn-block">Create my account</button>
            </div>
            <p>Or signup with social network</p>
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
            <p>Already have an account? <Link to="/login" className="tt-underline">Login here</Link></p>
            <div className="tt-notes">
              By signing up, signing in or continuing, I agree to
              Forum19’s <Link to="#" className="tt-underline">Terms of Use</Link>
              and <Link to="#" className="tt-underline">Privacy Policy.</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;