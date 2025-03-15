import { useState } from "react";
import { usePostContext } from "../hooks/usePostContext";
import { useAuthContext } from "../hooks/useAuthContext";

const PostForm = () => {
  const { dispatch } = usePostContext();
  const { user } = useAuthContext();

  const User = JSON.parse(localStorage.getItem("user"));
  const username = User.username;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // const [creatingPost, setCreatingPost] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const Post = { title, description, username };

    const response = await fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify(Post),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setError(null);
      setTitle("");
      setDescription("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_POSTS", payload: json });
      setModalOpen(false);
    }
  };

  const handleCreatePostClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTitle("");
    setDescription("");
    setError(null);
    setEmptyFields([]);
  };

  return (
    <div className="flex justify-center m-10">
      <div className="h-full w-3/4 bg-white rounded-3xl shadow-lg p-10">
        <div className="flex justify-center">
          <button
            className="bg-pink-500 hover:bg-pink-600 transition duration-200 w-36 p-3 rounded-md text-white font-bold shadow-md"
            onClick={handleCreatePostClick}
          >
            Share Your Thoughts!!
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-3xl shadow-lg p-10 w-1/2 relative">
            <button
              className="absolute top-3 right-7 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>

            <h3 className="font-serif text-center font-extrabold text-3xl text-gray-800">
              Create New Post
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <label className="text-xl text-gray-600">Title:</label>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={`border-2 border-gray-400 rounded-xl p-4 h-16 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200 ${
                  emptyFields.includes("title") ? "border-red-500" : ""
                }`}
                placeholder="Enter post title"
                required
              />

              <label className="text-xl text-gray-600">Description:</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={`border-2 border-gray-400 rounded-xl p-4 h-32 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200 ml-0 ${
                  emptyFields.includes("description") ? "border-red-500" : ""
                }`}
                style={{ fontWeight: "normal" }}
                placeholder="Write your post description"
                required
              />

              <div className="w-full flex justify-center">
                <button className="bg-pink-500 hover:bg-pink-600 transition duration-200 w-36 p-3 rounded-md text-white font-bold shadow-md">
                  Add Post
                </button>
              </div>
              {error && (
                <div className="text-red-500 text-center mt-2">{error}</div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostForm;
