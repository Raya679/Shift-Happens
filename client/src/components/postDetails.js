import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { HeartIcon } from "@heroicons/react/solid";
import { format } from "date-fns";

const PostDetails = ({ post, onOpenModal }) => {
  const { user } = useAuthContext();
  const [likes, setLikes] = useState(post.upvotes.length);

  useEffect(() => {
    setLikes(post.upvotes.length);
  }, [post.upvotes]);

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
        console.error("Failed to like the post");
      }
    } catch (error) {
      console.error("Error occurred while liking the post:", error);
    }
  };

  const formattedDate = post.time
    ? format(new Date(post.time), "PPP")
    : "Date unavailable";

  return (
    <div className="flex justify-center m-4">
      <button className="w-3/4" onClick={() => onOpenModal(post)}>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
          <h4 className="font-bold text-xl text-slate-700 mb-2">
            {post.title}
          </h4>
          <p className="mb-4 text-gray-800 line-clamp-3">{post.description}</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-1 text-sm text-gray-600 ml-0">
                <strong>Created By:</strong> {post.author}
              </p>
              <p className="text-sm text-gray-600 ml-6">
                <strong>Date:</strong> {formattedDate}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <button
                className="flex items-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105"
                onClick={handleLike}
              >
                <HeartIcon className="h-5 w-5 mr-1" /> {likes}
              </button>
              <p className="text-sm text-gray-500">
                <strong>Views:</strong> {post.views}
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default PostDetails;
