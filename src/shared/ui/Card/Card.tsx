import {classNames} from "src/shared/lib/classNames/classNames";
import cls from './card.module.scss'
import withoutImg from "src/shared/assets/withoutImg.png"
interface cardProps {
    className?: string,
    author: string[],
    title: string,
    imageLinks: string,
    categories: string[],
}

export const Card = (props :cardProps) => {
    const {className, author, title, imageLinks, categories} = props;
    return (
        <div className={classNames(cls.card)}>
            {imageLinks ? <img className={cls.img} alt={'img'} src={imageLinks}/> : <img className={cls.img} alt={'img'} src={withoutImg}/>}

            {categories ? <div className={cls.categories}>{categories.map((el, index, {length}) => {
                if (index + 1 !== length)
                    return `${el}/`
                return el
            })}</div> : <div className={cls.categories}>Категория не найдена</div>}

            {title ? <div className={cls.title}>{title}</div> : <div className={cls.title}>Название книги не найдено</div>}

            {author ? <div className={cls.author}>{author}</div> : <div className={cls.author}>Авторы книги не указаны</div>}
        </div>
    );
};