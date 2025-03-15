import { useEffect, useState } from "react";
import { usePostContext } from "../hooks/usePostContext";
import PostDetails from "../components/postDetails";
import PostForm from "../components/postForm";
import { useAuthContext } from "../hooks/useAuthContext";
import SideBar from "../components/sidebar";
import bg from "../pictures/duplo24.jpeg";
import { HeartIcon } from "@heroicons/react/solid";
import { format } from "date-fns";

const Posts = () => {
  const { posts, dispatch } = usePostContext();
  const { user } = useAuthContext();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [dispatch, user]);

  const openModal = (post) => {
    setSelectedPost(post);
    setLikes(post.upvotes.length);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const handleLike = async () => {
    if (
      !user ||
      (selectedPost.upvotes && selectedPost.upvotes.includes(user._id))
    )
      return;

    try {
      const response = await fetch(`/api/posts/like/${selectedPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const updatedPost = await response.json();

        setLikes(updatedPost.upvotes.length);
        setSelectedPost(updatedPost);

        dispatch({
          type: "UPDATE_POST",
          payload: updatedPost,
        });
      } else {
        console.error("Failed to like the post");
      }
    } catch (error) {
      console.error("Error occurred while liking the post:", error);
    }
  };

  return (
    <div className="flex">
      <SideBar className="fixed top-0 left-0 z-50" />
      <div
        className="flex-grow ml-64 p-6 "
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Community Posts
        </h2>
        <PostForm />
        <div className="w-full">
          {posts &&
            posts.map((post) => (
              <PostDetails post={post} key={post._id} onOpenModal={openModal} />
            ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-5 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>

            <h2 className="font-bold text-xl mb-2 text-center">
              {selectedPost.title}
            </h2>
            <p className="mb-4" style={{ whiteSpace: "pre-wrap" }}>
              {selectedPost.description}
            </p>
            <p className="mb-2">
              <strong>Created By: </strong> {selectedPost.author}
            </p>
            <p className="mb-2">
              <strong>Date posted: </strong>
              {selectedPost.time
                ? format(new Date(selectedPost.time), "PPP")
                : "Date unavailable"}
            </p>

            <div className="flex justify-end mt-4">
              <button
                className="flex items-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mr-2 transition-all duration-200 transform hover:scale-105"
                onClick={handleLike}
              >
                <HeartIcon className="h-5 w-5 mr-1" /> {likes}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
