export interface Link {
    _id: string;
    shortUrl: string;
    originalUrl: string;
}

export interface LinkWithoutId {
    shortUrl: string;
    originalUrl: string;
}