import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ModalForm from "./ModalForm";
import axios from "axios";

export default function BrandTable() {
  const [showModal, setShowModal] = useState(false);
  const [brands, setBrands] = useState([]);
  const [editData, setEditData] = useState(null);

  const API = "http://localhost:5000/api/brands";

  const fetchBrands = async () => {
    try {
      const res = await axios.get(API);
      setBrands(res.data); 
    } catch (err) {
      console.error("Error fetching brands:", err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleOpenModal = (brand = null) => {
    setEditData(brand);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchBrands();
    } catch (err) {
      console.error("Error deleting brand:", err);
    }
  };

  return (
    <Layout>
      <section className="sherah-adashboard">
        <div className="container-fluid">
          {/* Breadcrumb + Button */}
          <div className="sherah-breadcrumb d-flex justify-content-between align-items-center">
            <div>
              <h2 className="sherah-breadcrumb__title">Brands</h2>
              <ul className="sherah-breadcrumb__list">
                <li><a href="#">Home</a></li>
                <li className="active">Brand List</li>
              </ul>
            </div>

            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              + Add Brand
            </button>
          </div>

          {/* Table */}
          <div className="sherah-page-inner sherah-default-bg sherah-border mg-top-25">
            <div className="sherah-table p-0">
              <table className="sherah-table__main sherah-table__main-v3">
                <thead className="sherah-table__head">
                  <tr>
                    <th>Brand Name</th>
                    <th>Brand Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="sherah-table__body">
                  {brands.map((brand) => (
                    <tr key={brand.Id}>
                      <td><h4 className="sherah-table__vendor--title">{brand.Name}</h4></td>
                      <td>
                        {brand.ImagePath ? (
                         <img
  src={brand.ImagePath ? `http://localhost:5000${brand.ImagePath}` : ""}
  alt={brand.Name}
  style={{ width: "80px", height: "50px", objectFit: "cover" }}
/>
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>
                      <td>
                        <div className="sherah-table__status__group">
                          <button className="btn btn-sm btn-success" onClick={() => handleOpenModal(brand)}>Edit</button>
                          <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete(brand.Id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <ModalForm
            type="brand"
            editData={editData}
            refreshData={fetchBrands}
            onClose={() => {
              setShowModal(false);
              setEditData(null);
            }}
          />
        )}
      </section>
    </Layout>
  );
}