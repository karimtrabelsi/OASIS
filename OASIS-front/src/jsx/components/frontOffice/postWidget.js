import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../../utils/zustand";
import CommentWidget from "./commentWidget";
import moment from "moment";

const PostWidget = ({
  uuid,
  content,
  userId,
  image,
  userr,
  post,
  handleRefetch,
}) => {
  const { user } = useAuthStore();
  const [imagee, setImage] = useState(null);
  useEffect(() => {
    const loadImage = async () => {
      try {
        const myImage = await import(
          "../../../uploads/posts/user-" +
            userId +
            "/post-" +
            uuid +
            "/" +
            image
        );
        setImage(myImage.default);
      } catch (error) {
        console.error("Failed to load image:", error);
      }
    };
    loadImage();
  }, []);
  return (
    <div id="container">
      <article class="blog-card">
        <img class="post-image" src={imagee} />
        <div class="article-details">
          <h4 class="post-category">Club : {userr.club}</h4>
          <h3 class="post-title">{moment(post.date).format('MM/DD/YYYY')}</h3>
          <p class="post-description">{content}</p>
          <p class="post-author">
            By {userr.firstname} {userr.lastname}
          </p>
          <div class="article-actions">
            <button
              className="btn  mr-2"
              onClick={() =>
                axios
                  .post(`${process.env.REACT_APP_SERVER_URL}/posts/addLike`, {
                    postId: post._id,
                    userId: JSON.parse(user)._id,
                  })
                  .then((res) => handleRefetch())
              }
            >
              <span className="mr-2">
                {post.likes.find(
                  (like) => like.userId === JSON.parse(user)._id
                ) ? (
                  <i className="fa fa-heart text-danger" />
                ) : (
                  <i className="fa fa-heart " />
                )}
              </span>
              {post.likes.length}
            </button>
          </div>
          <CommentWidget post={post} handleRefetch={handleRefetch} />
        </div>
      </article>
    </div>
  );
};

export default PostWidget;
