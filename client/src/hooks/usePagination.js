import { useState } from "react"

export const usePagination = (posts, currentDefaultPage = 1, amountPerPage = 2) => {
    const [loading, setLoading] = useState(true);
    const [currentPage] = useState(currentDefaultPage);
    const [postPerPage, setPostPerPage] = useState(amountPerPage);


    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts && posts.slice(indexOfFirstPost, indexOfLastPost);


    return {
        //loader
        setPostPerPage,
        setLoading,
        currentPosts,
        loading
    };

}