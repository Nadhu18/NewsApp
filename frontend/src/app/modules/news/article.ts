export interface Article {
    id: number,//db generated
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string,
    comments: string,
    isWatchlisted: boolean
}