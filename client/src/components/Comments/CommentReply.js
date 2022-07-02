const CommentReply = ({
    reply
}) => {
    return (
        <div className="topic-inner-list">
            <div className="topic-inner">
                <div className="topic-inner-title">
                    <div className="topic-inner-avatar">
                        <i className="tt-icon"><svg><use xlinkHref="#icon-ava-s"></use></svg></i>
                    </div>
                    <div className="topic-inner-title"><a href="#">{reply.parentAuthorUserName}</a></div>
                </div>
                <div className="topic-inner-description">
                    {reply.parentDescription}
                </div>
            </div>
        </div>
    )
};


export default CommentReply;