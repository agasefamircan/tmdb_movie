import { useDispatch, useSelector } from 'react-redux';
import { useGetWatchlistQuery } from '../../api/tmdb/accountApi';
import type { RootState } from '../../app/store';
import AccountMedia from '../../components/Profile/AccountMedia';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useEffect } from 'react';
import { setWatchlist } from '../../app/authSlice';
import type { MediaItem } from '../../types/common';

const WatchlistPage = () => {
  usePageTitle('Watchlist');

  const { sessionId, accountId } = useSelector((state: RootState) => state.auth);

  const movie = useGetWatchlistQuery({
    accountId: accountId!,
    type: 'movie',
    sessionId: sessionId!,
  });

  const tv = useGetWatchlistQuery({
    accountId: accountId!,
    type: 'tv',
    sessionId: sessionId!,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (movie.data || tv.data) {
      dispatch(
        setWatchlist({
          movie: movie.data?.results.map((m: MediaItem) => m.id) || [],
          tv: tv.data?.results.map((t: MediaItem) => t.id) || [],
        })
      );
    }
  }, [movie.data, tv.data, dispatch]);

  return <AccountMedia movieData={movie.data} tvData={tv.data} section="watchlist" />;
};

export default WatchlistPage;
