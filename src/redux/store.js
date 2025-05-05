
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './auth/slice'
import contactsReducer from './product/productSlice'

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["token","user"]
}

const productsPersistConfig = {
    key:"products",
    storage,
    whitelist:["items"]
}


const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    products:persistReducer(productsPersistConfig,contactsReducer)
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false
        })
})

export const persistor = persistStore(store)