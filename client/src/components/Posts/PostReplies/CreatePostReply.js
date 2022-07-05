const CreatePostReply = ({
    onSubmitFormHandler,
}) => {

    return (
        <div className="tt-wrapper-inner">
            <form className="pt-editor form-default" onSubmit={onSubmitFormHandler}>
                <h6 className="pt-title">Post Your Reply</h6>
                <div className="form-group">
                    <div className="form-group">
                        <textarea name="message" className="form-control" rows="5" placeholder="Lets get started"></textarea>
                    </div>
                </div>
                <div className="pt-row">
                    <div className="col-auto">
                        <div className="checkbox-group">
                            <input type="checkbox" id="checkBox21" name="checkbox" />
                            <label htmlFor="checkBox21">
                                <span className="check"></span>
                                <span className="box"></span>
                                <span className="tt-text">Subscribe to this topic.</span>
                            </label>
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-secondary btn-width-lg">Reply</button>
                    </div>
                </div>
            </form>
        </div>
    )
};


export default CreatePostReply;