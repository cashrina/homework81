import {Grid, TextField} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import React, {useState} from "react";
import {LinkWithoutId} from "../types.ts";
import {useAppDispatch} from "../../app/hooks.ts";

const Link = () => {
    const dispatch = useAppDispatch();

    const [state, setState] = useState<LinkWithoutId>({
        shortUrl: '',
        originalUrl: '',
    });

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(({...state}));
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Grid container direction="column" mt={3} spacing={2} component="form" onSubmit={submitFormHandler}>
            <Grid item>
                <TextField
                    required
                    multiline
                    minRows={1}
                    label="OriginalUrl"
                    id="originalUrl"
                    name="originalUrl"
                    value={state.originalUrl}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <LoadingButton
                    type="submit"
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >
                    <span>Shorten!</span>
                </LoadingButton>
                <Grid mt={4}>
                    Your link now looks like this:
                </Grid>
                <Grid mt={2}>{state.shortUrl}</Grid>
            </Grid>
        </Grid>
    );
};

export default Link;