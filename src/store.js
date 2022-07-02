import { configureStore } from "@reduxjs/toolkit";
import subredditReducer from "./features/subreddit/subredditSlice.js";


export const store = configureStore({
    reducer: { subreddit: subredditReducer }
});