import React, { useState } from "react";
import axios from "axios"; // make sure axios is installed

export default function ModalForm({ type, onClose }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Decide API URL based on type
      const url =
        type === "brand"
          ? "http://localhost:5000/api/brands"
          : "http://localhost:5000/api/categories";

      // Send POST request
      await axios.post(url, { id, name });

      alert(`${type === "brand" ? "Brand" : "Category"} created successfully`);

      // Close modal after success
      onClose();
    } catch (err) {
      console.error(err);
      alert(`Error creating ${type}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>{type === "brand" ? "Add Brand" : "Add Category"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="popup-actions">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}