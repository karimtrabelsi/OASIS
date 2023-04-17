import React, { useEffect, useState } from "react";

const PostImage = ({ id, uuid, image }) => {
  const [imagee, setImage] = useState(null);
  useEffect(() => {
    const loadImage = async () => {
      try {
        const myImage = await import(
          "../../../uploads/posts/user-" + id + "/post-" + uuid + "/" + image
        );
        setImage(myImage.default);
      } catch (error) {
        console.error("Failed to load image:", error);
      }
    };
    loadImage();
  }, []);
  return imagee && <img src={imagee} widht={400} height={400} alt="My Image" />;
};

export default PostImage;
