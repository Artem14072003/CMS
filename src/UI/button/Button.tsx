import style from "./Button.module.scss"
import {IButton} from "../../assets/ts/interface.ts";
import React from "react";

const Button = ({children, isShow, setIsShow, disabled}: IButton) => {

    const popappCreate = () => setIsShow && setIsShow(prev => ({...prev, create: !isShow?.create}))

    return (
        <button
            className={`${style.button} ${isShow?.create ? 'active' : ''}`}
            onClick={popappCreate}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default React.memo(Button);