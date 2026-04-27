export interface Country {
    id: number;
    name: string;
    continent: string;
}

export interface Author {
    id: number;
    name: string;
    surname: string;
    country?: Country;
}

export interface Book {
    id: number;
    title: string;
    availableCopies: number;
    category?: string;
    author?: Author;
}