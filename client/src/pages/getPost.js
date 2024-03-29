import { useEffect } from "react";
import { usePostContext } from "../hooks/usePostContext";
import PostDetails from "../components/postDetails";
import PostForm from "../components/postForm";
import { useAuthContext } from "../hooks/useAuthContext";

const Posts = () => {
    const { posts, dispatch } = usePostContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`},
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_POSTS', payload: json });
            }
        }

        if(user){
        fetchPosts()
        }
    }, [dispatch, user]);

    return (
        <div className="w-full">
            <PostForm />
            <div className="w-full" >
                {posts && posts.map(post => (
                    <PostDetails post={post} key={post._id} />
                ))}
            </div>
        </div>
    );
};

export default Posts;