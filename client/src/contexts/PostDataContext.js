import { createContext, useState, useEffect } from "react";
import * as postService from '../services/postServices';

const PostDataContext = createContext({});

export const PostDatProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let ignore = false;

        postService.getPosts()
            .then(data => {
                if (!ignore) setPosts(data);
            })
            .catch(err => console.log(err))


        return () => { ignore = true };
    }, []);


    return (
        <PostDataContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostDataContext.Provider>
    )
};

export { PostDataContext };