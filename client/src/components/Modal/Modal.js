const Modal = () => {
    return (
        <div className="modal fade show modal-open container" id="modalAgeConfirmation" tabIndex="-1" role="dialog" aria-label="myModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                    <div className="modal-header">
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
                                <a href="#" className="tt-option-btn">
                                    <span className="tt-icon">
                                        <svg><use xlinkHref="#icon-exit"></use></svg>
                                    </span>
                                    <span className="btn btn-primary">No Thank You</span>
                                </a>
                            </div>
                            <div className="tt-col">
                                <a href="#" className="tt-option-btn" data-dismiss="modal">
                                    <span className="tt-icon">
                                        <svg><use xlinkHref="#icon-enter"></use></svg>
                                    </span>
                                    <span className="btn btn-primary">Continue</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal