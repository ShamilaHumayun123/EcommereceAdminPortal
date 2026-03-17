import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ModalForm from "./ModalForm";
import axios from "axios";

export default function CategoryTable() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState(null);

  const API = "http://localhost:5000/api/categories";


  const fetchCategories = async () => {
    try {
      const res = await axios.get(API);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (cat = null) => {
    setEditData(cat);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <Layout>
      <section className="sherah-adashboard">
        <div className="container-fluid">
          {/* Breadcrumb + Button */}
          <div className="sherah-breadcrumb d-flex justify-content-between align-items-center">
            <div>
              <h2 className="sherah-breadcrumb__title">Categories</h2>
              <ul className="sherah-breadcrumb__list">
                <li><a href="#">Home</a></li>
                <li className="active">Category List</li>
              </ul>
            </div>

            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              + Add Category
            </button>
          </div>

          {/* Table */}
          <div className="sherah-page-inner sherah-default-bg sherah-border mg-top-25">
            <div className="sherah-table p-0">
              <table className="sherah-table__main sherah-table__main-v3">
                <thead className="sherah-table__head">
                  <tr>
                    <th>Category Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="sherah-table__body">
                  {categories.map((cat) => (
                    <tr key={cat.Id}>
                      <td><h4 className="sherah-table__vendor--title">{cat.Name}</h4></td>
                      <td>
                        <div className="sherah-table__status__group">
                          <button className="btn btn-sm btn-success" onClick={() => handleOpenModal(cat)}>Edit</button>
                          <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete(cat.Id)}>Delete</button>
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
            type="category"
            editData={editData}
            refreshData={fetchCategories} 
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