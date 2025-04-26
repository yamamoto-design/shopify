import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/container.css";
import { Bell, Globe, Search, SlidersHorizontal } from "lucide-react";
const ReplicabotReviews = () => {
  const products = [
    {
      name: "Hair Serum",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "Sold Out",
      statusClass: "status-red",
      reviews: 5,
      newReviews: 2,
      img: "/image/HairSerum.png",
    },
    {
      name: "Nail Paints",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "Available",
      statusClass: "status-green",
      reviews: 2,
      newReviews: 1,
      img: "/image/NailPaints.png",
    },
    {
      name: "Haircare Shampoo",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "Fast Filling",
      statusClass: "status-yellow",
      reviews: 1,
      newReviews: 0,
      img: "/image/HaircareSampoo.png",
    },
    {
      name: "Hair Dryer",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "Fast Filling",
      statusClass: "status-yellow",
      reviews: 2,
      newReviews: 1,
      img: "/image/HairDryer.png",
    },
    {
      name: "Hand Lotion",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "Available",
      statusClass: "status-green",
      reviews: 3,
      newReviews: 1,
      img: "/image/HandLotion.png",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="mainContainter">
      <div className="container">
        <header className="reply-header">
          <h1 className="title">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712139.png"
              alt="logo"
              className="logo"
            />
            RepliBot AI
          </h1>
          <div className="icon-group">
            <Bell className="icon" />
            <Globe className="icon" />
          </div>
        </header>

        <div className="controls">
          <div
            style={{
              flex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div className="search-box">
              <Search className="search-icon" />
              <input type="text" placeholder="Search" />
            </div>
            <button className="filter-button">
              <SlidersHorizontal className="filter-icon" /> Filter
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 3,
              justifyContent: "space-evenly",
              gap: "10px",
            }}
          >
            <select className="select-table">
              <option>Columns</option>
            </select>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p>Show :</p>
              <select className="select-table" style={{ width: "60px" }}>
                <option>5</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="navigation-button">&lt;</button>
              <div className="pagination">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    className={`page-button ${n === 1 ? "active" : ""}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <button className="navigation-button">&gt;</button>
            </div>
          </div>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Product Names</th>
              <th style={{ width: "20%" }}>Product Description</th>
              <th style={{ width: "15%" }}>Status</th>
              <th style={{ width: "15%" }}>Reviews</th>
              <th style={{ textAlign: "left" }}>New Reviews</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={i}
                className={i % 2 === 1 ? "alt-row" : ""}
                onClick={() => {
                  navigate("/realreview/123");
                }}
              >
                <td className="product-name">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="product-img"
                  />
                  <span>{product.name}</span>
                </td>
                <td>{product.description}</td>
                <td>
                  <span className={`status-badge ${product.statusClass}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <a href="#" className="link">
                    {product.reviews} reviews
                  </a>
                </td>
                <td style={{ textAlign: "left" }}>
                  <a href="#" className="link">
                    {product.newReviews}{" "}
                    {product.newReviews === 1 ? "review" : "reviews"}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReplicabotReviews;
