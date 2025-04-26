import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepliData } from "../app/features/repli/repliSlice";
import { Bell, Globe, Search, SlidersHorizontal } from "lucide-react";
import "../style/container.css";
import "../style/generate.css";
const GenerateReviewComponent = () => {
  const [scheduled, setScheduled] = useState(false);
  const toneArray = ["friendly", "empathetic", "bold"];
  const bgArray = ["bg-blue", "bg-pink", "bg-purple"];

  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.repli);

  useEffect(() => {
    dispatch(fetchRepliData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRepliData());
  }, []);

  return (
    <div className="mainContainter">
      {console.log("status:", status)}
      {status !== "succeeded" ? (
        <p>Loading reviews...</p>
      ) : (
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
          <div className="review-panel">
            <div className="review-header">
              <img src="/image/lion.png" alt="avatar" className="avatar" />
              <div>
                <div className="reviewer-name">RealTalkRick</div>
                <div className="stars">★★★☆☆</div>
              </div>
              <div className="tag-negative">Negative</div>
            </div>

            <p className="review-text">
              Unfortunately, this lotion didn’t work for me. It felt greasy and
              didn’t absorb well. The scent was also too strong and gave me a
              headache. After a few tries, I had to stop using it. Disappointed,
              especially for the price.
            </p>

            <h4 className="ai-heading">Here’s what RepliBot AI came up with</h4>

            <div className="response-options">
              {toneArray?.map((r, i) => (
                <div style={{ flex: 1 }} key={i}>
                  <div className={`${bgArray[i]}`}></div>
                  <div className={`response-header-${bgArray[i]}`}>
                    {toneArray[i]}
                  </div>
                  <div className={`response-card`} key={i}>
                    <p className="response-text">
                      {items ? items[0].response[r] : ""}
                    </p>
                    <div className="response-actions">
                      <button className="icon-btn">↻</button>
                      <button className="icon-btn">✎</button>
                    </div>
                    <button className="btn-primary">Approve & Post</button>
                    <div className="schedule-wrapper">
                      <button
                        className="schedule-toggle"
                        onClick={() => setScheduled(!scheduled)}
                      >
                        Schedule Reply ⌄
                      </button>
                      {scheduled && (
                        <div className="schedule-fields">
                          <input type="date" defaultValue="2025-04-15" />
                          <input type="time" defaultValue="08:00" />
                          <button className="btn-schedule">Schedule</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateReviewComponent;
