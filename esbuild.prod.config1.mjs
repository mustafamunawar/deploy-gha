// esbuild.prod.mjs
import esbuild from "esbuild";
import { spawn } from "child_process";
import { promises as fs } from "fs";
import path from "path";

async function run() {
  console.log("🚀 Building for production...");

  // Clean build directory
  try {
    await fs.rm("build", { recursive: true, force: true });
    console.log("✅ Cleaned build directory");
  } catch (err) {
    // Directory might not exist, that's okay
  }

  // Build Tailwind CSS first
  console.log("🎨 Building Tailwind CSS...");
  const tailwindProcess = spawn(
    "npx",
    [
      "tailwindcss",
      "-i",
      "src/input.css",
      "-o",
      "build/output.css",
      "--minify", // Minify CSS for production
    ],
    {
      stdio: "inherit",
      shell: process.platform === "win32",
    }
  );

  // Wait for Tailwind to complete
  await new Promise((resolve, reject) => {
    tailwindProcess.on("close", (code) => {
      if (code === 0) {
        console.log("✅ Tailwind CSS build completed");
        resolve();
      } else {
        reject(new Error(`Tailwind CSS build failed with code ${code}`));
      }
    });

    tailwindProcess.on("error", (err) => {
      reject(err);
    });
  });

  // Build with esbuild
  console.log("📦 Building JavaScript bundle...");
  await esbuild.build({
    entryPoints: ["src/index.jsx"],
    bundle: true,
    format: "esm",
    minify: true, // Minify for production
    sourcemap: false, // Disable sourcemaps for production (set to true if you want them)
    outdir: "build",
    target: ["es2020"], // Set target for better browser compatibility
    loader: {
      ".js": "jsx",
      ".jsx": "jsx",
      ".css": "css",
      ".png": "file",
      ".jpg": "file",
      ".svg": "file",
      ".woff": "file",
      ".woff2": "file",
      ".html": "copy",
    },
    define: {
      "process.env.NODE_ENV": '"production"', // Define NODE_ENV for production
    },
    drop: ["console", "debugger"], // Remove console.log and debugger statements
    treeShaking: true, // Enable tree shaking (default for format: "esm")
  });

  console.log("✅ Production build completed successfully!");
  console.log("📁 Output directory: build/");
}

run().catch((err) => {
  console.error("❌ Production build failed:", err);
  process.exit(1);
});
