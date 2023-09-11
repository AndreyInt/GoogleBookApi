import cls from './selectMenu.module.scss'
import {classNames} from "src/shared/lib/classNames/classNames";
import React from "react";
interface DropDownMenuProps {
    className?: string,
    dropDownElements: string[],
    sortName?: string,
    onChange: React.ChangeEventHandler<HTMLSelectElement>,
}

export const SelectMenu = (props:DropDownMenuProps) => {
    return (
        <div className={cls.container}>
            {props.sortName ? <div className={cls.sortBy}>{props.sortName}</div> : null}
            <div className={classNames(cls.selectWrapper, {}, [props.className])}>
                <select onChange={props.onChange} className={cls.select}>
                    {props.dropDownElements.map(el => <option key={el} value={el}>{el}</option>)}
                </select>
            </div>
        </div>
    );
};