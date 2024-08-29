import {LinkId} from "../types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {getShortUrl, postOriginalUrl} from "./linkThunk.ts";

export interface LinkState {
    items: LinkId[];
    url: LinkId | null;
    isCreating: boolean;
    isFetching: boolean;
}

const initialState: LinkState = {
    items: [],
    url: null,
    isCreating: false,
    isFetching: false,
};

export const linkSlice = createSlice({
    name: "link",
    initialState,
    reducers: {},
    extraReducers: (builder) =>  {
        builder
            .addCase(postOriginalUrl.pending, (state) => {
                state.isCreating = true;
            })
            .addCase(postOriginalUrl.fulfilled, (state) => {
                state.isCreating = false;
            })
            .addCase(postOriginalUrl.rejected, (state) => {
                state.isCreating = false;
            });

        builder
            .addCase(getShortUrl.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getShortUrl.fulfilled, (state, {payload: linkId}) => {
                state.isFetching = false;
                state.items = linkId;
            })
            .addCase(getShortUrl.rejected, (state) => {
                state.isFetching = false;
            });
    },

    selectors: {
        selectUrl: (state) => state.items,
        UrlCreating: (state) => state.isCreating,
        UrlFetching: (state) => state.isFetching,
    },
});

export const linkReducer = linkSlice.reducer;

export const {
    selectUrl, UrlCreating, UrlFetching
} = linkSlice.selectors;