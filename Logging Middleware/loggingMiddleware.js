/**
 * Logging Middleware for Frontend React App
 *
 * This module exports a reusable Log function that sends logs to the test server API.
 * It captures the entire lifecycle of significant events within the application.
 *
 * Usage:
 *   Log(stack, level, packageName, message)
 *
 * Parameters:
 *   - stack: "frontend" (string, lowercase)
 *   - level: "debug" | "info" | "warn" | "error" | "fatal" (string, lowercase)
 *   - packageName: string (e.g., "component", "hook", "page", "state", "style")
 *   - message: string - descriptive log message
 *
 * The function sends a POST request to the logging API endpoint.
 */

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

export async function Log(stack, level, packageName, message) {
  // Validate inputs (basic)
  const validStacks = ["frontend"];
  const validLevels = ["debug", "info", "warn", "error", "fatal"];

  if (!validStacks.includes(stack.toLowerCase())) {
    console.warn(`Invalid stack value for Log: ${stack}`);
    return;
  }
  if (!validLevels.includes(level.toLowerCase())) {
    console.warn(`Invalid level value for Log: ${level}`);
    return;
  }
  if (typeof packageName !== "string" || packageName.trim() === "") {
    console.warn("Invalid packageName for Log");
    return;
  }
  if (typeof message !== "string" || message.trim() === "") {
    console.warn("Invalid message for Log");
    return;
  }

  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: packageName.toLowerCase(),
    message: message,
  };

  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Logging failed with status ${response.status}`);
    } else {
      const data = await response.json();
      console.log("Log created successfully:", data);
    }
  } catch (error) {
    console.error("Logging error:", error);
  }
}
