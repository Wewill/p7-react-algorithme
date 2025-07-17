import React, { useEffect, useRef } from "react";

const Image = (props: { src: string; alt?: string; className?: string }) => {
  const { src, alt, className } = props;
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) {
      return;
    }

    // Add intersection observer with document for lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && imgRef.current) {
          imgRef.current.src = src;
          observer.unobserve(imgRef.current);
        }
      });
    });

    const imgElement = imgRef.current;
    observer.observe(imgElement);

    return () => {
      if (imgElement) {
        observer.unobserve(imgElement);
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src="placeholder.jpg"
      alt={alt || ""}
      className={`w-full h-auto ${className || ""}`}
    />
  );
};

export default Image;
