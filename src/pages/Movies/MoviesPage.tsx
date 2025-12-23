import { Navigate, useParams } from 'react-router-dom';
import { useGetFilteredQuery, useGetGenresQuery } from '../../api/tmdb/moviesApi';
import { MOVIE_ENDPOINTS } from '../../utils/endpoints';
import ContentListPage from '../Content/ContentListPage';
import { useI18n } from '../../app/providers/I18nProvider';
import { getApiLanguage } from '../../helper/getApiLang';

export default function MoviesPage() {
  const { category } = useParams<{ category: string }>();

  if (!category || !(category in MOVIE_ENDPOINTS)) {
    return <Navigate to="/404" replace />;
  }

  const { language } = useI18n()!;
  const apiLanguage = getApiLanguage(language);

  const fetchDefault = MOVIE_ENDPOINTS[category as keyof typeof MOVIE_ENDPOINTS];

  const titleMap: Record<string, string> = {
    popular: 'Popular Movies',
    'top-rated': 'Top Rated Movies',
    upcoming: 'Upcoming Movies',
    'now-playing': 'Now Playing Movies',
  };
  return (
    <ContentListPage
      title={titleMap[category]}
      type="movie"
      fetchDefault={fetchDefault}
      fetchFiltered={useGetFilteredQuery}
      fetchGenres={useGetGenresQuery}
      language={apiLanguage}
    />
  );
}
