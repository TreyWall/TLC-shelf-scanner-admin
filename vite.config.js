import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react({
            // transform JSX in .js, .jsx, .ts, .tsx
            include: "**/*.{js,jsx,ts,tsx}"
        })
    ]
});
