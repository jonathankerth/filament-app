import React from "react";

const ColorSample = ({ color }) => {
	const colorStyle = {
		backgroundColor: color,
		width: "20px",
		height: "20px",
		display: "inline-block",
		marginRight: "5px",
	};

	return <span style={colorStyle}></span>;
};

export default ColorSample;
