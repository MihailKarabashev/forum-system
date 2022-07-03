import { RichTextEditor } from '@mantine/rte';

const CreatePostReply = ({
    onTextEditorChange,
    controls,
    value
}) => {
    return (
        <div className="tt-wrapper-inner">
            <form className="pt-editor form-default">
                <h6 className="pt-title">Post Your Reply</h6>
                <div className="form-group">
                    <RichTextEditor
                        value={value} onChange={onTextEditorChange} controls={controls}
                        onImageUpload={() => console.log('Function here')}
                        styles={{ root: { background: '#E2E7EA' }, toolbar: { background: '#E2E7EA' }, }}
                        style={{ paddingTop: 10, paddingBottom: 100 }}
                    />
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
                        <a href="#" className="btn btn-secondary btn-width-lg">Reply</a>
                    </div>
                </div>
            </form>
        </div>
    )
};


export default CreatePostReply;