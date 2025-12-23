import { useEffect } from 'react';

export const usePageTitle = (title: string | undefined, defaultTitle = '') => {
  useEffect(() => {
    document.title = title ? `${title}  ${defaultTitle}` : defaultTitle;
  }, [title, defaultTitle]);
};
