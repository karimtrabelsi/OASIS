import { Image } from "react-bootstrap";

const Avatar = ({ userImage, isLarge, hasBorder }) => {
  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
        
    
      `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
          height: "50%",
          width: "50%",
        }}
        alt="Avatar"
        src={require("../../../images/users/" + userImage)}
      />
    </div>
  );
};

export default Avatar;
