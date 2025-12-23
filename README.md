## TMDB Movie


This is a web application built with React and TypeScript that allows users to explore, search, and manage movies and TV shows using The Movie Database (TMDB) API. It provides a rich, TMDB-style interface for discovering new content, viewing detailed information, and personalizing the experience through user accounts.

### Key Features

-   **Discover Content:** Browse movies and TV shows across various categories like Popular, Top Rated, Upcoming, and Now Playing.
-   **Advanced Search:** Perform comprehensive searches for movies, TV shows, people, collections, companies, and keywords.
-   **Detailed Views:** Access in-depth information for each movie or TV show, including cast, crew, reviews, trailers, and similar content recommendations.
-   **Filtering & Sorting:** Refine content lists with powerful filters for genres, release year, user rating, country of origin, and more. Sort results by popularity, rating, or release date.
-   **User Authentication:** Log in with a TMDB account to access personalized features.
-   **Personalization:** Manage your own `Favorites`, `Watchlist`, and `Ratings`. You can also add private notes to any movie or TV show page.
-   **Multi-language Support:** The interface and content are available in multiple languages, including English, Turkish, and Russian.
-   **Responsive Design:** A fully responsive layout that works on desktop, tablet, and mobile devices.

### Tech Stack

-   **Framework:** React
-   **Language:** TypeScript
-   **Build Tool:** Vite
-   **State Management:** Redux Toolkit & RTK Query
-   **UI Library:** Material-UI (MUI) & Emotion
-   **Routing:** React Router
-   **Carousels:** Swiper.js
-   **Linting & Formatting:** ESLint & Prettier
-   **API:** [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api)

### Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm or a compatible package manager
-   A TMDB API key and access token. You can get these by creating an account on the [TMDB website](https://www.themoviedb.org/signup).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/agasefamircan/tmdb_movie.git
    cd tmdb_movie
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your TMDB API credentials. You can copy the structure from `.env.example`:

    ```.env
    VITE_TMDB_TOKEN='your_access_token'
    VITE_TMDB_API_KEY='your_api_key'
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run preview`: Serves the production build locally for previewing.
-   `npm run lint`: Lints the project files using ESLint.
-   `npm run format`: Formats all source files using Prettier.

### Project Structure

The `src` directory contains the core of the application, organized as follows:

```
src/
├── api/          # RTK Query slices for TMDB API interaction
├── app/          # Redux store, slices, providers, and hooks
├── assets/       # Static assets like images
├── components/   # Reusable React components (Cards, Layout, etc.)
├── constants/    # Application-wide constants
├── helper/       # Helper functions
├── hooks/        # Custom React hooks
├── i18n/         # Internationalization and translation files
├── pages/        # Top-level page components corresponding to routes
├── routes/       # React Router configuration
├── styles/       # Shared style definitions
├── theme/        # Material-UI theme customization
├── types/        # TypeScript type definitions
└── utils/        # General utility functions