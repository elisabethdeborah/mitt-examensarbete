
import React, { useEffect } from "react";

const Resize = ({width, setWidth, sectionRef}) => {
  useEffect(() => {
    const onResize = () => {
		const newWidth = sectionRef.current.clientWidth;
		setWidth(newWidth)
      console.log("resize!!! ref: ", sectionRef.current.clientWidth);
    }

    window.addEventListener("resize", onResize);

	return () => window.removeEventListener("resize", onResize);
  });

  return null;
}

export default Resize;