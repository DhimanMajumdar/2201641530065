import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const URLStatisticsPage = () => {
  const [shortenedUrls, setShortenedUrls] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("shortenedUrls");
    if (stored) {
      setShortenedUrls(JSON.parse(stored));
    }
  }, []);

  const [openRows, setOpenRows] = useState({});

  const handleToggleRow = (index) => {
    setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener Statistics
      </Typography>
      <List>
        {shortenedUrls.length === 0 && (
          <Typography>No shortened URLs found in this session.</Typography>
        )}
        {shortenedUrls.map((item, index) => (
          <Paper key={index} sx={{ mb: 2, p: 2 }}>
            <ListItem
              secondaryAction={
                <IconButton
                  onClick={() => handleToggleRow(index)}
                  edge="end"
                  aria-label="expand"
                >
                  {openRows[index] ? (
                    <KeyboardArrowUp />
                  ) : (
                    <KeyboardArrowDown />
                  )}
                </IconButton>
              }
            >
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
            <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Click Details</Typography>
                {item.clickDetails && item.clickDetails.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table size="small" aria-label="click details">
                      <TableHead>
                        <TableRow>
                          <TableCell>Timestamp</TableCell>
                          <TableCell>Source</TableCell>
                          <TableCell>Geographical Location</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item.clickDetails.map((click, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              {new Date(click.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell>{click.source || "Unknown"}</TableCell>
                            <TableCell>
                              {click.geoLocation || "Unknown"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography>No click data available.</Typography>
                )}
              </Box>
            </Collapse>
          </Paper>
        ))}
      </List>
    </Container>
  );
};

export default URLStatisticsPage;
