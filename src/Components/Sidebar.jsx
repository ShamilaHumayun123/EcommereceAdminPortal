import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import ModalForm from "./ModalForm";

export default function Sidebar() {
  const [productOpen, setProductOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("");
  const [activeMenu, setActiveMenu] = useState(""); // active menu tracking

  const handleMenuClick = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu("");
      setProductOpen(false);
      setRegistrationOpen(false);
    } else {
      setActiveMenu(menuName);
      setProductOpen(menuName === "products");
      setRegistrationOpen(menuName === "registration");
    }
  };

  const openModal = (type) => {
    setFormType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="sherah-smenu">
        <div className="admin-menu">
          <div className="logo sherah-sidebar-padding">
            <a href="/">
              <img className="sherah-logo__main" src={logo} alt="Logo" />
            </a>
          </div>

          <div className="admin-menu__one sherah-sidebar-padding">
            <div className="menu-bar">
              <ul className="menu-bar__one sherah-dashboard-menu" id="sherahMenu">
                <li>
                  <a href="#" data-bs-toggle="collapse" data-bs-target="#menu-item_home">
                    <span className="menu-bar__text">
                      <span className="sherah-menu-icon sherah-svg-icon__v1">
                        <svg
                        className="sherah-svg-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18.075"
                        height="18.075"
                        viewBox="0 0 18.075 18.075"
                      >
                        <g id="Icon" transform="translate(0 0)">
                          <path
                            id="Path_29"
                            data-name="Path 29"
                            d="M6.966,6.025H1.318A1.319,1.319,0,0,1,0,4.707V1.318A1.319,1.319,0,0,1,1.318,0H6.966A1.319,1.319,0,0,1,8.284,1.318V4.707A1.319,1.319,0,0,1,6.966,6.025ZM1.318,1.13a.188.188,0,0,0-.188.188V4.707a.188.188,0,0,0,.188.188H6.966a.188.188,0,0,0,.188-.188V1.318a.188.188,0,0,0-.188-.188Zm0,0"
                          />
                          <path
                            id="Path_30"
                            data-name="Path 30"
                            d="M6.966,223.876H1.318A1.319,1.319,0,0,1,0,222.558V214.65a1.319,1.319,0,0,1,1.318-1.318H6.966a1.319,1.319,0,0,1,1.318,1.318v7.908A1.319,1.319,0,0,1,6.966,223.876Zm-5.648-9.414a.188.188,0,0,0-.188.188v7.908a.188.188,0,0,0,.188.188H6.966a.188.188,0,0,0,.188-.188V214.65a.188.188,0,0,0-.188-.188Zm0,0"
                            transform="translate(0 -205.801)"
                          />
                          <path
                            id="Path_31"
                            data-name="Path 31"
                            d="M284.3,347.357H278.65a1.319,1.319,0,0,1-1.318-1.318V342.65a1.319,1.319,0,0,1,1.318-1.318H284.3a1.319,1.319,0,0,1,1.318,1.318v3.389A1.319,1.319,0,0,1,284.3,347.357Zm-5.648-4.9a.188.188,0,0,0-.188.188v3.389a.188.188,0,0,0,.188.188H284.3a.188.188,0,0,0,.188-.188V342.65a.188.188,0,0,0-.188-.188Zm0,0"
                            transform="translate(-267.542 -329.282)"
                          />
                          <path
                            id="Path_32"
                            data-name="Path 32"
                            d="M284.3,10.544H278.65a1.319,1.319,0,0,1-1.318-1.318V1.318A1.319,1.319,0,0,1,278.65,0H284.3a1.319,1.319,0,0,1,1.318,1.318V9.226A1.319,1.319,0,0,1,284.3,10.544ZM278.65,1.13a.188.188,0,0,0-.188.188V9.226a.188.188,0,0,0,.188.188H284.3a.188.188,0,0,0,.188-.188V1.318a.188.188,0,0,0-.188-.188Zm0,0"
                            transform="translate(-267.542)"
                          />
                        </g>
                      </svg>
                      </span>
                      <span className="menu-bar__name">Dashboard</span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className={productOpen ? "active" : "collapsed"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick("products");
                    }}
                  >
                    <span className="menu-bar__text">
                      <span className="sherah-menu-icon sherah-svg-icon__v1">
                       <svg
                        className="sherah-svg-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21.136"
                        height="17.873"
                        viewBox="0 0 21.136 17.873"
                      >
                        <path
                          id="Path_218"
                          data-name="Path 218"
                          d="M558.766,384.526c.177-.092.32-.164.46-.24l6.468-3.491a1.9,1.9,0,0,1,.368-.179.506.506,0,0,1,.632.248.487.487,0,0,1-.127.656,1.743,1.743,0,0,1-.315.191c-2.517,1.359-5.038,2.712-7.549,4.083a.98.98,0,0,1-1.036.012q-3.781-1.986-7.582-3.934a.811.811,0,0,1-.505-.831c.02-1.3,0-2.6.014-3.9a.486.486,0,0,0-.3-.508c-.45-.232-.889-.486-1.326-.742a.539.539,0,0,1-.221-.877c.62-.926,1.244-1.849,1.883-2.762a1.17,1.17,0,0,1,.442-.344c2.561-1.246,5.127-2.482,7.688-3.728a.879.879,0,0,1,.822-.01c2.568,1.2,5.143,2.387,7.709,3.591a1.24,1.24,0,0,1,.478.42c.61.916,1.2,1.844,1.794,2.771.3.463.23.71-.265.989q-3.631,2.046-7.265,4.086c-.454.255-.643.212-.981-.2-.412-.5-.823-1.011-1.292-1.587Zm-7.409-12.033c.133.076.214.126.3.17,2.065,1.073,4.133,2.141,6.191,3.225a.625.625,0,0,0,.674-.018c2.031-1.106,4.069-2.2,6.1-3.3.118-.064.232-.133.367-.21a1.6,1.6,0,0,0-.164-.106c-2.124-.986-4.246-1.977-6.378-2.945a.814.814,0,0,0-.6.038c-2.04.971-4.071,1.96-6.1,2.945C551.626,372.349,551.511,372.412,551.357,372.492Zm-.688,4.945c0,1.092.01,2.129-.007,3.165a.5.5,0,0,0,.321.528c2.093,1.074,4.179,2.162,6.267,3.245.1.054.216.1.344.152v-6.293l-1.263,1.551c-.386.473-.552.507-1.076.212q-2.074-1.166-4.147-2.334C550.982,377.593,550.85,377.53,550.668,377.438Zm10.08,1.529,6.694-3.769-1.4-2.171-7.033,3.792Zm-3.4-2.142-7.037-3.652-1.38,2.033,6.683,3.76Z"
                          transform="translate(-547.61 -368.076)"
                        />
                      </svg>
                      </span>
                      <span className="menu-bar__name">Products</span>
                    </span>
                  </a>
                  <div className={`sherah__dropdown ${productOpen ? "show" : ""}`}>
                    <ul className="menu-bar__one-dropdown">
                      <li>
                        <a href="products.html">Products</a>
                      </li>
                      <li>
                        <a href="product-list.html">Product Details</a>
                      </li>
                      <li>
                        <a href="upload-product.html">Upload Product</a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <a
                    href="#"
                    className={registrationOpen ? "active" : "collapsed"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick("registration");
                    }}
                  >
                    <span className="menu-bar__text">
                      <span className="sherah-menu-icon sherah-svg-icon__v1">
                       <svg class="sherah-svg-icon" xmlns="http://www.w3.org/2000/svg" width="22.103" height="22.368" viewBox="0 0 22.103 22.368">
											<g id="Icon" transform="translate(0.787 -1.038)">
											  <g id="setting" transform="translate(-0.787 1.038)">
												<path id="Path_39" data-name="Path 39" d="M20.942,9.2h-.094A.71.71,0,0,1,20.359,8l.067-.068a2.209,2.209,0,0,0,0-3.092L19.313,3.715a2.144,2.144,0,0,0-3.055,0l-.067.068a.7.7,0,0,1-.759.145A.713.713,0,0,1,15,3.282v-.1A2.175,2.175,0,0,0,12.838,1H11.264A2.175,2.175,0,0,0,9.1,3.186v.1a.713.713,0,0,1-.435.64.7.7,0,0,1-.754-.142l-.063-.068a2.144,2.144,0,0,0-3.055,0L3.68,4.838a2.209,2.209,0,0,0,0,3.092L3.747,8a.7.7,0,0,1,.136.772.681.681,0,0,1-.629.432H3.16A2.175,2.175,0,0,0,1,11.388V12.98a2.175,2.175,0,0,0,2.16,2.186h.094a.71.71,0,0,1,.489,1.2l-.067.068a2.209,2.209,0,0,0,0,3.092l1.112,1.125a2.144,2.144,0,0,0,3.055,0l.067-.068a.7.7,0,0,1,1.189.5v.1a2.2,2.2,0,0,0,.633,1.549,2.149,2.149,0,0,0,1.53.641h1.574A2.175,2.175,0,0,0,15,21.182v-.1a.713.713,0,0,1,.435-.64.7.7,0,0,1,.754.142l.067.068a2.144,2.144,0,0,0,3.055,0l1.113-1.125a2.209,2.209,0,0,0,0-3.092l-.067-.068a.7.7,0,0,1-.136-.772.681.681,0,0,1,.629-.432h.094A2.175,2.175,0,0,0,23.1,12.98V11.388A2.175,2.175,0,0,0,20.942,9.2Zm.687,3.779a.692.692,0,0,1-.687.695h-.094a2.178,2.178,0,0,0-1.993,1.36,2.223,2.223,0,0,0,.459,2.388l.066.068a.7.7,0,0,1,0,.983L18.267,19.6a.681.681,0,0,1-.971,0l-.066-.068a2.16,2.16,0,0,0-2.36-.463,2.2,2.2,0,0,0-1.345,2.016v.1a.692.692,0,0,1-.687.695H11.264a.692.692,0,0,1-.687-.695v-.1a2.2,2.2,0,0,0-1.342-2.022,2.155,2.155,0,0,0-2.362.47l-.067.068a.682.682,0,0,1-.971,0L4.723,18.476a.7.7,0,0,1,0-.983l.067-.068a2.223,2.223,0,0,0,.459-2.389,2.178,2.178,0,0,0-1.995-1.36H3.16a.692.692,0,0,1-.687-.695V11.388a.692.692,0,0,1,.687-.695h.094a2.178,2.178,0,0,0,1.993-1.36,2.223,2.223,0,0,0-.459-2.388l-.066-.068a.7.7,0,0,1,0-.983L5.835,4.767a.681.681,0,0,1,.971,0l.066.068a2.16,2.16,0,0,0,2.36.464,2.2,2.2,0,0,0,1.345-2.017v-.1a.692.692,0,0,1,.687-.695h1.574a.692.692,0,0,1,.687.695v.1A2.2,2.2,0,0,0,14.869,5.3a2.159,2.159,0,0,0,2.36-.464l.067-.068a.681.681,0,0,1,.971,0L19.38,5.893a.7.7,0,0,1,0,.983l-.067.068a2.223,2.223,0,0,0-.459,2.389,2.178,2.178,0,0,0,1.994,1.36h.094a.692.692,0,0,1,.687.695Z" transform="translate(-1 -1)"/>
												<path id="Path_40" data-name="Path 40" d="M13.965,9a4.965,4.965,0,1,0,4.965,4.965A4.965,4.965,0,0,0,13.965,9Zm0,8.511a3.546,3.546,0,1,1,3.546-3.546,3.546,3.546,0,0,1-3.546,3.546Z" transform="translate(-2.913 -2.781)"/>
											  </g>
											</g>
										</svg>
                      </span>
                      <span className="menu-bar__name">Registration</span>
                    </span>
                  </a>

                  <div className={`sherah__dropdown ${registrationOpen ? "show" : ""}`}>
                    <ul className="menu-bar__one-dropdown">
                      <li>
                        <a href="#" onClick={() => openModal("brand")}>
                          <span className="menu-bar__text">
                            <span className="menu-bar__name">Brand</span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" onClick={() => openModal("category")}>
                          <span className="menu-bar__text">
                            <span className="menu-bar__name">Category</span>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && <ModalForm type={formType} onClose={closeModal} />}
    </>
  );
}