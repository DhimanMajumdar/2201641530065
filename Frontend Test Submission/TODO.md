# TODO for React URL Shortener App

1. Add React Router dependency to package.json and install it.
2. Update src/App.jsx to setup routing for:
   - "/" -> URLShortenerPage
   - "/stats" -> URLStatisticsPage
   - "/:shortcode" -> Redirect component
3. Create src/pages/URLShortenerPage.jsx:
   - Form for up to 5 URLs with original URL, optional validity, optional shortcode.
   - Client-side validation.
   - Display shortened URLs with expiry.
   - Use Material UI components.
4. Create src/pages/URLStatisticsPage.jsx:
   - Display list of shortened URLs with creation, expiry, total clicks.
   - Show detailed click data (timestamp, source, geo location).
   - Use Material UI components.
5. Create src/pages/Redirect.jsx:
   - Handle redirection from short URL to original URL.
   - Update click stats.
6. Use localStorage for persistence of URLs and stats.
7. Implement error handling and user-friendly messages.
8. Integrate logging middleware usage in API calls (mock or placeholder).
9. Test the app locally on localhost:3000.
