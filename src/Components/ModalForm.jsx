import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModalForm({ type, onClose, editData, refreshData }) {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null); // 
  const [imagePreview, setImagePreview] = useState(""); //
  const [loading, setLoading] = useState(false);

  const API =
    type === "brand"
      ? "http://localhost:5000/api/brands"
      : "http://localhost:5000/api/categories";

  // Fill form on edit
  useEffect(() => {
    if (editData) {
      setName(editData.Name || "");
      setImagePreview(editData.ImagePath || ""); // show existing image if editing
      setImageFile(null); // reset file input
    } else {
      setName("");
      setImagePreview("");
      setImageFile(null);
    }
  }, [editData]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Name is required");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);

      if (imageFile) {
        formData.append("image", imageFile); // append image only if new file selected
      }

      if (editData && editData.Id) {
        // UPDATE brand
        await axios.put(`${API}/${editData.Id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Brand updated successfully");
      } else {
        // CREATE brand
        await axios.post(API, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Brand created successfully");
      }

      if (refreshData) refreshData();
      onClose();
    } catch (err) {
      console.error("Error saving brand:", err);
      alert("Error saving brand");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>{editData ? "Edit Brand" : "Add Brand"}</h3>
        <form onSubmit={handleSubmit}>
          {/* Name */}
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

          {/* Image upload */}
          <div className="form-group mt-3">
            <label>Brand Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Brand preview"
                style={{ width: "100px", height: "60px", objectFit: "cover", marginTop: "10px" }}
              />
            )}
          </div>

          {/* Buttons */}
          <div className="popup-actions mt-3">
            <button className="btn btn-primary me-2" type="submit">
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}