import { Routes, Route } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext';
import { PostDatProvider } from "./contexts/PostDataContext";

import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Logout from "./components/Logout/Logout";
import NotFound from "./components/NotFound/NotFound";
import Posts from "./components/Posts/Posts";
import CreatePost from "./components/CreatePost/CreatePost";
import PostDetails from "./components/Posts/PostDetails/PostDetails";
import Categories from "./components/Categories/Categories";

import "../src/App.css";



function App() {

  return (
    <main id="tt-pageContent">
      <AuthProvider>
        <PostDatProvider>
          <Header />

          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/details/:postId" element={<PostDetails />} />
          </Routes>

        </PostDatProvider>
      </AuthProvider>

    </main>
  );
}

export default App;
