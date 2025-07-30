import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react({
            // ensure JSX in .js/.jsx is transpiled
            include: "**/*.{js,jsx,ts,tsx}"
        })
    ]
});
