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
  return (
    imagee && (
      <div>
        <img
          src={imagee}
          widht={"100%"}
          height={"600px"}
          objectFit={"fill"}
          alt="My Image"
          style={{ borderRadius: "5px", maxWidth: "506px", maxHeight: "506px" }}
        />
      </div>
    )
  );
};

export default PostImage;
