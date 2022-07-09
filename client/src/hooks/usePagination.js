import { useState } from "react"

export const usePagination = (arrayOfPosts, currentDefaultPage = 1, amountPerPage = 2) => {
    const [posts, setPosts] = useState(arrayOfPosts);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(currentDefaultPage);
    const [postPerPage, setPostPerPage] = useState(amountPerPage);


    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


    return {
        //loader
        setPosts,
        setPostPerPage,
        setLoading,
        currentPosts,
        loading
    };

}