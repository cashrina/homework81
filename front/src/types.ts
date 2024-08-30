export interface LinkId {
    _id: string;
    shortUrl: string;
    originalUrl: string;
}

export interface LinkWithShortUrl {
    shortUrl: string;
    originalUrl: string;
}