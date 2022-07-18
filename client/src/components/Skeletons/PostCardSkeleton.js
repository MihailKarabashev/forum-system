import Skeleton from "react-loading-skeleton"

const PostCardSkeleton = ({
    cards
}) => {
    return (
        Array(cards).fill(0).map((_, index) => (
            <div className="tt-item" key={index}>
                <div className="tt-col-avatar">
                    <Skeleton circle width={40} height={40} />
                </div>

                <div className="tt-col-description">
                    <h6 className="tt-title">

                        <Skeleton width={150} />
                    </h6>

                    <div className="row align-items-center no-gutters">
                        <Skeleton width={70} style={{ marginRight: '7px' }} count={2} inline />
                    </div>
                </div>

                <div className="tt-col-category">
                    <Skeleton width={80} height={25} />
                </div>

                <>
                    <div className="tt-col-value hide-mobile"> <Skeleton width={80} height={25} /> </div>
                    <div className="tt-col-value tt-color-select hide-mobile"> <Skeleton width={80} height={25} /></div>
                    <div className="tt-col-value hide-mobile"> <Skeleton width={80} height={25} /></div>
                </>
                <div className="tt-col-value hide-mobile"><Skeleton width={80} height={25} /></div>
            </div>
        ))
    )
}

export default PostCardSkeleton