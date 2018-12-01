import { Article} from './article';

export interface NewsApiModel {
    totalResults: number,
    articles: Article[]
}