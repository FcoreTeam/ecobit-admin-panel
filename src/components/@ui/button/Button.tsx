import "./reset.scss";

import Image from "next/image";

interface ButtonInterface {
  text: string;
  onClick: () => void;
  className: string;
  image: string | null;
}

const Button = ({ text, onClick, className, image }: ButtonInterface) => {
  return (
    <button className={className} onClick={onClick}>
      {image ? (
        <Image
          src={image}
          alt="button"
          width={200}
          height={30}
          style={{ maxWidth: 250 }}
        />
      ) : (
        text
      )}
    </button>
  );
};
export default Button;
