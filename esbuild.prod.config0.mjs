import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.jsx"],
    outdir: "build",
    bundle: true, // Enable bundling
    format: "esm", // Enable ES Modules
    minify: true, // Minify the output for production
    sourcemap: false, // Generate sourcemaps
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
    logLevel: "info",
    entryNames: "[name]",
    assetNames: "assets/[name]-[hash]",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    external: [], // Exclude specific modules from being bundled (e.g., external: ["node_modules/*"])
    plugins: [],
  })
  .then(() => {
    console.log("Build complete.");
  })
  .catch(() => process.exit(1));
