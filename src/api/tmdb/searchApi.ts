import type { SearchApiParams } from '../../types/search';
import { tmdbBaseApi } from './tmdbBaseApi';

export const searchApi = tmdbBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearch: builder.query<any, SearchApiParams>({
      query: ({
        type = 'movie',
        currentType = null,
        query = '',
        page = 1,
        language = 'en-US',
        includeAdult = true,
      }) => {
        const finalPage = currentType && currentType !== type ? 1 : page;

        return {
          url: `/search/${type}`,
          params: {
            query,
            page: finalPage,
            include_adult: includeAdult,
            language,
          },
        };
      },
    }),
  }),
});
export const { useGetSearchQuery } = searchApi;
