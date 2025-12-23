import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import {
  useGetFavoritesQuery,
  useGetRatingsQuery,
  useGetWatchlistQuery,
} from '../../api/tmdb/accountApi';
import { setFavorites, setRatings, setWatchlist } from '../authSlice';

const AccountListsProvider = () => {
  const dispatch = useDispatch();
  const { sessionId, accountId } = useSelector((state: RootState) => state.auth);

  const enabled = Boolean(sessionId && accountId);

  const { data: favMovies } = useGetFavoritesQuery(
    { accountId: accountId!, sessionId: sessionId!, type: 'movie' },
    { skip: !enabled }
  );

  const { data: watchMovies } = useGetWatchlistQuery(
    { accountId: accountId!, sessionId: sessionId!, type: 'movie' },
    { skip: !enabled }
  );

  const { data: ratedMovies } = useGetRatingsQuery(
    { accountId: accountId!, sessionId: sessionId!, type: 'movie' },
    { skip: !enabled }
  );

  useEffect(() => {
    if (favMovies) dispatch(setFavorites(favMovies.results.map((m: any) => m.id)));
  }, [favMovies]);

  useEffect(() => {
    if (watchMovies) dispatch(setWatchlist(watchMovies.results.map((m: any) => m.id)));
  }, [watchMovies]);

  useEffect(() => {
    if (ratedMovies) {
      const map: Record<number, number> = {};
      ratedMovies.results.forEach((m: any) => {
        map[m.id] = m.rating;
      });
      dispatch(setRatings(map));
    }
  }, [ratedMovies]);

  return null;
};

export default AccountListsProvider;
