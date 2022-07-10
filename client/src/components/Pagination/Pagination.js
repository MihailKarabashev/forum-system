const Pagination = ({
    onPaginationClickHandler,
}) => {
    return (
        <div className="tt-row-btn">
            <button onClick={onPaginationClickHandler} type="button" className="btn-icon js-topiclist-showmore">
                <svg className="tt-icon">
                    <use xlinkHref="#icon-load_lore_icon"></use>
                </svg>
            </button>
        </div>
    )
}

export default Pagination