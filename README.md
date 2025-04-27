# SimplifyIt Browser Extension

SimplifyIt is a Chrome extension that simplifies complex text on any webpage to make it easier to understand. It works by sending selected text to an AI-powered backend that rewrites the content at a simpler reading level.

## Features

- **Right-click simplification**: Select any text on a webpage and simplify it with a right-click
- **Popup display**: Shows simplified text in a clean, non-intrusive popup
- **Text-to-speech**: Listen to the simplified text with built-in speech synthesis
- **AI-powered**: Uses meta-llama/Llama-3.3-70B-Instruct-Turbo model to create high-quality simplifications
- **Customizable simplification**: Defaults to a "basic" reading level suitable for a 10-year-old reader

## Project Structure
SimplifyIt/
├── backend/             # FastAPI server 
│   ├── .env             # Environment variables (API keys)
│   └── main.py          # Backend implementation
│
└── frontend/            # Chrome extension
    ├── background.js    # Extension background service worker
    ├── content-script.js # Handles DOM manipulation and popup display
    ├── manifest.json    # Extension configuration
    └── popup.html       # Extension popup UI