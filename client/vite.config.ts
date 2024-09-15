import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Ensure that process.env is properly typed and stringified
      'process.env': Object.fromEntries(
        Object.entries(env).map(([key, value]) => [key, JSON.stringify(value)])
      ),
    },
  };
});
