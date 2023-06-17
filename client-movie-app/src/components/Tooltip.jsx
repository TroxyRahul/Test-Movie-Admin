import { useState } from "react";

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", display: "inline-block" }}>
      {children}
      {isVisible && (
        <div className="absolute -left-10 bg-black text-white text-xs p-3 rounded-md w-100 z-20">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
