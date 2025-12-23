import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Container } from '@mui/material';

import {
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetMovieReviewsQuery,
  useGetSimilarMoviesQuery,
  useGetVideosQuery,
} from '../../api/tmdb/moviesApi';

import {
  useGetTvDetailsQuery,
  useGetTvCreditsQuery,
  useGetTvReviewsQuery,
  useGetSimilarTvQuery,
  useGetTvVideosQuery,
} from '../../api/tmdb/tvApi';
import HeroSection from './Sections/HeroSection';
import ActionBar from './Sections/ActionBar';
import InfoSection from './Sections/InfoSection';
import CastSection from './Sections/CastSection';
import ReviewsSection from './Sections/ReviewSection';
import NotesSection from './Sections/NotesSection';
import CrewSection from './Sections/CrewSection';
import VideosSection from './Sections/VideoSection';
import SimilarSection from './Sections/SimilarSection';
import { useI18n } from '../../app/providers/I18nProvider';
import { getApiLanguage } from '../../helper/getApiLang';

const DetailsPage = () => {
  const { type, id } = useParams<{ type: 'movie' | 'tv'; id: string }>();
  const contentId = Number(id);

  const isMovie = type === 'movie';

  const { language } = useI18n()!;
  const apiLanguage = getApiLanguage(language);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  const detailsQuery = isMovie
    ? useGetMovieDetailsQuery({
        id: contentId,
        language: apiLanguage,
      })
    : useGetTvDetailsQuery(contentId);

  const creditsQuery = isMovie
    ? useGetMovieCreditsQuery(contentId)
    : useGetTvCreditsQuery(contentId);

  const reviewsQuery = isMovie
    ? useGetMovieReviewsQuery(contentId)
    : useGetTvReviewsQuery(contentId);

  const similarQuery = isMovie
    ? useGetSimilarMoviesQuery(contentId)
    : useGetSimilarTvQuery(contentId);

  const videosQuery = isMovie ? useGetVideosQuery(contentId) : useGetTvVideosQuery(contentId);

  if (detailsQuery.isLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (!detailsQuery.data) return null;

  const data = detailsQuery.data;

  return (
    <Box>
      <HeroSection data={data} type={type!} />
      <Container maxWidth="lg">
        <CrewSection crew={creditsQuery.data?.crew || []} />
        <ActionBar id={contentId} type={type!} />

        <InfoSection data={data} type={type!} />

        <CastSection cast={creditsQuery.data?.cast || []} />

        <ReviewsSection reviews={reviewsQuery.data?.results || []} />
        <NotesSection id={contentId} type={type!} />

        <VideosSection videos={videosQuery.data?.results || []} />

        <SimilarSection data={similarQuery.data?.results || []} type={type!} />
      </Container>
    </Box>
  );
};

export default DetailsPage;
