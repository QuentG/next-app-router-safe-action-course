import { Fragment, memo } from "react"
import LoadingSkeleton from "../skeleton/loading-skeleton"

export const PostLoadingCards = memo(() => {
    return (
        <Fragment>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
        </Fragment>
    )
})