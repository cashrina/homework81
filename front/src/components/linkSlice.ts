import {LinkId} from "../types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {getShortUrl, portOriginalUrl} from "./linkThunk.ts";

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
    name: "Link",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(portOriginalUrl.pending, (state) => {
                state.isCreating = true;
            })
            .addCase(portOriginalUrl.fulfilled, (state) => {
                state.isCreating = false;
            })
            .addCase(portOriginalUrl.rejected, (state) => {
                state.isCreating = false
            });

        builder
            .addCase(getShortUrl.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getShortUrl.fulfilled, (state, {payload: linkId}) => {
                state.isFetching = false;
                state.items = linkId;
            });

        },

    selectors: {
        SelectUrl: (state) => state.items,
        UrlCreating: (state) => state.isCreating,
        UrlFetching: (state) => state.isFetching,
    },
});

export const linkReducer = linkSlice.reducer;

export const {
    SelectUrl, UrlCreating, UrlFetching
} = linkSlice.selectors;