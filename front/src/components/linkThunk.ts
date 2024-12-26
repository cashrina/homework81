import {createAsyncThunk} from "@reduxjs/toolkit";
import {LinkId, LinkWithShortUrl} from "../types.ts";
import axiosApi from "../axiosApi.ts";

export const postOriginalUrl = createAsyncThunk<LinkWithShortUrl, LinkWithShortUrl>(
    'original_link/postOriginalUrl',
    async (original_link, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post('/links', original_link);
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getShortUrl = createAsyncThunk<LinkId[]>(
        'short_link/getShortUrl', async () => {
        const {data:shorUrl} = await axiosApi.get<LinkId[]>('/:shortUrl');
        return shorUrl;
    }
);