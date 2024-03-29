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
  const [creatingPost, setCreatingPost] = useState(false); // State for tracking if user wants to create a post

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
      console.log("Error");
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      console.log("Hello");
      setError(null);
      setTitle("");
      setDescription("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_POSTS", payload: json });
    }
  };

  const handleCreatePostClick = () => {
    setCreatingPost(true); // Set the state to indicate user wants to create a post
  };

  return (
    <div className="flex justify-center m-10">
      <div className="h-full w-3/4 bg-slate-100 rounded-3xl p-10">
        {/* Conditionally render the form based on creatingPost state */}
        {creatingPost ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1">
            <h3 className="font-serif text-center font-extrabold text-3xl">
              Create New Post
            </h3>
            <br></br>
            <label className="text-2xl">Title: </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={`border-2 border-slate-500 rounded-xl pl-5 pr-3 h-16 w-1/2 ${
                emptyFields.includes("description") ? "error" : ""
              }`}
            />

            <br></br>
            <label className="text-2xl">Description: </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className={`border-2 border-slate-500 m-0 rounded-xl overflow-y-scroll overflow-x-hidden h-32 w-4/5 ${
                emptyFields.includes("description") ? "error" : ""
              }`}
            />

            <br></br>
            <div className="w-full flex justify-center">
              <button className="bg-slate-500 hover:bg-slate-800 w-36 p-3 rounded-md text-center text-white">
                Add Post
              </button>
            </div>
            {error && <div className="error">{error}</div>}
          </form>
        ) : (
          <div className="flex justify-center">
            <button
              className="bg-slate-500 hover:bg-slate-800 w-36 p-3 rounded-md text-center text-white"
              onClick={handleCreatePostClick} // Handle button click to create post
            >
              Share Your Thoughts!!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostForm;
