import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react()    // use the plugin with its defaults (handles .js, .jsx, .ts, .tsx)
    ]
});
