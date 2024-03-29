import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { HeartIcon } from "@heroicons/react/solid";

const PostDetails = ({ post }) => {
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();
  const [likes, setLikes] = useState(post.upvotes.length);
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (response.ok) {
    } else {
      // Handle error
      console.error("Failed to like the post");
    }
    setShowFullDescription(!showFullDescription);
  };

  const handleLike = async () => {
    if (!user || (post.upvotes && post.upvotes.includes(user._id))) return;
    try {
      const response = await fetch(`/api/posts/like/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setLikes(data.upvotes.length);
      } else {
        // Handle error
        console.error("Failed to like the post");
      }
    } catch (error) {
      console.error("Error occurred while liking the post:", error);
    }
  };

  return (
    <div className="w-full flex justify-center m-2 pt-4">
      <button className="w-3/4">
        <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
          <div>
            <h4 className="font-bold text-lg mb-2">Title: {post.title}</h4>
            <p className="mb-2" style={{ whiteSpace: "pre-wrap" }}>
              <strong>Description:</strong>{" "}
              {showFullDescription ? post.description : `${post.description.slice(0, 100)} ... `}
              <button
                className="text-blue-500 hover:underline focus:outline-none"
                onClick={toggleDescription}
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </button>
            </p>
            <p className="mb-2">
              <strong>Created By:</strong> {post.author}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
              onClick={handleLike}
            >
              <HeartIcon className="h-5 w-5 mr-1 inline-block" /> {likes}
            </button>
            <p className="mb-0">
              <strong>Views:</strong> {post.views}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default PostDetails;
