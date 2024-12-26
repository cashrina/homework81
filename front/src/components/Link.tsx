import { useSelector } from "react-redux";
import { UrlCreating } from "./linkSlice.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { useState } from "react";
import { LinkWithShortUrl } from "../types.ts";
import { postOriginalUrl } from "./linkThunk.ts";
import {API_URL} from "../constants.ts";

const Link = () => {
    const dispatch = useAppDispatch();
    const isCreating = useSelector(UrlCreating);
    const [state, setState] = useState<LinkWithShortUrl>({
        shortUrl: '',
        originalUrl: '',
    });

    const [generatedLink, setGeneratedLink] = useState<string | null>(null);

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        const result = await dispatch(postOriginalUrl({ ...state })).unwrap();
        setGeneratedLink(`${API_URL}/${result.shortUrl}`);
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={submitFormHandler} className="mt-3">
            <div className="mb-3">
                <label htmlFor="originalUrl" className="form-label">Аутентичня ссылка</label>
                <textarea
                    required
                    className="form-control"
                    id="originalUrl"
                    name="originalUrl"
                    rows={10}
                    value={state.originalUrl}
                    onChange={inputChangeHandler}
                />
            </div>
            <div className="d-flex flex-column">
                <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center"
                    disabled={isCreating}
                >
                    {isCreating && (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    )}
                    <i className="bi bi-save me-2"></i> Сдеать ссылку короче
                </button>
                <div className="mt-4">
                    Your shortened link:
                </div>
                {generatedLink && (
                    <div className="mt-2">
                        <a href={generatedLink} target="_blank" rel="noopener noreferrer">
                            {generatedLink}
                        </a>
                    </div>
                )}
            </div>
        </form>
    );
};

export default Link;

