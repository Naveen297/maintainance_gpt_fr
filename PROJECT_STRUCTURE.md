# Project Structure

This document outlines the structure and organization of the Maintenance GPT Frontend application.

## Overview

The project follows industry-standard React application structure with clear separation of concerns.

## Directory Structure

```
src/
├── assets/              # Static assets (images, icons, animations)
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Sidebar.jsx
│   ├── MessageArea.jsx
│   ├── InputArea.jsx
│   ├── SourceCard.jsx
│   └── index.js        # Component exports
├── pages/              # Page-level components
│   ├── LoginPage.jsx
│   ├── ChatbotSceen.jsx
│   └── index.js        # Page exports
├── services/           # API calls and external services
│   ├── api.js         # Search and source API functions
│   └── index.js       # Service exports
├── constants/          # Application constants and configuration
│   └── config.js      # API base URL and other configs
├── utils/              # Utility functions and helpers
├── fonts/              # Custom font files
├── styles/             # Global styles and CSS files
├── App.jsx            # Main application component
├── App.css            # App-level styles
├── index.css          # Global styles
└── main.jsx           # Application entry point
```

## Folder Descriptions

### `/components`
Contains reusable UI components that can be used across different pages:
- **Header**: Navigation and user menu
- **Footer**: Application footer
- **Sidebar**: Document viewer sidebar
- **MessageArea**: Chat message display
- **InputArea**: User input and controls
- **SourceCard**: Source reference display card

### `/pages`
Contains page-level components that represent different routes/screens:
- **LoginPage**: User authentication page
- **ChatbotScreen**: Main chat interface

### `/services`
Contains API service functions and external integrations:
- **api.js**: Search and document image retrieval APIs

### `/constants`
Contains application-wide constants and configuration:
- **config.js**: API base URL and environment configs

### `/utils`
Reserved for utility functions and helper methods (to be added as needed)

### `/assets`
Contains static files like images, logos, and animations

### `/fonts`
Contains custom font files used throughout the application

### `/styles`
Contains global CSS and styling files

## Import Conventions

### Component Imports
```javascript
// Named imports from index
import { Header, Footer, MessageArea } from '../components';

// Direct imports
import Header from '../components/Header';
```

### Service Imports
```javascript
import { searchAPI, sourceAPI } from '../services/api';
```

### Configuration Imports
```javascript
import { API_BASE_URL } from '../constants/config';
```

## Naming Conventions

- **Components**: PascalCase (e.g., `Header.jsx`, `MessageArea.jsx`)
- **Services**: camelCase (e.g., `api.js`)
- **Constants**: camelCase files, UPPER_SNAKE_CASE for values
- **Folders**: lowercase (e.g., `components`, `services`)

## Key Features

- **Modular Architecture**: Clear separation between components, pages, and services
- **Centralized Configuration**: All configs in `/constants` folder
- **Reusable Components**: UI components designed for reusability
- **Clean Imports**: Index files for cleaner import statements
- **Scalable Structure**: Easy to add new features and functionality

## Technology Stack

- **React 18.3.1**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Axios**: HTTP client

## Build and Development

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## Future Enhancements

The structure supports easy addition of:
- Custom React hooks in `/hooks` folder
- Redux/Context for state management
- Additional utility functions in `/utils`
- More complex routing with React Router
- Testing files alongside components
