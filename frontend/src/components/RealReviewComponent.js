import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepliData } from "../app/features/repli/repliSlice";
import { useEffect } from "react";
import { Bell, Globe, Search, SlidersHorizontal } from "lucide-react";
import "../style/container.css";
import "../style/realReview.css";
const RealReviewComponent = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.repli);

  useEffect(() => {
    dispatch(fetchRepliData());
  }, [dispatch]);

  const navigate = useNavigate();

  const StarRating = ({ rating }) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i}>{i <= rating ? "★" : "☆"}</span>
        ))}
      </div>
    );
  };

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

        {status === "loading" ? (
          <p>Loading reviews...</p>
        ) : (
          <div className="review-container">
            <h2>Hand Lotion</h2>
            <p className="breadcrumb">
              Hand Lotion &gt;&gt; Customer Reviews &gt;&gt; RealTalkRick
            </p>
            {items.map((review) => (
              <div
                className="review-card"
                key={review.id}
                onClick={() => {
                  navigate("/realreview/123/john");
                }}
              >
                <div className="review-header">
                  <div className="leftheader">
                    <div className="user-info">
                      <img src="/image/lion.png" className="avatar" />
                      <div>
                        <strong>{review.author}</strong>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    {review.rating && (
                      <span className="badge">{"New Reply"}</span>
                    )}
                  </div>
                  <div className="rightheader">
                    <div
                      className={`status ${
                        review.sentiment === "NEGATIVE" ? "red" : "green"
                      }`}
                    >
                      {review.sentiment}
                    </div>
                    <div className="time">{review.date}</div>
                  </div>
                </div>
                <p className="review-text">{review.body}</p>
                {review.rating && (
                  <button className="action-btn">
                    {"Reply with RepliBot"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RealReviewComponent;
