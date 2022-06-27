const Register = () => {
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
              Join the forum to unlock true power of community.
            </div>
          </a>
          <form className="form-default">
            <div className="form-group">
              <label htmlFor="loginUserName">Username</label>
              <input type="text" name="name" className="form-control" id="loginUserName" placeholder="azyrusmax" />
            </div>
            <div className="form-group">
              <label htmlFor="loginUserEmail">Email</label>
              <input type="text" name="name" className="form-control" id="loginUserEmail" placeholder="Sample@sample.com" />
            </div>
            <div className="form-group">
              <label htmlFor="loginUserPassword">Password</label>
              <input type="password" name="name" className="form-control" id="loginUserPassword" placeholder="************" />
            </div>
            <div className="form-group">
              <a href="#" className="btn btn-secondary btn-block">Create my account</a>
            </div>
            <p>Or signup with social network</p>
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
            <p>Already have an account? <a href="#" className="tt-underline">Login here</a></p>
            <div className="tt-notes">
              By signing up, signing in or continuing, I agree to
              Forum19’s <a href="#" className="tt-underline">Terms of Use</a> and <a href="#" className="tt-underline">Privacy Policy.</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;