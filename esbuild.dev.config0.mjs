// esbuild.dev.mjs
import esbuild from "esbuild";
import { spawn } from "child_process";

async function run() {
  const ctx = await esbuild.context({
    entryPoints: ["src/index.jsx"],
    bundle: true,
    format: "esm",
    sourcemap: true,
    outdir: "dist",
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
  });

  // Start Tailwind CSS watcher
  const tailwindProcess = spawn(
    "npx",
    [
      "tailwindcss",
      "-i",
      "src/input.css", // adjust path as needed
      "-o",
      "dist/output.css", // output to dist folder
      "--watch",
    ],
    {
      stdio: "inherit", // This will show Tailwind output in your terminal
      // stdio: ["ignore", "ignore", "ignore"], // Hide all output Tried but not working.
      shell: process.platform === "win32", // Needed for Windows compatibility
    }
  );

  // Handle Tailwind process errors
  tailwindProcess.on("error", (err) => {
    console.error("❌ Failed to start Tailwind CSS:", err);
  });

  // Watch for esbuild changes
  await ctx.watch();

  // Start dev server
  const server = await ctx.serve({
    port: 3078,
    servedir: "dist",
  });
  const host = server.host || "localhost";
  console.log(`✅ Dev server running at http://${host}:${server.port}`);
  console.log(`✅ Tailwind CSS 4.x watching for changes...`);

  // Cleanup on exit
  process.on("SIGINT", () => {
    console.log("\n🛑 Shutting down...");
    tailwindProcess.kill();
    ctx.dispose();
    process.exit(0);
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
