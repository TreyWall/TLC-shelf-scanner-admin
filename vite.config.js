import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the admin dashboard. The plugin enables
// React fast refresh and JSX transformation. Environment variables
// prefixed with `VITE_` are statically injected into the app.
export default defineConfig({
  plugins: [react()],
  define: {
    // Provide an empty process.env to dependencies that expect it
    'process.env': {},
  },
});