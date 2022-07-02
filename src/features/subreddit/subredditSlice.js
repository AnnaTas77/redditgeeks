import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    subreddits: [],
    isLoading: true,
};


const subredditSlice = createSlice({
    name: 'subreddit',
    initialState,
    reducers: {}
});

export default subredditSlice.reducer;