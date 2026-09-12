export interface Author {
    bio?: string;
    name: string;
    quoteCount: number;
}
export interface AuthorListMatch {
    limit?: number;
    page?: number;
}
export interface Category {
    categories?: any[];
    total?: number;
}
export interface CategoryListMatch {
    categories?: any[];
    total?: number;
}
export interface Quote {
    author: string;
    category?: string;
    id: string;
    source?: string;
    text: string;
}
export interface QuoteLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface QuoteListMatch {
    author?: string;
    category?: string;
    limit?: number;
    page?: number;
}
