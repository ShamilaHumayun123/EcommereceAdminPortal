import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModalForm({ type, onClose, editData, refreshData }) {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const isBrand = type === "brand";

  const API = isBrand
    ? "http://localhost:5000/api/brands"
    : "http://localhost:5000/api/categories";

  // Fill form on edit
  useEffect(() => {
    if (editData) {
      setName(editData.Name || "");

      if (isBrand) {
        setImagePreview(
          editData.ImagePath
            ? `http://localhost:5000/${editData.ImagePath}`
            : ""
        );
      }

      setImageFile(null);
    } else {
      setName("");
      setImagePreview("");
      setImageFile(null);
    }
  }, [editData, isBrand]);

  // Handle image change (only for brand)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return alert("Name is required");
    }

    setLoading(true);

    try {
      let response;

      if (isBrand) {
        // BRAND → multipart form
        const formData = new FormData();
        formData.append("name", name);

        if (imageFile) {
          formData.append("image", imageFile);
        }

        if (editData && editData.Id) {
          response = await axios.put(`${API}/${editData.Id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          alert("Brand updated successfully");
        } else {
          response = await axios.post(API, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          alert("Brand created successfully");
        }

      } else {
        // CATEGORY → simple JSON (NO IMAGE)
        if (editData && editData.Id) {
          await axios.put(`${API}/${editData.Id}`, { name });
          alert("Category updated successfully");
        } else {
          await axios.post(API, { name });
          alert("Category created successfully");
        }
      }

      refreshData && refreshData();
      onClose();

    } catch (err) {
      console.error("Error:", err);
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>
          {editData
            ? `Edit ${isBrand ? "Brand" : "Category"}`
            : `Add ${isBrand ? "Brand" : "Category"}`}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="form-group">
            <label>{isBrand ? "Brand Name" : "Category Name"}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>

          {/* IMAGE → ONLY FOR BRAND */}
          {isBrand && (
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
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "60px",
                    objectFit: "cover",
                    marginTop: "10px",
                  }}
                />
              )}
            </div>
          )}

          {/* BUTTONS */}
          <div className="popup-actions mt-3">
            <button className="btn btn-primary me-2" type="submit">
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