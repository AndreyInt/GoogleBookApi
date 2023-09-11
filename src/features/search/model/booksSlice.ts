import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {BooksSchema, QueryData} from "./types";
import axios from "axios";
import {__API_KEY__, __BASE_URL__} from "src/shared/constants";

const initialState: BooksSchema = {
    books: [],
    status: null,
    error: null,
    totalItems: null,
};

export const fetchSearchBooks = createAsyncThunk( // Функция предназанчена именно для нового поиска, не для пагинации
    'fetchSearchBooks',
    async (queryData: QueryData) => {
        if (queryData.categories === 'all')
            queryData.categories = '';
        const response = await axios.get(`${__BASE_URL__}?q=${queryData.search}+subject:${queryData.categories}+inauthor:${queryData.search}&orderBy=${queryData.order}&startIndex=0&maxResults=30&key=${__API_KEY__}`);
        return response.data
    }
)

export const fetchPaginationSearchBooks = createAsyncThunk( // Функция предназанчена именно для нового поиска, не для пагинации
    'fetchPaginationSearchBooks',
    async (queryData: QueryData) => {
        if (queryData.categories === 'all')
            queryData.categories = '';
        const response = await axios.get(`${__BASE_URL__}?q=${queryData.search}+subject:${queryData.categories}+inauthor:${queryData.search}&orderBy=${queryData.order}&startIndex=${queryData.startIndex}&maxResults=30&key=${__API_KEY__}`);
        return response.data
    }
)

export const bookSlice = createSlice({
    name: 'getBooks',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchBooks.pending, (state,action) => {
            state.error = null;
            state.status = 'loading';
        })
        builder.addCase(fetchSearchBooks.fulfilled, (state, action) => {
            state.books = action.payload.items;
            state.totalItems = action.payload.totalItems;
            state.error = null;
            state.status = 'resolved';
        })
        builder.addCase(fetchSearchBooks.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error;
        })

        builder.addCase(fetchPaginationSearchBooks.pending, (state,action) => {
            state.error = null;
        })
        builder.addCase(fetchPaginationSearchBooks.fulfilled, (state, action) => {
            state.books = [...state.books, ...action.payload?.items]
            state.error = null;
            state.status = 'resolved';
        })
        builder.addCase(fetchPaginationSearchBooks.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error;
        })
    }
})
export default bookSlice.reducer