import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Redirect = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("shortenedUrls");
    if (stored) {
      const urls = JSON.parse(stored);
      const matched = urls.find((item) => item.shortcode === shortcode);
      if (matched) {
        // Check expiry
        if (new Date(matched.expiresAt) < new Date()) {
          alert("This short URL has expired.");
          navigate("/");
          return;
        }
        // Update click stats
        const click = {
          timestamp: new Date().toISOString(),
          source: document.referrer || "Direct",
          geoLocation: "Unknown", // Could be enhanced with geo IP API
        };
        matched.clicks = (matched.clicks || 0) + 1;
        matched.clickDetails = matched.clickDetails || [];
        matched.clickDetails.push(click);

        // Save updated data
        const updatedUrls = urls.map((item) =>
          item.shortcode === shortcode ? matched : item
        );
        localStorage.setItem("shortenedUrls", JSON.stringify(updatedUrls));

        // Redirect to original URL
        window.location.href = matched.originalUrl;
      } else {
        alert("Short URL not found.");
        navigate("/");
      }
    } else {
      alert("No shortened URLs found.");
      navigate("/");
    }
  }, [shortcode, navigate]);

  return <div>Redirecting...</div>;
};

export default Redirect;
