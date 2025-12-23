import { useDispatch, useSelector } from 'react-redux';
import { useGetFavoritesQuery } from '../../api/tmdb/accountApi';
import type { RootState } from '../../app/store';
import AccountMedia from '../../components/Profile/AccountMedia';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useEffect } from 'react';
import { setFavorites } from '../../app/authSlice';

const FavoritesPage = () => {
  usePageTitle('Favorites');
  const { sessionId, accountId } = useSelector((state: RootState) => state.auth);

  const movie = useGetFavoritesQuery({
    accountId: accountId!,
    type: 'movie',
    sessionId: sessionId!,
  });

  const tv = useGetFavoritesQuery({
    accountId: accountId!,
    type: 'tv',
    sessionId: sessionId!,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (movie.data || tv.data) {
      dispatch(
        setFavorites({
          movie: movie.data?.results.map((m: any) => m.id) || [],
          tv: tv.data?.results.map((t: any) => t.id) || [],
        })
      );
    }
  }, [movie.data, tv.data, dispatch]);

  return <AccountMedia movieData={movie.data} tvData={tv.data} section="favorites" />;
};

export default FavoritesPage;
