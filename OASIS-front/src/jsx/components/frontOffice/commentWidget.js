import React from "react";
import "../../../css/comment.css";
import useAuthStore from "../../../utils/zustand";
import axios from "axios";

const CommentWidget = ({ post, handleRefetch }) => {
  const { user } = useAuthStore();
  const handleComment = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const postId = e.target.postId.value;
    const userId = JSON.parse(user)._id;
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/posts/addComment`, {
        content,
        userId,
        postId,
      })
      .then((res) => {
        handleRefetch();
      })
      .catch((err) => {
        console.log(err);
      });
    e.target.content.value = "";
  };
  return (
    <div>
      <div class="comments-container">
        <ul id="comments-list" class="comments-list">
          <li>
            <div class="comment-main-level">
              <div class="comment-avatar">
                <img
                  src={require("../../../images/users/" +
                    JSON.parse(user).image)}
                  alt=""
                />
              </div>
              <div class="comment-box">
                <div class="comment-head">
                  <h6 class="comment-name by-author">
                    {JSON.parse(user).firstname} {JSON.parse(user).lastname}
                  </h6>
                  <span>hace 20 minutos</span>
                  <i class="fa fa-reply"></i>
                </div>
                <div class="comment-content">
                  <form onSubmit={handleComment}>
                    <input type="hidden" name="postId" value={post._id} />
                    <textarea
                      name="content"
                      id="comment"
                      cols="90"
                      rows="3"
                    ></textarea>
                    <button type="submit" className="btn btn-outline-danger">
                      <i class="fa fa-reply"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </li>
          {post.comments.map((comment) => (
            <li>
              <div class="comment-main-level">
                <div class="comment-avatar">
                  <img
                    src={require("../../../images/users/" + comment.user.image)}
                    alt=""
                  />
                </div>
                <div class="comment-box">
                  <div class="comment-head">
                    <h6 class="comment-name by-author">
                      {comment.user.firstname} {comment.user.lastname}
                    </h6>
                    <span>hace 20 minutos</span>
                    <i
                      class="fa fa-heart"
                      onClick={() => {
                        axios
                          .post(`${process.env.REACT_APP_SERVER_URL}/posts/addLikeComment`, {
                            postId: post._id,
                            userId: JSON.parse(user)._id,
                            commentId: comment.uuid,
                          })
                          .then((res) => handleRefetch());
                      }}
                    >
                      {comment.likes.length}
                    </i>
                  </div>
                  <div class="comment-content">{comment.content}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentWidget;
