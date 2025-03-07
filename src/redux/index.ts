import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./api";
import auth from "./features/auth.slice";
import role from "./features/role.slice";
import activeRoute from "./features/active-route.slice";

export const store = configureStore({
  reducer: {
    auth,
    role,
    activeRoute,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
