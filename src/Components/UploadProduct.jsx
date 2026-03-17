import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
export default function UploadProduct() {
 
  const initialFormState = {
  title: "",
  price: "",
  discount: "",
  description: "",
  category: "Men",
  brand: "NogorPolli",
  shipping: "",
  tax: "",
  tag: "",
  images: [],
};
const [form, setForm] = useState(initialFormState);
const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch categories and brands from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/brands")
      .then(res => setBrands(res.data))
      .catch(err => console.error("Error fetching brands:", err));

    axios.get("http://localhost:5000/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setForm((current) => ({
      ...current,
      images: files,
    }));
  };

 const handleSubmit = async (event) => {
  event.preventDefault();

  const priceRegex = /^\d+(\.\d{0,2})?$/;

  // Required validations
  if (!form.title || !form.price || !form.discount || !form.description || !form.category || !form.brand || !form.shipping) {
    alert("Please fill all required fields");
    return;
  }

  // Price validation
  if (!priceRegex.test(form.price)) {
    alert("Price must be a valid number (integer or decimal)");
    return;
  }

  // Discount validation
  if (!priceRegex.test(form.discount)) {
    alert("Discount must be a valid number (integer or decimal)");
    return;
  }
  if (!priceRegex.test(form.shipping)) {
    alert("Shipping Fee must be a valid number (integer or decimal)");
    return;
  }
  if (!priceRegex.test(form.tax)) {
    alert("Tax must be a valid number (integer or decimal)");
    return;
  }
  // Image validation
  if (form.images.length === 0) {
    alert("Please upload at least 1 product image");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("discount", form.discount);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("brand", form.brand);
    formData.append("shipping", form.shipping);
    formData.append("tax", form.tax);
    formData.append("tag", form.tag);

    form.images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await fetch("http://localhost:5000/api/products/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert("Product uploaded successfully");
    

  setForm(initialFormState);

  document.getElementById("input-img1").value = "";
}
    else {
      alert("Upload failed");
    }

  } catch (error) {
    console.error(error);
  }
};

  return (
    <Layout>
      <section className="sherah-adashboard sherah-show">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sherah-body">
                <div className="sherah-dsinner">
                  <div className="row">
                    <div className="col-12">
                      <div className="upload-product-header">
                        <div className="sherah-breadcrumb mg-top-30">
                          <h2 className="sherah-breadcrumb__title">Upload Product</h2>
                          <ul className="sherah-breadcrumb__list">
                            <li>
                              <a href="#">Home</a>
                            </li>
                            <li className="active">
                              <a href="#">Upload Product</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="upload-product-body">
                    <div className="sherah-page-inner sherah-border sherah-basic-page sherah-default-bg mg-top-25 p-0">
                      <div className="product-form-box sherah-border mg-top-30">
                    <form className="sherah-wc__form-main" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-12">
                         
                          <div className="product-form-box sherah-border mg-top-30">
                            <h4 className="form-title m-0">Basic Information</h4>
                            <div className="row">
                              <div className="col-12">
                                <div className="form-group">
                                  <label className="sherah-wc__form-label">Product Title</label>
                                  <div className="form-group__input">
                                    <input
                                      className="sherah-wc__form-input"
                                      placeholder="Type here"
                                      type="text"
                                      name="title"
                                      value={form.title}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                  <label className="sherah-wc__form-label">Regular Price</label>
                                  <div className="form-group__input">
                                    <input
                                      className="sherah-wc__form-input"
                                      placeholder="Type here"
                                      type="text"
                                      name="price"
                                      value={form.price}
                                      onChange={handleChange} 
                                      required
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                  <label className="sherah-wc__form-label">Discount Price</label>
                                  <div className="form-group__input">
                                    <input
                                      className="sherah-wc__form-input"
                                      placeholder="Type here"
                                      type="text"
                                      name="discount"
                                      value={form.discount}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="form-group">
                                  <label className="sherah-wc__form-label">About Description</label>
                                  <div className="form-group__input">
                                    <textarea
                                      className="sherah-wc__form-input"
                                      placeholder="Type here"
                                      name="description"
                                      value={form.description}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                  <label className="sherah-wc__form-label">Category*</label>
                                  <select
                                    className="form-group__input"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                  >
                                   <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat.Id} value={cat.Name}>{cat.Name}</option>
                        ))}

                                  </select>
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                  <label className="sherah-wc__form-label">Brand*</label>
                                  <select
                                    className="form-group__input"
                                    name="brand"
                                    value={form.brand}
                                    onChange={handleChange}
                                  >
                                   <option value="">Select Brand</option>
                        {brands.map(brand => (
                          <option key={brand.Id} value={brand.Name}>{brand.Name}</option>
                        ))}
                                  </select>
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                  <label className="sherah-wc__form-label">Shipping Fee</label>
                                  <div className="form-group__input">
                                    <input
                                      className="sherah-wc__form-input"
                                      placeholder="Type here"
                                      type="text"
                                      name="shipping"
                                      value={form.shipping}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-12">
                                <div className="form-group">
                                  <label className="sherah-wc__form-label">Tax Rate</label>
                                  <div className="form-group__input">
                                    <input
                                      className="sherah-wc__form-input"
                                      placeholder="Type here"
                                      type="text"
                                      name="tax"
                                      value={form.tax}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="form-group">
                                  <label className="sherah-wc__form-label">Tag</label>
                                  <div className="form-group__input">
                                    <textarea
                                      className="sherah-wc__form-input"
                                      placeholder="Tag type here"
                                      name="tag"
                                      value={form.tag}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="product-form-box sherah-border mg-top-30 image-upload-box">
                            <h4 className="form-title m-0">Product Images</h4>
                            <div className="form-group">
                              <div className="image-upload-group">

  {form.images.map((image, index) => (
    <div className="image-upload-group__single" key={index}>
      <img
        src={URL.createObjectURL(image)}
        alt="Product preview"
      />
    </div>
  ))}

                                <div className="image-upload-group__single image-upload-group__single--upload">
                                  <input
                                    type="file"
                                    className="btn-check"
                                    name="images"
                                    id="input-img1"
                                    onChange={handleImageChange}
                                    multiple
                                  />
                                  <label className="image-upload-label" htmlFor="input-img1">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="91.787"
                                      height="84.116"
                                      viewBox="0 0 91.787 84.116"
                                    >
                                      <g
                                        id="Group_1021"
                                        data-name="Group 1021"
                                        transform="translate(891.292 39.276)"
                                      >
                                        <path
                                          id="Path_536"
                                          data-name="Path 536"
                                          d="M-891.292,158.124q1.434-5.442,2.867-10.884c1.3-4.961,2.586-9.926,3.9-14.884a2.8,2.8,0,0,1,2.664-2.251,2.654,2.654,0,0,1,2.763,1.848,3.929,3.929,0,0,1,.037,2q-3.073,12-6.226,23.984c-.64,2.452.088,3.739,2.533,4.394q29.033,7.775,58.067,15.543a2.893,2.893,0,0,0,3.97-2.327c.626-2.487,1.227-4.98,1.849-7.468a2.9,2.9,0,0,1,3.436-2.368,2.894,2.894,0,0,1,2.124,3.726c-.627,2.609-1.256,5.219-1.944,7.813A8.547,8.547,0,0,1-826,183.469q-29.3-7.827-58.584-15.682a8.566,8.566,0,0,1-6.552-6.853,1.264,1.264,0,0,0-.16-.3Z"
                                          transform="translate(0 -138.958)"
                                        />
                                        <path
                                          id="Path_537"
                                          data-name="Path 537"
                                          d="M-767.966,21.9c-9.648,0-19.3-.062-28.943.029a9.215,9.215,0,0,1-8.88-5.491,7.393,7.393,0,0,1-.451-3.232c-.027-14.606-.053-29.212,0-43.818a8.532,8.532,0,0,1,8.907-8.66q29.346-.008,58.693,0a8.581,8.581,0,0,1,8.877,8.872q.017,21.685,0,43.37a8.551,8.551,0,0,1-8.9,8.923C-748.432,21.915-758.2,21.9-767.966,21.9ZM-773.938.457l4.606-5.528q4.674-5.611,9.345-11.224a6.85,6.85,0,0,1,7.183-2.522c1.734.377,2.87,1.622,3.969,2.909q6.341,7.428,12.7,14.838a6.488,6.488,0,0,1,.426.631l.211-.158v-.789q0-14.429,0-28.857c0-2.179-1.125-3.294-3.316-3.295q-29.216,0-58.432,0c-2.141,0-3.277,1.115-3.278,3.25q-.008,18.865,0,37.73a5.429,5.429,0,0,0,.07.624l.239.127a5.744,5.744,0,0,1,.529-.721Q-794.05,1.826-788.4-3.808c3.131-3.127,7.065-3.129,10.21,0C-776.8-2.422-775.412-1.022-773.938.457Zm-25.649,14.9a3.316,3.316,0,0,0,2.611.808q28.949,0,57.9,0c.239,0,.478,0,.717-.005a2.828,2.828,0,0,0,2.864-2.923c.02-1.195-.052-2.393.023-3.584a2.712,2.712,0,0,0-.78-2.072q-8.569-9.946-17.1-19.927c-1.071-1.25-1.417-1.243-2.489.044q-7.71,9.264-15.424,18.523c-1.468,1.762-3.193,1.826-4.833.189q-3.076-3.071-6.147-6.147c-.963-.962-1.146-.963-2.1-.01q-6.688,6.684-13.377,13.367C-798.31,14.2-798.937,14.753-799.587,15.358Z"
                                          transform="translate(-69.752)"
                                        />
                                        <path
                                          id="Path_538"
                                          data-name="Path 538"
                                          d="M-734.635,39.893a7.657,7.657,0,0,1-7.659-7.6,7.688,7.688,0,0,1,7.7-7.667,7.682,7.682,0,0,1,7.612,7.663A7.653,7.653,0,0,1-734.635,39.893Zm-.029-5.742a1.9,1.9,0,0,0,1.938-1.906,1.934,1.934,0,0,0-1.886-1.884,1.927,1.927,0,0,0-1.936,1.92A1.9,1.9,0,0,0-734.664,34.151Z"
                                          transform="translate(-122.238 -52.421)"
                                        />
                                      </g>
                                    </svg>
                                    <span>image upload</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="product-form-actions">
                        <button type="submit" className="sherah-btn sherah-btn__primary">
                          Publish Product
                        </button>
                        <button type="button" className="sherah-btn sherah-btn__third" onClick={() => window.history.back()}>
                          Cancel
                        </button>
                      </div>
                     
                    </form>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
     </section>
    </Layout>
      
    
  );
}
