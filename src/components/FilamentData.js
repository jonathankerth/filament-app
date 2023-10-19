import React, { useEffect, useState } from "react";
import ColorSample from "./ColorSample"; // Import the ColorSample component

const FilamentData = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://filament-scraper-cd848511cd59.herokuapp.com/api/filamentData"
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				setData(data);
				setLoading(false); // Data is loaded
			} catch (error) {
				console.error("Error fetching data:", error);
				setError("Failed to fetch data");
				setLoading(false); // Error occurred, loading is done
			}
		};

		// Fetch data initially and set up a timer to fetch data periodically
		fetchData();
		const intervalId = setInterval(fetchData, 60000); // Fetch data every minute

		return () => {
			// Cleanup: clear the interval when the component unmounts
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="container mt-5">
			<h1>Filament Data</h1>
			{loading ? (
				<p>Loading data...</p>
			) : error ? (
				<p>Error: {error}</p>
			) : (
				<div>
					<p>Type: {data[0].name}</p>
					<p>Description: {data[0].description}</p>
					<p>
						Colors:{" "}
						{data[0].colors.map((color, index) => (
							<span key={index}>
								<ColorSample color={color} /> {color}
								{index < data[0].colors.length - 1 ? ", " : ""}
							</span>
						))}
					</p>
					<p>Diameter Sizes: {data[0].diameter_sizes.join(", ")}</p>
				</div>
			)}
		</div>
	);
};

export default FilamentData;
