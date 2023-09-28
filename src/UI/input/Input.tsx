import {Iinput} from "../../assets/ts/interface.ts";
import style from "./Input.module.scss"

const Input = ({type, register, step = 1, disabled, placeholder, className, width = 246, height = 38}: Iinput) => {

    return (
        <>
            {register ? (
                <input
                    type={type}
                    className={`${style.input} ${className ?? ''}`}
                    placeholder={placeholder}
                    {...register}
                    style={{
                        width: `${width}px`,
                        height: `${height}px`
                    }}
                    step={step}
                    disabled={disabled && disabled}
                />
            ) : (
                <input
                    type={type}
                    className={`${style.input} ${className ?? ''}`}
                    style={{
                        width: `${width}px`,
                        height: `${height}px`
                    }}
                    disabled={disabled && disabled}
                    placeholder={placeholder ?? ''}
                />
            )}

        </>
    );
};

export default Input;