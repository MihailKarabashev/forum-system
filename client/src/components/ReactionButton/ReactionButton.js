import { Link } from 'react-router-dom';

import './ReactionButton.css';
const ReactionButton = ({
    reaction,
    isReaction,
    iconType,
    style,
    onReact
}) => {

    return (
        <Link to="#" onClick={onReact} className="tt-icon-btn">
            <i className="tt-icon">
                <svg style={isReaction ? style : {}} >
                    <use xlinkHref={`#icon-${iconType}`}>
                    </use>
                </svg>
            </i>
            {
                reaction && <span className="tt-text">{reaction}</span>
            }
        </Link>
    )
}

export default ReactionButton