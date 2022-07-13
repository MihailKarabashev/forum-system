import { Link } from "react-router-dom"

const Modal = ({ onClose, onSave }) => {
    return (
        <div className="modal fade show modal-open container" id="modalAgeConfirmation" tabIndex="-1" role="dialog" aria-label="myModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                    <div className="modal-header" onClick={onClose}>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div className="tt-modal-confirmation">
                        <div className="text-center">
                            <h6 className="tt-title">
                                Are you old enough?
                            </h6>
                            <p>You must be at least eighteen years old to view this threads.</p>
                        </div>
                        <div className="tt-confirmation-btn">
                            <div className="tt-col">
                                <Link onClick={onClose} to="#" className="tt-option-btn">
                                    <span className="tt-icon">
                                        <svg style={{ fill: 'red' }}><use xlinkHref="#icon-cancel"></use></svg>

                                    </span>
                                    <span className="btn btn-primary">No Thank You</span>
                                </Link>
                            </div>
                            <div className="tt-col">
                                <Link onClick={onSave} to="#" className="tt-option-btn" data-dismiss="modal">
                                    <span className="tt-icon">
                                        <svg style={{ fill: 'green' }}><use xlinkHref="#icon-verified"></use></svg>
                                    </span>
                                    <span className="btn btn-primary">Continue</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal