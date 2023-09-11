import cls from './bookPage.module.scss'
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {BookSchema} from "src/features/search/model/types";
import axios from "axios";
import {__API_KEY__, __BASE_URL__} from "src/shared/constants";
import {Loading} from "src/shared/ui/loading/Loading";
import {Book} from "src/shared/ui/Book/Book";
interface BookPageProps {
    className?: string,
}

export const BookPage = ({className}:BookPageProps) => {

    const {bookId} = useParams();
    const [bookInfo, setBookInfo] = useState<BookSchema>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.get(`${__BASE_URL__}/${bookId}?key=${__API_KEY__}`)
            .then(res => {
                setBookInfo(res.data)
            })
            .finally(() => setIsLoading(true));
    }, [])

    return (
        <div className={cls.bookPage}>
            {isLoading == false
                ? <Loading/>
                : bookInfo.error == null
                    ? <Book author={bookInfo?.volumeInfo?.authors} title={bookInfo?.volumeInfo?.title} imageLinks={bookInfo?.volumeInfo?.imageLinks?.thumbnail}
                            categories={bookInfo?.volumeInfo?.categories} description={bookInfo?.volumeInfo?.description}/>
                    : <div>Ops error: {bookInfo?.error?.message}, {bookInfo?.error?.code}</div>}
        </div>
    );
};