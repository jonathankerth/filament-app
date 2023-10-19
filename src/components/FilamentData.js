import React, { useEffect, useState } from "react";
import ColorSample from "./ColorSample";

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

				const fetchedData = await response.json();
				setData(fetchedData);
				setLoading(false);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError("Failed to fetch data");
				setLoading(false);
			}
		};

		const intervalId = setInterval(fetchData, 60000);
		fetchData(); // Initial fetch

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	const renderContent = () => {
		if (loading) {
			return <p>Loading data...</p>;
		} else if (error) {
			return <p>Error: {error}</p>;
		} else if (data) {
			return (
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
			);
		}
	};

	return (
		<div className="container mt-5">
			<h1>Filament Data</h1>
			{renderContent()}
		</div>
	);
};

export default FilamentData;
