import Welcome from '../../components/Layout/Welcome';
import TrendingSection from '../../components/Shared/TrendingSection';
import MediaCard from '../../components/Cards/MediaCard';
import UpcomingSection from '../../components/Shared/UpcomingSection';
import TopRatedSection from '../../components/Shared/TopRatedSection';
import { usePageTitle } from '../../hooks/usePageTitle';

const HomePage = () => {
  usePageTitle('The Movie Database TMDB');
  return (
    <div>
      <Welcome />
      <TrendingSection title="trending.trendingMovies" type="movie" CardComponent={MediaCard} />
      <UpcomingSection />
      <TrendingSection title="trending.trendingTV" type="tv" CardComponent={MediaCard} />
      <TopRatedSection />
    </div>
  );
};

export default HomePage;
