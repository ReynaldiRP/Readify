// Application configuration
export const appConfig = {
  name: "Readify",
  version: "1.0.0",
  description: "A modern reading application",
  author: "Your Company",
  // Add more configuration as needed
  api: {
    baseUrl: import.meta.env.API_URL || "http://localhost:3000/api",
    token: import.meta.env.API_TOKEN || "",
  },
  features: {
    darkMode: true,
    notifications: true,
  },
  environment: "dev", // dev or prod
};
// For easier access to just the app name
export const APP_NAME = appConfig.name;
export const isProduction = appConfig.environment === "prod";
