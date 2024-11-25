import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserFromCookie } from "./Profile";

const UpdateParkingLot = () => {
  const { id } = useParams(); // Get parking lot ID from the URL
  const [parkingLot, setParkingLot] = useState(null); // State to store parking lot details
  const [pname, setPname] = useState("");
  const [location, setLocation] = useState("");
  const [total, setTotal] = useState("");
  const [available, setAvailable] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ownerId = getUserFromCookie().id;

  // Fetch existing parking lot details
  useEffect(() => {
    axios
      .get(`http://localhost:8080/parkinglots/${id}`)
      .then((response) => {
        const data = response.data;
        setParkingLot(data);
        setPname(data.pname);
        setLocation(data.location);
        setTotal(data.total);
        setAvailable(data.available);
        setPrice(data.price);
        setDescription(data.description);
      })
      .catch((error) => {
        console.error("Error fetching parking lot details:", error);
        setError("Error fetching parking lot details.");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!pname || !location || !total || !available || !price || !description) {
      setError("Please fill in all fields.");
      return;
    }

    // Send updated data to the backend
    axios
      .put(`http://localhost:8080/parkinglots/${id}`, {
        pname,
        location,
        total: parseInt(total, 10), // Ensure it's an integer
        available: parseInt(available, 10),
        price: parseFloat(price), // Ensure it's a float
        description,
        ownerId,
      })
      .then(() => {
        // Redirect to the owner dashboard
        navigate("/dashboard/owner");
      })
      .catch((error) => {
        console.error("Error updating parking lot:", error);
        setError("Error updating parking lot, please try again.");
      });
  };

  if (!parkingLot) {
    return <p>Loading...</p>;
  }

  return (
    <div className="update-parking-lot-form">
      <h2>Update Parking Lot</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Parking Lot Name:</label>
          <input
            type="text"
            value={pname}
            onChange={(e) => setPname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Total Slots:</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Available Slots:</label>
          <input
            type="number"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price Per Hour:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Update Parking Lot</button>
      </form>
    </div>
  );
};

export default UpdateParkingLot;
