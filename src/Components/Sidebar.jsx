import React, { useState } from "react";
import logo from "../assets/img/logo.png";

export default function Sidebar() {
  const [productOpen, setProductOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false); // Registration dropdown state
  const [activeMenu, setActiveMenu] = useState(""); // active menu tracking

  const handleMenuClick = (menuName) => {
    if (activeMenu === menuName) {
      // agar already active ho to close kar do
      setActiveMenu("");
      setProductOpen(false);
      setRegistrationOpen(false);
    } else {
      setActiveMenu(menuName);
      setProductOpen(menuName === "products");
      setRegistrationOpen(menuName === "registration");
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
            {/* Close icon SVG */}
          </div>
        </div>

        <div className="admin-menu__one sherah-sidebar-padding">
          <div className="menu-bar">
            <ul className="menu-bar__one sherah-dashboard-menu" id="sherahMenu">
              {/* Dashboard */}
              <li>
                <a href="#">
                  <span className="menu-bar__text">
                    <span className="sherah-menu-icon sherah-svg-icon__v1">
                      {/* Dashboard SVG */}
                    </span>
                    <span className="menu-bar__name">Dashboard</span>
                  </span>
                </a>
              </li>

              {/* Products Dropdown */}
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
                      {/* Products SVG */}
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

              {/* Registration Dropdown */}
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
                      {/* Optional Registration SVG */}
                    </span>
                    <span className="menu-bar__name">Registration</span>
                  </span>
                  <span className="sherah__toggle" />
                </a>
                <div className={`sherah__dropdown ${registrationOpen ? "show" : ""}`}>
                  <ul className="menu-bar__one-dropdown">
                    <li>
                      <a href="brand.html">
                        <span className="menu-bar__text">
                          <span className="menu-bar__name">Brand</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="category.html">
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
  );
}