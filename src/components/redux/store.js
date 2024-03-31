import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import authSliceReducer from './auth/authSlice';
// import waterSliceReducer from './water/waterSlice';
// import themeSliceReducer from './theme/themeSlice';
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const themePersistConfig = {
  key: 'theme',
  storage,
};

const persistedThemeReducer = persistReducer(themePersistConfig);

// basic reducer
const persistedReducer = persistReducer(authPersistConfig);

//...or more reducers
const rootReducer = combineReducers({
  auth: persistedReducer,
  theme: persistedThemeReducer,
});

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  // для перегляду стейтів
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
