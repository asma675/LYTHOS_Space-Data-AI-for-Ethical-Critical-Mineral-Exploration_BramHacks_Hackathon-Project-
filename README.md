# LYTHOS — BramHacks (Next.js + Tailwind + Leaflet)

## Quickstart
```bash
npm i
npm run dev
```

## Deploy to Vercel
- Push to GitHub
- Import in Vercel
- Build command: `next build`
- Ensure Node 18+

## Edit the Map
- `components/Map.tsx` uses `react-leaflet` with 3 overlay placeholders.
- Replace the `TileLayer url` values with your Sentinel‑2 / GEDI / GRACE‑FO WMS/XYZ providers or custom tiles.
- Center defaults to Sudbury (Ontario). Change `center` prop for NWT focus.
