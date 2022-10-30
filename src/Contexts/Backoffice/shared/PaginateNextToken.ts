export interface PaginateNextToken<T> {
    results: Array<T>;
    nextPageToken: string;
}