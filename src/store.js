import { configureStore} from '@reduxjs/toolkit';
import userSlice from "./features/userSlice";
import appApi from './services/appApi';

//Persist our store (once login even if we refresh the page it won't dissapear it wont tell to login again)
import storage from "redux-persist/lib/storage";
import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
//We use redux thunk to make asyncronous operations 
import thunk from "redux-thunk";

//reducers 
const reducer = combineReducers({
    user: userSlice,
    [appApi.reducerPath]:appApi.reducer,
});

const persistConfig={
    key:'root',
    storage,
    blackList:[appApi.reducerPath],
};

//persist our store 
const persistedReducer= persistReducer(persistConfig,reducer);


//creating the store instance
const store = configureStore({
    reducer:persistedReducer,
    //this allow us to make a syncronous requests
    middleware:[thunk,appApi.middleware],
});

export default store;