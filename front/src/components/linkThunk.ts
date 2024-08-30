import {createAsyncThunk} from "@reduxjs/toolkit";
import {LinkId,  LinkWithShortUrl} from "../types.ts";
import axiosApi from "../../axiosApi.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export const postOriginalUrl = createAsyncThunk<void, LinkWithShortUrl> (
    'original_link/createOriginalUrl', async (original_link, {rejectWithValue}) => {
        try {
            await axiosApi.post('/links', original_link);

        } catch (e) {
            console.error('Error posting original URL:', error);
            return rejectWithValue(e);
        }

    }
);

export const getShortUrl = createAsyncThunk<LinkId[]> (
    'short_link/getShortUrl', async () => {
            const {data: shortUrl} = await axiosApi.get<LinkId[]>('/links');
            return shortUrl;
    }
);