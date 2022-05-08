import React, { useEffect } from "react";

const Resize = ({ width, setWidth, sectionRef }) => {
	useEffect(() => {
		const onResize = () => {
			if (sectionRef && sectionRef.current) {
				const newWidth = sectionRef.current.clientWidth;
			setWidth(newWidth);
			};
		};
    	window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	});
	
	useEffect(() => {
		if (sectionRef && sectionRef.current) {
			const newWidth = sectionRef.current.clientWidth;
		setWidth(newWidth);
		};
	}, []);
	return null;
};

export default Resize;