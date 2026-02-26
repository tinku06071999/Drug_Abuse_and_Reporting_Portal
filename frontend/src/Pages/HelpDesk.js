import React, { useState, useEffect } from "react";
import axios from "axios";
// import '../Styles/PostStyle.css';
import '../Styles/HelpDesk.css'
import ShareModal from "../Components/ShareModel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HelpDesk = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentPostId, setCommentPostId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [expandedComments, setExpandedComments] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharePostId, setSharePostId] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/posts");
      console.log("Posts response:", response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostSubmit = async () => {
    try {
      await axios.post("http://localhost:3001/api/posts", {
        text: newPostText,
      });
      setNewPostText("");
      fetchPosts(); // Refresh the posts after submitting a new one
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.put(`http://localhost:3001/api/posts/${postId}/like`);
      fetchPosts();
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };
  const handleUnlike = async (postId) => {
    try {
      // Send a request to unlike the post
      await axios.put(`http://localhost:3001/api/posts/${postId}/unlike`);

      // Fetch the updated posts after unliking
      fetchPosts();
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };
  const handleComment = (postId) => {
    setCommentPostId(postId);
    // Toggle visibility of comments for the clicked post
    setExpandedComments((prev) => {
      const isExpanded = prev.includes(postId);
      return isExpanded ? prev.filter((id) => id !== postId) : [...prev, postId];
    });
  };

  const handleCommentSubmit = async (postId) => {
    try {
      await axios.post(
        `http://localhost:3001/api/posts/${commentPostId}/comment`,
        {
          text: commentText,
        }
      );
      setCommentText("");
      setCommentPostId(null);
      fetchPosts(); // Refresh the posts after commenting on a post
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };
  const handleReadMore = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/posts/${postId}`);
      setSelectedPost(selectedPost && selectedPost._id === postId ? null : response.data);
    } catch (error) {
      console.error("Error fetching full post:", error);
    }
  };
  const handleShare = (postId) => {
   setSharePostId(postId);
    setShowShareModal(true);
};
const closeShareModal = () => {
    // Close the share modal
    setShowShareModal(false);
  };
  useEffect(() => {
    fetchPosts();
  }, []); // Fetch posts on component mount




return (
    <div className="linkedin-container mx-auto mt-8 p-4">
    <div className="linkedin-header bg-blue-500 text-white p-4 rounded">
      <h1 className="text-4xl font-bold">
        Breaking Chains: Share Your Struggle, Find Support.
      </h1>
    </div>
    <div className="linkedin-post-form bg-white border border-gray-300 rounded p-4 mb-4">
    <textarea
      className="w-full p-2 border border-gray-300 rounded linkedin-textarea"
      rows="4"
      placeholder="What's on your mind?"
      value={newPostText}
      onChange={(e) => setNewPostText(e.target.value)}
    />
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2 linkedin-post-btn"
      onClick={handlePostSubmit}
    >
      Post
    </button>
  </div>

       <div className="linkedin-posts bg-white border border-gray-300 rounded p-4">
        <h2 className="text-2xl font-bold mb-2">Recent Posts</h2>
        <div className="post-gallery overflow-hidden ">
          {posts.map((post) => (
            <div
              key={post._id}
              className={`post-box bg-slate-100 ${expandedComments.includes(post._id) ? 'expanded' : ''} linkedin-post border border-gray-300 rounded p-4 mb-4 text-gray-900`}
            >
              <p className="mb-2">
                <span className="font-bold text-gray-900">{post.author}:</span>{" "}
                <br /> {expandedComments.includes(post._id) ? (
                  <h1 className="text-gray-700">{post.text}</h1>
                ) : post.text.length > 150 ? (
                  <>
                    {post.text.slice(0, 150)}
                    <span
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleReadMore(post._id)}
                    >
                      {" Read More..."}
                    </span>
                  </>
                ) : (
                  post.text
                )}
              </p>
              <hr className="my-2 border-t border-gray-600" />
              <div className="flex space-x-4 items-center mt-2">
                <div className="flex space-x-2 items-center ">
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleLike(post._id)}
                  />
                  <span className="text-gray-600">{post.likes}</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleComment(post._id)}
                  />
                  <span className="text-gray-600">{post.comments.length}</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <FontAwesomeIcon
                    icon={faShare}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleShare(post._id)}
                  />
                </div>
              </div>


              {commentPostId === post._id && (
                <div className="mt-2">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="2"
                    placeholder="Enter your comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />

                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
                    onClick={() => handleCommentSubmit(post._id)}
                  >
                    Post Comment
                  </button>
                </div>
              )}

              <div className={`comments ${expandedComments.includes(post._id) ? 'visible' : ''}`}>
              <h3 className="font-bold mb-2">Comments:</h3>
              {post.comments.map((comment, index) => (
                <p key={index} className="mb-1">
                  <span className="font-bold">Anonymous:</span> {comment.text}
                </p>
              ))}
            </div>
            {showShareModal && (
                <ShareModal
                  onClose={closeShareModal}
                  postId={post._id}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HelpDesk;