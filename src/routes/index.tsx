import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layout
import MainLayout from '../components/Layout/MainLayout';

// Pages
import HomePage from '../pages/Home/HomePage';
import MoviesPage from '../pages/Movies/MoviesPage';
import TVShowsPage from '../pages/TV/TVShowsPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

// Search Pages
import SearchPage from '../pages/Search/SearchPage';
import Movies from '../pages/Search/Movies';
import TV from '../pages/Search/TV';
import Person from '../pages/Search/Person';
import Company from '../pages/Search/Company';
import Collection from '../pages/Search/Collection';
import Keyword from '../pages/Search/Keyword';
import DetailsPage from '../pages/Details/DetailsPage';
import GenrePage from '../pages/Genre/GenrePage';
import LoginPage from '../pages/Auth/LoginPage';
import AuthCallback from '../pages/Auth/AuthCallback';
import ProfilePage from '../pages/Profile/ProfilePage';
import FavoritesPage from '../pages/Profile/FavoritePage';
import WatchlistPage from '../pages/Profile/WatchlistPage';
import RatingsPage from '../pages/Profile/RatingsPage';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Home
      { index: true, element: <HomePage /> },
      // Movies
      { path: '/movies/:category', element: <MoviesPage /> },

      // TV
      { path: '/tvs/:category', element: <TVShowsPage /> },

      // Details page (generic)
      { path: ':type/:id', element: <DetailsPage /> },

      // Genres page
      { path: '/genre/:genreId/:type', element: <GenrePage /> },

      // Login sections
      { path: '/auth/callback', element: <AuthCallback /> },
      { path: '/login', element: <LoginPage /> },

      // Profile page
      {
        path: '/profile',
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
        children: [
          { index: true, element: <Navigate to="favorites" /> },
          { path: 'favorites', element: <FavoritesPage /> },
          { path: 'watchlist', element: <WatchlistPage /> },
          { path: 'ratings', element: <RatingsPage /> },
        ],
      },

      // Search section
      {
        path: 'search',
        element: <SearchPage />,
        children: [
          { index: true, element: <Movies /> },
          { path: 'movie', element: <Movies /> },
          { path: 'tv', element: <TV /> },
          { path: 'person', element: <Person /> },
          { path: 'company', element: <Company /> },
          { path: 'collection', element: <Collection /> },
          { path: 'keyword', element: <Keyword /> },
        ],
      },

      // 404
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
