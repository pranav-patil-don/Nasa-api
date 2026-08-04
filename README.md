# NASA APOD Viewer

A lightweight Vite web app that displays NASA's Astronomy Picture of the Day. It fetches the daily APOD from NASA's API and shows the title, image or video, and explanation.

## Setup

Install the project dependencies:

```bash
npm install
```

Create a `.env` file using the example provided in `.env.example`, then add your NASA API key:

```bash
copy .env.example .env
```

Edit `.env` and set `VITE_NASA_API_KEY`.

## Run locally

Start the development server:

```bash
npm run dev
```

Open the local address shown in the terminal (usually `http://localhost:5173`).

## Build for production

Create an optimized production build:

```bash
npm run build
```

## Preview the production build

Try the built version locally:

```bash
npm run preview
```
```

