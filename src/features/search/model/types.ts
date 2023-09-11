import {SerializedError} from "@reduxjs/toolkit";

export interface BooksSchema {
    books: Book[],
    totalItems: number,
    status: 'loading' | 'resolved' | 'rejected',
    error: SerializedError,
}

export interface BookSchema {
    volumeInfo: VolumeInfo,
    error: SerializedError,
}

export interface BooksSchema {
    books: Book[],
    totalItems: number,
    status: 'loading' | 'resolved' | 'rejected',
    error: SerializedError,
    categories?: Categories
}

interface Book {
    volumeInfo: VolumeInfo
    id: string,
}

export interface VolumeInfo {
    authors: string[],
    title: string,
    description: string,
    imageLinks: ImageLinks,
    categories: string[],
}

export interface QueryData {
    startIndex: number,
    search: string,
    order: Order,
    categories: Categories,
}

export type Categories = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry' | '';
export type Order = 'relevance' | 'newest';

export interface ImageLinks {
    smallThumbnail: string,
    thumbnail: string,
    medium?: string,
}