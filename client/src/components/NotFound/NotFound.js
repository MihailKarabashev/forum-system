import './NotFound.css';

const NotFound = () => {
  return (
    <div className="container">
      <div className="tt-layout-404">
        <span className="tt-icon">
          <svg className="icon">
            <use xlinkHref="#icon-error_404"></use>
          </svg>
        </span>
        <h6 className="tt-title">ERROR 404</h6>
        <p>Sorry we can’t find what you are looking for, here’s some<br />
          <a href="index-2.html" className="tt-color-dark tt-underline-02">suggested topics</a> for you.</p>
      </div>
    </div>
    // I can add some more suggested topics
  );
}

export default NotFound;