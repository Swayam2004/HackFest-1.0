import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Set this to your GitHub repository name (the part after your username)
// e.g. if your repo is https://github.com/yourname/HackFest-1.0 → base: '/HackFest-1.0/'
export default defineConfig({
  base: '/HackFest-1.0/',
  plugins: [react(), tailwindcss()],
});
