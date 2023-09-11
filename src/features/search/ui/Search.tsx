import cls from './search.module.scss'
import {classNames} from "src/shared/lib/classNames/classNames";
import {ButtonForSearch} from "src/shared/ui/ButtonForSearch/ButtonForSearch";
import {InputSearchBook} from "src/shared/ui/InputSearchBook/InputSearchBook";
import {Categories, Order, QueryData} from "../model/types";
import React, {useEffect, useReducer, useState} from "react";
import {SelectMenu} from "src/shared/ui/SelectMenu/SelectMenu";
import {__CATEGORIES__, __ORDER__} from "src/shared/constants";
import {fetchPaginationSearchBooks, fetchSearchBooks} from "src/features/search/model/booksSlice";
import {useAppDispatch} from "src/shared/lib/redux/redux";
import { useNavigate } from 'react-router-dom';

interface searchProps {
    className?: string
}

const initialState: QueryData = {
    search: '',
    categories: 'all',
    order: 'relevance',
    startIndex: 0,
}

type Action =
    | {type: 'changeSearch', search: string}
    | {type: 'changeCategories', categories: Categories}
    | {type: 'changeOrder', order: Order}
    | {type: 'changeStartIndex', startIndex: number};


function reducerSearchBooks(state: QueryData, action: Action): QueryData  {
    switch (action.type) {
        case 'changeSearch' :
            return {...state ,search: action.search}
        case 'changeCategories':
            return {...state ,categories: action.categories}
        case 'changeOrder':
            return {...state ,order: action.order}
        case 'changeStartIndex':
            return {...state ,startIndex: action.startIndex}
        default:
            throw new Error();
    }
}

export const Search = ({className}:searchProps) => {

    const navigate = useNavigate();
    const [searchIsFocus, setSearchIsFocus] = useState(false);
    const [queryData, dispatch] = useReducer(reducerSearchBooks, initialState);
    const appDispatch = useAppDispatch();
    const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({type: 'changeSearch', search: e.target.value});
    const changeStartIndex = (startIndex: number) => dispatch({type: 'changeStartIndex', startIndex: startIndex + 30});
    const changeCategories = (e: React.ChangeEvent<HTMLSelectElement>) => dispatch({type: 'changeCategories', categories: e.target.value as Categories});
    const changeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => dispatch({type: 'changeOrder', order: e.target.value as Order});
    const [fetch, setFetch] = useState(false);
    const fetchBooks = (e: KeyboardEvent) =>
    {
        if (e.key == 'Enter' && searchIsFocus) {
            navigate('/books');
            appDispatch(fetchSearchBooks(queryData)).finally(() => changeStartIndex(0));
        }
    }

    useEffect( () => {
        document.addEventListener('keypress', fetchBooks)
        return function () {
            document.removeEventListener('keypress', fetchBooks);
        }
    }, [queryData, searchIsFocus])

    useEffect(() => {
        if (fetch) {
            appDispatch(fetchPaginationSearchBooks(queryData)).finally( () => setFetch(false));
            changeStartIndex(queryData.startIndex);
        }
    }, [fetch])

    useEffect( () => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [])

    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetch(true)
        }
    }

    return (
        <header className={cls.search}>
            <h1 className={cls.h1}>Search for books</h1>
            <div className={classNames(cls.container)}>
                <InputSearchBook onBlur={() => setSearchIsFocus(false)} onFocus={ () => setSearchIsFocus(true)} onChange={changeSearch} inputType={'text'} inputPlaceholder={'Введите название книги'} classname={cls.inp}/>
                    <ButtonForSearch onClick={() => {
                        navigate('/books');
                        appDispatch(fetchSearchBooks(queryData)).finally(() => changeStartIndex(0));
                    }} className={cls.btn}/>
            </div>
            <div className={cls.select}>
                <SelectMenu onChange={changeCategories} sortName={'Categories'} dropDownElements={__CATEGORIES__}></SelectMenu>
                <SelectMenu onChange={changeOrder} sortName={'Sorting by'} dropDownElements={__ORDER__}></SelectMenu>
            </div>
        </header>
    );
};