import {classNames} from "src/shared/lib/classNames/classNames";
import cls from './inputSearchBook.module.scss'
import React from "react";


interface InputProps {
    classname?: string,
    inputType: string,
    inputPlaceholder: string,
    max?: string,
    min?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onFocus?: React.FocusEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>,
    minLength?: number,
    maxLength?: number,
}

export const InputSearchBook: React.FC<InputProps> = (props) => {
    return (
            <input type={props.inputType} placeholder={props.inputPlaceholder}
                   className={classNames(cls.input)}
                   onChange={props.onChange}
                   minLength={props.minLength}
                   maxLength={props.maxLength}
                   onFocus={props.onFocus}
                   onBlur={props.onBlur}>
            </input>
    );
};