import cls from './mainPage.module.scss'
import {useAppSelector} from "src/shared/lib/redux/redux";
import {Card} from "src/shared/ui/Card/Card";
import {Link} from "react-router-dom";
import {Loading} from "src/shared/ui/loading/Loading";

export const MainPage = () => {

    const booksInfo = useAppSelector(state =>  state.bookReducer);

    return (
        <div className={cls.mainPage}>
            {booksInfo.status === 'loading'
                ? <Loading/>
                : (booksInfo.status === 'resolved' && booksInfo.books.length > 0)
                    ? <>
                        <div className={cls.count}>Found {booksInfo.totalItems} results</div>
                        <div className={cls.containerCard}>
                            {booksInfo.books.map(el =>
                                <Link to={`/books/${el.id}`}>
                                    <Card key={el.id} author={el.volumeInfo.authors}
                                          title={el.volumeInfo.title}
                                          imageLinks={el.volumeInfo.imageLinks?.thumbnail}
                                          categories={el.volumeInfo.categories}/>
                                </Link>
                            )}
                        </div>
                     </>
                    : booksInfo.status === null
                        ? null
                        : <div>Ops error :(, please reload the page.</div>}
        </div>
    );
};