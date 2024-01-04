import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Ensure that you have this import statement
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: {
    https: true,
    proxy: {
      "/get-state": {
        target: "https://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(), mkcert()],
});
