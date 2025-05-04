
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './auth/slice'

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["token"]
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer)
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false
        })
})

export const persistor = persistStore(store)