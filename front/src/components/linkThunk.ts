import {createAsyncThunk} from "@reduxjs/toolkit";
import {LinkId, LinkWithShortUrl} from "../types.ts";
import axiosApi from "../axiosApi.ts";

export const portOriginalUrl = createAsyncThunk<void, LinkWithShortUrl>(
    'original_link/portOriginalUrl', async (original_link, {rejectWithValue}) => {
        try {
            await axiosApi.post('/', original_link);
        } catch (err) {
            console.error('Ошибка в ссылке', err);
            return rejectWithValue(err);
        }
    }
);

export const getShortUrl = createAsyncThunk<LinkId[]>(
    'short_link/getShortUrl', async () => {
        const {data:shorUrl} = await axiosApi.get<LinkId[]>('/');
        return shorUrl;
    }
);