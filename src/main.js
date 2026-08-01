import './style.css'

// The base URL for the NASA API
const API_URL = 'https://api.nasa.gov/planetary/apod';

// Fetch the API key from the environment variable
// Note: Vite prefixes public env vars with VITE_
const API_KEY = import.meta.env.VITE_NASA_API_KEY;

async function fetchNASAData() {
  if (!API_KEY) {
    console.error('NASA API Key is missing! Check your .env and GitHub Secrets.');
    document.querySelector('#app').innerHTML = '<h1>Error: API Key missing</h1>';
    return;
  }

  try {
    // Add a loading state
    const app = document.querySelector('#app');
    app.innerHTML = '<div class="loading">Loading cosmic wonder...</div>';

    const date = document.querySelector('#datepicker')?.value;
    const requestUrl = date
      ? `${API_URL}?api_key=${API_KEY}&date=${encodeURIComponent(date)}&thumbs=true`
      : `${API_URL}?api_key=${API_KEY}&thumbs=true`;

    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Render the content
    app.innerHTML = `
      <header>
        <h1>${data.title}</h1>
        <p class="date">${data.date}</p>
      </header>
      
      <main>
        ${data.media_type === 'image' 
          ? `<img src="${data.url}" alt="${data.title}" class="apod-image">` 
          : `<iframe src="${data.url}" frameborder="0" allowfullscreen class="apod-video"></iframe>`
        }
        
        <div class="explanation">
          <h2>Explanation</h2>
          <p>${data.explanation}</p>
        </div>
      </main>

      <footer>
        <p>Provided by NASA API</p>
      </footer>
    `;

  } catch (error) {
    console.error('Fetch error:', error);
    document.querySelector('#app').innerHTML = `
      <div class="error">
        <h1>Oops!</h1>
        <p>Something went wrong fetching the data.</p>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// Initialize the app
fetchNASAData();