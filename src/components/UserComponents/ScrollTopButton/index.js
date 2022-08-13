import React, { useState, useEffect } from "react";

const ScrollTopButton = () => {
  const [sticky, setSticky] = useState("");
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (Math.ceil(window.scrollY) >= 200) {
        setSticky("sticky");
      } else {
        setSticky("");
      }
    });
  }, []);

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className={sticky}>
      <div className="up_btn up_btn1" onClick={() => scrollTop()}>
        <em className="icon ni ni-chevrons-up"></em>
      </div>
    </div>
  );
};

export default ScrollTopButton;
