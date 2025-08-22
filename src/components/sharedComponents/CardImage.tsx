import React from "react";

interface CardImageProps {
  src: string;
  alt: string;
  height?: string;
  className?: string;
}

const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className,
  height,
  ...aos
}) => {
  return (
    <div
    {...aos}
      className={`w-full ${height} overflow-hidden rounded-[10px] xl:rounded-xl ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-300 hover:scale-103 hover:brightness-103`}
      />
    </div>
  );
};

export default CardImage;
