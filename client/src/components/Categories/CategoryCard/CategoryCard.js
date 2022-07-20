import { Link } from "react-router-dom";

const CategoryCard = ({
    category
}) => {
    return (

        <div className="col-md-6 col-lg-4">
            <div className="tt-item">
                <div className="tt-item-header">
                    <ul className="tt-list-badge">
                        <li>
                            <Link to="#">
                                <span className={category.id > 5 ? "tt-color01 tt-badge" : `tt-color0${category.id} tt-badge`}>
                                    {category.name}
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <h6 className="tt-title"><a href="page-categories-single.html">Threads - {category.threads}</a></h6>
                </div>
                <div className="tt-item-layout">
                    <div className="innerwrapper">
                        {category.description}
                    </div>
                    <div className="innerwrapper">
                        <h6 className="tt-title">Similar TAGS</h6>
                        <ul className="tt-list-badge">
                            {
                                category.similarTags
                                &&
                                category.similarTags.map(tag => <li><Link to="#"><span className="tt-badge">{tag.name}</span></Link></li>)
                            }
                        </ul>
                    </div>
                    <Link to="#" className="tt-btn-icon">
                        <i className="tt-icon"><svg><use xlinkHref="#icon-favorite"></use></svg></i>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default CategoryCard;
