
import React, { useState } from "react";
import logo from "../assets/img/logo.png";

export default function Sidebar() {
  const [productOpen, setProductOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(""); // active menu tracking
      const handleMenuClick = (menuName) => {
    if (activeMenu === menuName) {
      // agar already active ho to close kar do
      setActiveMenu("");
      setProductOpen(false);
    } else {
      setActiveMenu(menuName);
      setProductOpen(menuName === "products");
    }
  };

  return (
    <div className="sherah-smenu">
      <div className="admin-menu">
        <div className="logo sherah-sidebar-padding">
          <a href="/">
            <img className="sherah-logo__main" src={logo} alt="Logo" />
          </a>
          <div className="sherah__sicon close-icon d-xl-none">
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.19855 7.41927C4.22908 5.52503 2.34913 3.72698 0.487273 1.90989C0.274898 1.70227 0.0977597 1.40419 0.026333 1.11848C-0.0746168 0.717537 0.122521 0.36707 0.483464 0.154695C0.856788 -0.0643475 1.24249 -0.0519669 1.60248 0.199455C1.73105 0.289929 1.84438 0.404212 1.95771 0.514685C4.00528 2.48321 6.05189 4.45173 8.09755 6.4212C8.82896 7.12499 8.83372 7.6145 8.11565 8.30687C6.05856 10.2878 4.00052 12.2677 1.94152 14.2467C1.82724 14.3562 1.71391 14.4696 1.58439 14.5591C1.17773 14.841 0.615842 14.781 0.27966 14.4324C-0.056522 14.0829 -0.0946163 13.5191 0.202519 13.1248C0.296802 12.9991 0.415847 12.8915 0.530129 12.781C2.29104 11.0868 4.05194 9.39351 5.81571 7.70212C5.91761 7.60593 6.04332 7.53355 6.19855 7.41927Z" />
            </svg>
          </div>
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
                  <span className="sherah__toggle" />
                </a>
                <div className={`sherah__dropdown ${productOpen ? "show" : ""}`}>
                  <ul className="menu-bar__one-dropdown">
                    <li>
                      <a href="products.html">
                        <span className="menu-bar__text">
                          <span className="menu-bar__name">Products</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="product-list.html">
                        <span className="menu-bar__text">
                          <span className="menu-bar__name">Product Details</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="upload-product.html">
                        <span className="menu-bar__text">
                          <span className="menu-bar__name">Upload Product</span>
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
  );
}
