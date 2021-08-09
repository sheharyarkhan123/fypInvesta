import {combineReducers } from 'redux';
import authReducer from './authReducer';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
    key: 'root',
    storage,
    whitelist:['products']
  }

const rootReducer = combineReducers({
    auth: authReducer
})
   
const persistedReducer = persistReducer(persistConfig, rootReducer)
   

export default persistedReducer;