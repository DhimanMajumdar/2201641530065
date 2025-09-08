import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";

const MAX_URLS = 5;
const DEFAULT_VALIDITY_MINUTES = 30;

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function generateShortcode() {
  return Math.random().toString(36).substring(2, 8);
}

const URLShortenerPage = () => {
  const [urls, setUrls] = useState([
    { originalUrl: "", validity: "", shortcode: "", error: "" },
  ]);
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem("shortenedUrls");
    if (stored) {
      setShortenedUrls(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage on shortenedUrls change
    localStorage.setItem("shortenedUrls", JSON.stringify(shortenedUrls));
  }, [shortenedUrls]);

  const handleInputChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    newUrls[index].error = "";
    setUrls(newUrls);
  };

  const validateInputs = () => {
    let valid = true;
    const newUrls = urls.map((url) => {
      let error = "";
      if (!url.originalUrl || !isValidUrl(url.originalUrl)) {
        error = "Invalid URL";
        valid = false;
      }
      if (
        url.validity &&
        (!/^\d+$/.test(url.validity) || parseInt(url.validity) <= 0)
      ) {
        error = "Validity must be a positive integer";
        valid = false;
      }
      if (url.shortcode && !/^[a-zA-Z0-9]{1,20}$/.test(url.shortcode)) {
        error = "Shortcode must be alphanumeric and up to 20 chars";
        valid = false;
      }
      return { ...url, error };
    });
    setUrls(newUrls);
    return valid;
  };

  const isShortcodeUnique = (code) => {
    return !shortenedUrls.some((item) => item.shortcode === code);
  };

  const handleShorten = () => {
    setGeneralError("");
    if (!validateInputs()) {
      return;
    }
    const newShortened = [];
    for (const url of urls) {
      let code = url.shortcode || generateShortcode();
      // Ensure uniqueness
      let attempts = 0;
      while (!isShortcodeUnique(code)) {
        code = generateShortcode();
        attempts++;
        if (attempts > 10) {
          setGeneralError("Failed to generate unique shortcode, try again");
          return;
        }
      }
      const validityMinutes = url.validity
        ? parseInt(url.validity)
        : DEFAULT_VALIDITY_MINUTES;
      const createdAt = new Date().toISOString();
      const expiresAt = new Date(
        Date.now() + validityMinutes * 60000
      ).toISOString();
      newShortened.push({
        originalUrl: url.originalUrl,
        shortcode: code,
        createdAt,
        expiresAt,
        clicks: 0,
        clickDetails: [],
      });
    }
    setShortenedUrls([...shortenedUrls, ...newShortened]);
    setUrls([{ originalUrl: "", validity: "", shortcode: "", error: "" }]);
  };

  const handleAddUrl = () => {
    if (urls.length < MAX_URLS) {
      setUrls([
        ...urls,
        { originalUrl: "", validity: "", shortcode: "", error: "" },
      ]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      {generalError && <Alert severity="error">{generalError}</Alert>}
      <Grid container spacing={2}>
        {urls.map((url, index) => (
          <Grid item xs={12} key={index}>
            <Paper sx={{ p: 2 }}>
              <TextField
                label="Original URL"
                fullWidth
                value={url.originalUrl}
                onChange={(e) =>
                  handleInputChange(index, "originalUrl", e.target.value)
                }
                error={!!url.error && url.error.includes("URL")}
                helperText={
                  url.error && url.error.includes("URL") ? url.error : ""
                }
                margin="normal"
              />
              <TextField
                label="Validity (minutes)"
                fullWidth
                value={url.validity}
                onChange={(e) =>
                  handleInputChange(index, "validity", e.target.value)
                }
                error={!!url.error && url.error.includes("Validity")}
                helperText={
                  url.error && url.error.includes("Validity") ? url.error : ""
                }
                margin="normal"
              />
              <TextField
                label="Preferred Shortcode (optional)"
                fullWidth
                value={url.shortcode}
                onChange={(e) =>
                  handleInputChange(index, "shortcode", e.target.value)
                }
                error={!!url.error && url.error.includes("Shortcode")}
                helperText={
                  url.error && url.error.includes("Shortcode") ? url.error : ""
                }
                margin="normal"
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleAddUrl}
          disabled={urls.length >= MAX_URLS}
        >
          Add URL
        </Button>{" "}
        <Button variant="contained" color="primary" onClick={handleShorten}>
          Shorten URLs
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Shortened URLs</Typography>
        <List>
          {shortenedUrls.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={
                  <a
                    href={`/${item.shortcode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    {window.location.origin}/{item.shortcode}
                  </a>
                }
                secondary={`Original URL: ${
                  item.originalUrl
                } | Created: ${new Date(
                  item.createdAt
                ).toLocaleString()} | Expires: ${new Date(
                  item.expiresAt
                ).toLocaleString()} | Total Clicks: ${item.clicks || 0}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default URLShortenerPage;
