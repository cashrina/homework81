import {createAsyncThunk} from "@reduxjs/toolkit";
import {LinkId, LinkWithoutId} from "../types.ts";
import axiosApi from "../../axiosApi.ts";

export const postOriginalUrl = createAsyncThunk<void, LinkWithoutId> (
    'original_link/createOriginalUrl', async (original_link) => {
        await axiosApi.post('/link', original_link);
    }
);

export const getShortUrl = createAsyncThunk<LinkId[]> (
    'short_link/getShortUrl', async () => {
            const {data: shortUrl} = await axiosApi.get<LinkId[]>('/link');
            return shortUrl;
    }
);