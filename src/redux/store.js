import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './auth/slice'
import gamesReducer from './games/slice'

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["token", "user"]
}

const gamesPersistConfig = {
    key: "games",
    storage,
    whitelist: ["scores"]
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    games: persistReducer(gamesPersistConfig, gamesReducer)
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false
        })
})

export const persistor = persistStore(store)