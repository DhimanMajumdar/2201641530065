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
        // Update click stats with geo IP API
        const fetchGeoLocation = async () => {
          try {
            console.log("Fetching geo location...");
            const response = await fetch("https://ipapi.co/json/");
            console.log("Geo API response status:", response.status);
            if (!response.ok) {
              throw new Error(
                `Failed to fetch geo location: ${response.status}`
              );
            }
            const data = await response.json();
            console.log("Geo API data:", data);
            const location = `${data.city || "Unknown"}, ${data.region || ""} ${
              data.country_name || ""
            }`.trim();
            console.log("Formatted location:", location);
            return location;
          } catch (error) {
            console.error("GeoLocation fetch error:", error);
            return "Unknown";
          }
        };

        (async () => {
          const geoLocation = await fetchGeoLocation();
          const click = {
            timestamp: new Date().toISOString(),
            source: document.referrer || "Direct",
            geoLocation: geoLocation,
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
        })();
        return;
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
