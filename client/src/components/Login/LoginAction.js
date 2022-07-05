import { Link } from 'react-router-dom';


const LoginAction = () => {
    return (
        <div className="tt-topic-list">
            <div className="tt-item tt-item-popup">
                <div className="tt-col-message">
                    Looks like you are new here. Register for free, learn and contribute.
                </div>
                <div className="tt-col-btn">
                    <Link type="button" className="btn btn-primary" to="/login">Log in</Link>
                    <Link type="button" className="btn btn-secondary" to="/register">Sign up</Link>
                    <button type="button" className="btn-icon">
                        <svg className="tt-icon">
                            <use xlinkHref="#icon-cancel"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default LoginAction;