import {classNames} from "src/shared/lib/classNames/classNames";
import cls from './buttonForSearch.module.scss'
import searchImage from '../../assets/search.png';
interface ButtonForSearchProps {
    className?: string,
    onClick?: () => void,
}

export const ButtonForSearch = (props:ButtonForSearchProps) => {
    return (
        <img onClick={props.onClick} alt={'Search'} src={searchImage} className={classNames(cls.buttonForSearch, {}, [props.className])}/>
    );
};