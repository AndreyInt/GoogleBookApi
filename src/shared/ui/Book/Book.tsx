import cls from './book.module.scss'
import withoutImg from "src/shared/assets/withoutImg.png";
interface BooksProps {
    className?: string,
    description: string,
    author: string[],
    title: string,
    imageLinks: string,
    categories: string[],
}

export const Book = ({className, author, title, imageLinks, categories, description}:BooksProps) => {

    const createMarkup = (): {__html: string | TrustedHTML} =>  {
        return {__html: description}
    }

    return (
        <div className={cls.book}>
            <div className={cls.wrapper}>
                {imageLinks
                    ? <img className={cls.img} alt={'img'} src={imageLinks}/>
                    : <img className={cls.img} alt={'img'} src={withoutImg}/>}
            </div>
            <div className={cls.container}>
                {categories
                    ? <div className={cls.categories}>{categories.map((el, index, {length}) => {
                    if (index + 1 !== length)
                        return `${el}/`
                    return el
                })}</div>
                    : <div className={cls.categories}>Категория не найдена</div>}

                {title
                    ? <div className={cls.title}>{title}</div>
                    : <div className={cls.title}>Название книги не найдено</div>}

                {author
                    ? <div className={cls.author}>{author}</div>
                    : <div className={cls.author}>Авторы книги не указаны</div>}

                {description
                    ? <div className={cls.description} dangerouslySetInnerHTML={createMarkup()}></div>
                    : <div className={cls.description}>Описание книги не указано</div>}
            </div>
        </div>
    );
};