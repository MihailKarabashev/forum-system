import { Link } from "react-router-dom";

const Tags = ({
    tags
}) => {
    return (
        <div className="row align-items-center no-gutters">
            <div className="col-11">
                <ul className="tt-list-badge">
                    {tags.map(x => <li key={x.id}><Link to="#"><span className="tt-badge">{x.name}</span></Link></li>)}
                </ul>
            </div>
        </div>
    );
}

export default Tags;