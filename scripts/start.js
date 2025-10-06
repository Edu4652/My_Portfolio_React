#!/usr/bin/env node

/**
 * Custom production server script
 * Reads PORT from environment variables and starts Next.js production server
 */

const { spawn } = require("child_process");
const path = require("path");

// Load environment variables from .env.local
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

// Get port from environment or default to 3000
const port = process.env.PORT || 3000;

console.log(`🚀 Starting production server on port ${port}...`);

// Start Next.js production server with custom port
const child = spawn("npx", ["next", "start", "-p", port.toString()], {
  stdio: "inherit",
  shell: true,
  cwd: path.join(__dirname, ".."),
});

child.on("error", (error) => {
  console.error("❌ Error starting production server:", error);
  process.exit(1);
});

child.on("exit", (code) => {
  if (code !== 0) {
    console.error(`❌ Production server exited with code ${code}`);
    process.exit(code);
  }
});

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down production server...");
  child.kill("SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Shutting down production server...");
  child.kill("SIGTERM");
  process.exit(0);
});
