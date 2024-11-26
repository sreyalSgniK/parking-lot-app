import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserFromCookie } from "./Profile";
import "./../css/updateParkingLot.css";

const UpdateParkingLot = () => {
  const { id } = useParams();
  const [parkingLot, setParkingLot] = useState(null);
  const [pname, setPname] = useState("");
  const [location, setLocation] = useState("");
  const [total, setTotal] = useState("");
  const [available, setAvailable] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [mapEmbedUrl, setMapEmbedUrl] = useState(""); // New state for map embed URL
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ownerId = getUserFromCookie().id;

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
        setMapEmbedUrl(data.map_embed_url); // Prefill map embed URL
      })
      .catch((error) => {
        console.error("Error fetching parking lot details:", error);
        setError("Error fetching parking lot details.");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !pname ||
      !location ||
      !total ||
      !available ||
      !price ||
      !description ||
      !mapEmbedUrl
    ) {
      setError("Please fill in all fields.");
      return;
    }

    axios
      .put(`http://localhost:8080/parkinglots/${id}`, {
        pname,
        location,
        total: parseInt(total, 10),
        available: parseInt(available, 10),
        price: parseFloat(price),
        description,
        mapEmbedUrl, // Include the map embed URL in the update
        ownerId,
      })
      .then(() => {
        navigate("/dashboard/owner");
      })
      .catch((error) => {
        console.error("Error updating parking lot:", error);
        setError("Error updating parking lot, please try again.");
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this parking lot?")) {
      axios
        .delete(`http://localhost:8080/parkinglots/${id}`)
        .then(() => {
          navigate("/dashboard/owner");
        })
        .catch((error) => {
          console.error("Error deleting parking lot:", error);
          setError("Error deleting parking lot, please try again.");
        });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/owner");
  };

  if (!parkingLot) {
    return <p>Loading...</p>;
  }

  return (
    <div className="update-parking-lot-container">
      <h2>Update Parking Lot</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="update-parking-lot-form">
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
        <div>
          <label>Map Embed URL:</label>
          <input
            type="text"
            value={mapEmbedUrl}
            onChange={(e) => setMapEmbedUrl(e.target.value)}
            required
            placeholder="Enter Google Map embed URL"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-update">
            Update Parking Lot
          </button>
          <button type="button" className="btn-delete" onClick={handleDelete}>
            Delete Parking Lot
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateParkingLot;
