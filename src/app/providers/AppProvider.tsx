import { Provider } from 'react-redux';
import { store } from '../store';
import React from 'react';
import { I18nProvider } from './I18nProvider';
import AppToast from '../../components/common/ToastContainer';
import AccountListsProvider from './AccountListProvider';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <I18nProvider>{children}</I18nProvider>
      <AccountListsProvider />
      <AppToast />
    </Provider>
  );
}
