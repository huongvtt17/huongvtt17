import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/redux';

import { Routes } from './Routes';
import initI18n from './i18n/config';
initI18n();

import { QueryClient, QueryClientProvider } from 'react-query';
import { StatusBarView } from './components/StatusBar';
import firestore from '@react-native-firebase/firestore';
import  { firebase } from '@react-native-firebase/database';

const queryClient = new QueryClient();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


function App() {
 
  return (
    <SafeAreaProvider>
      <StatusBarView theme={'dark-content'} />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;


