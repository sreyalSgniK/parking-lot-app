import React, { useState, useEffect } from "react";
import axios from "axios";

const ParkingLots = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("http://localhost:8080/parking-lots")
      .then((response) => {
        setParkingLots(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch parking lots");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Parking Lots</h1>
      <ul>
        {parkingLots.map((lot) => (
          <li key={lot.parkingLotId}>
            <h2>{lot.name}</h2>
            <p>Location: {lot.location}</p>
            <p>Total Slots: {lot.totalSlots}</p>
            <p>Available Slots: {lot.availableSlots}</p>
            <p>Price per Hour: {lot.pricePerHour} VND</p>
            <p>Description: {lot.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingLots;
