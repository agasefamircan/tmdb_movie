import { useSelector } from 'react-redux';
import { useGetRatingsQuery } from '../../api/tmdb/accountApi';
import type { RootState } from '../../app/store';
import AccountMedia from '../../components/Profile/AccountMedia';
import { usePageTitle } from '../../hooks/usePageTitle';

const RatingsPage = () => {
  usePageTitle('Rating');

  const { sessionId, accountId } = useSelector((state: RootState) => state.auth);

  const movie = useGetRatingsQuery({
    accountId: accountId!,
    type: 'movie',
    sessionId: sessionId!,
  });

  const tv = useGetRatingsQuery({
    accountId: accountId!,
    type: 'tv',
    sessionId: sessionId!,
  });

  return <AccountMedia movieData={movie.data} tvData={tv.data} section="ratings" />;
};

export default RatingsPage;
