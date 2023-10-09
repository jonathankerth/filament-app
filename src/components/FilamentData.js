import React, { useEffect, useState } from "react";

const FilamentData = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		// Fetch data from your Flask API
		fetch(
			"https://filament-scraper-cd848511cd59.herokuapp.com/api/filamentData"
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => setData(data))
			.catch((error) => {
				console.error("Error fetching data:", error);
				setData({ error: "Failed to fetch data" }); // Set an error message in the state
			});
	}, []);

	return (
		<div className="container mt-5">
			<h1>Filament Data</h1>
			{data ? (
				<div>
					<p>Name: {data[0].name}</p>
					<p>Description: {data[0].description}</p>
					<p>Colors: {data[0].colors.join(", ")}</p>
					<p>Diameter Sizes: {data[0].diameter_sizes.join(", ")}</p>
					<p>Net Weight: {data[0].net_weight}</p>
				</div>
			) : (
				<p>Loading data...</p>
			)}
		</div>
	);
};

export default FilamentData;
