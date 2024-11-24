import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
	proxy: { //Using Vite's proxy feature because request will be blocked by browser CORS policy (HTTPS request from HTTP page). Can be done normally once app is served over HTTPS.
		"/api/token": {
			target: "https://accounts.spotify.com",
			changeOrigin: true
		}
	}
  }
})
