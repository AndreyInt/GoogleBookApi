import {combineReducers, configureStore} from '@reduxjs/toolkit'
import  bookReducer from 'src/features/search/model/booksSlice'

const rootReducer = combineReducers({
    bookReducer
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
