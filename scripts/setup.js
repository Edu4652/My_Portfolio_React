#!/usr/bin/env node

/**
 * Setup script for environment configuration
 * Helps configure the development environment
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const envPath = path.join(__dirname, "..", ".env.local");

console.log("🔧 Portfolio Environment Setup\n");

// Function to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Function to create .env.local file
function createEnvFile(port, nodeEnv = "development") {
  const envContent = `# Environment variables for local development
# This file is automatically loaded by Next.js

# Server configuration
PORT=${port}

# Development settings
NODE_ENV=${nodeEnv}

# Optional: Custom domain for development
# HOSTNAME=localhost

# Optional: Enable/disable specific features
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
# NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Contact form configuration (optional)
# NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
# NEXT_PUBLIC_CONTACT_PHONE=+1234567890

# Social media links (optional)
# NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername
# NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/yourusername
# NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yourusername
`;

  fs.writeFileSync(envPath, envContent);
  console.log(`✅ Created .env.local with PORT=${port}`);
}

async function setup() {
  try {
    // Check if .env.local already exists
    if (fs.existsSync(envPath)) {
      const overwrite = await askQuestion(
        "📁 .env.local already exists. Overwrite? (y/N): "
      );
      if (
        overwrite.toLowerCase() !== "y" &&
        overwrite.toLowerCase() !== "yes"
      ) {
        console.log("❌ Setup cancelled.");
        rl.close();
        return;
      }
    }

    // Ask for port
    const port = await askQuestion("🚀 Enter port number (default: 3000): ");
    const finalPort = port.trim() || "3000";

    // Validate port
    const portNumber = parseInt(finalPort);
    if (isNaN(portNumber) || portNumber < 1 || portNumber > 65535) {
      console.log("❌ Invalid port number. Using default port 3000.");
      createEnvFile("3000");
    } else {
      createEnvFile(finalPort);
    }

    console.log("\n🎉 Setup complete!");
    console.log("\n📋 Available commands:");
    console.log("  npm run dev    - Start development server");
    console.log("  npm run build  - Build for production");
    console.log("  npm run start  - Start production server");
    console.log("\n💡 To change the port later, edit .env.local");
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
  } finally {
    rl.close();
  }
}

setup();
