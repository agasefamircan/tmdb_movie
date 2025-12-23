import { Navigate, useParams } from 'react-router-dom';
import ContentListPage from '../Content/ContentListPage';
import { TV_ENDPOINTS } from '../../utils/endpoints';
import { useGetFilteredQuery, useGetGenresQuery } from '../../api/tmdb/moviesApi';
import { useI18n } from '../../app/providers/I18nProvider';
import { getApiLanguage } from '../../helper/getApiLang';

export default function TVShowsPage() {
  const { category } = useParams<{ category: string }>();

  if (!category || !(category in TV_ENDPOINTS)) {
    return <Navigate to="/404" replace />;
  }
  const { language } = useI18n()!;
  const apiLanguage = getApiLanguage(language);

  const fetchDefault = TV_ENDPOINTS[category as keyof typeof TV_ENDPOINTS];

  const titleMap: Record<string, string> = {
    popular: 'Popular TV Shows',
    'airing-today': 'Airing Today',
    'on-the-air': 'On The Air',
    'top-rated': 'Top Rated TV Shows',
  };

  return (
    <ContentListPage
      title={titleMap[category]}
      type="tv"
      fetchDefault={fetchDefault}
      language={apiLanguage}
      fetchFiltered={useGetFilteredQuery}
      fetchGenres={useGetGenresQuery}
    />
  );
}
