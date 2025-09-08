# React URL Shortener Application

## Project Overview
This project is a URL shortener web application built with React and Vite. It allows users to shorten URLs with optional custom shortcodes and validity periods. The app tracks usage statistics and supports redirection from short URLs to the original URLs. Data persistence is handled via browser localStorage.

## Architecture
- **Frontend-only SPA** built with React and Vite for fast development and hot module replacement.
- **Client-side routing** managed by React Router.
- **State management** using React hooks and local component state.
- **Data persistence** using browser localStorage to store shortened URLs and click statistics.
- **Logging middleware** integrated to send logs to an external API for monitoring.

## Design Principles
- **Simplicity:** Minimalistic UI using Material-UI components for consistency and responsiveness.
- **User Experience:** Client-side validation with clear error messages and feedback.
- **Extensibility:** Modular React components and pages to allow easy future enhancements.
- **Performance:** Lightweight SPA with no backend dependencies, leveraging localStorage for quick data access.

## Data Modelling
- Each shortened URL is stored as an object with the following properties:
  - `originalUrl`: The original long URL.
  - `shortcode`: Unique alphanumeric string used as the short URL identifier.
  - `createdAt`: ISO timestamp of creation.
  - `expiresAt`: ISO timestamp when the short URL expires.
  - `clicks`: Number of times the short URL was accessed.
  - `clickDetails`: Array of click event objects containing:
    - `timestamp`: When the click occurred.
    - `source`: Referrer or "Direct".
    - `geoLocation`: Geographical location (currently "Unknown").

## Technology Stack and Justifications
- **React:** Popular, component-based UI library with strong ecosystem.
- **Vite:** Modern build tool with fast hot module replacement and optimized builds.
- **React Router:** Industry standard for client-side routing in React apps.
- **Material-UI:** Provides accessible, customizable UI components for rapid development.
- **localStorage:** Simple client-side persistence without backend complexity.
- **Logging Middleware:** Custom module to send logs to an external API for monitoring and debugging.

## Routing Strategy
- Uses React Router's `BrowserRouter` for clean URLs.
- Routes:
  - `/` - URL Shortener page for creating short URLs.
  - `/stats` - Statistics page showing usage data.
  - `/:shortcode` - Redirect page that looks up the shortcode and redirects to the original URL.

## URL Handling and Redirection
- On accessing a short URL (`/:shortcode`), the app:
  - Checks localStorage for the shortcode.
  - Validates expiry; if expired, alerts user and redirects to home.
  - Updates click statistics with timestamp, source, and geo location.
  - Redirects browser to the original URL.
- If shortcode not found, alerts user and redirects to home.

## Installation and Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server at `http://localhost:3000`.
4. Open the URL in a browser to use the app.

## Usage
- Enter one or more URLs to shorten, optionally specifying validity in minutes and preferred shortcode.
- Click "Shorten URLs" to generate short URLs.
- View shortened URLs and their expiry times.
- Visit `/stats` to see detailed click statistics.
- Access short URLs to be redirected to the original URLs.

## Features
- Supports up to 5 URLs at once.
- Client-side validation for URLs, validity, and shortcode format.
- Unique shortcode generation with collision avoidance.
- Click tracking with detailed metadata.
- Expiry handling with user alerts.
- Persistent data storage in localStorage.
- Logging middleware integration for event tracking.

## Future Enhancements
- Backend integration for persistent storage and scalability.
- GeoIP API integration for accurate geographical data.
- User authentication for personalized URL management.
- Analytics dashboard with charts and export options.
- Custom domain support for short URLs.
- Enhanced error handling and UI improvements.

---

This README provides a comprehensive overview of the project architecture, design, data modelling, technology choices, routing, URL handling, and usage instructions.
