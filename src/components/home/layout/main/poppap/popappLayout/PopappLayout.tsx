import PopappHeader from "./popapp_header/PopappHeader.tsx";
import PopappMain from "./popapp_main/PopappMain.tsx";
import PopappFooter from "./popapp_footer/PopappFooter.tsx";
import {RxCross1} from "react-icons/rx";
import React from "react";
import {IPopappLayot} from "../../../../../../assets/ts/interface.ts";

const PopappLayout = ({
                          getIsShow,
                          product,
                          discont,
                          delImg,
                          errors,
                          setDelImg,
                          hIC,
                          register,
                          setValue,
                          url,
                          handleSubmit,
                          updateDiscount,
                          validateFileSize,
                          watch,
                          createElement
                      }: IPopappLayot) => (
    <form
        onSubmit={handleSubmit(createElement)}
        onClick={
            (e: React.MouseEvent<HTMLFormElement, MouseEvent>) =>
                e.stopPropagation()
        }
        className={'form'} action="#"
    >
        <RxCross1 onClick={getIsShow} className={'close'}/>
        <div className="wrapper">
            <PopappHeader product={product}/>
            <PopappMain
                discont={discont}
                delImg={delImg}
                errors={errors}
                setDelImg={setDelImg}
                hIC={hIC}
                register={register}
                setValue={setValue}
                url={url}
                updateDiscount={updateDiscount}
                validateFileSize={validateFileSize}
                watch={watch}
            />
            <PopappFooter watch={watch} product={product}/>
        </div>
    </form>
);

export default PopappLayout;