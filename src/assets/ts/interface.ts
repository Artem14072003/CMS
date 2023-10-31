import React from "react";
import {UseMutateFunction} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch} from "react-hook-form";

export interface IShow {
    filter: boolean,
    create: boolean,
    upDate: boolean,
    error: boolean,
    win: boolean
}

export interface IControlPanel {
    isShow: IShow,
    setIsShow: React.Dispatch<React.SetStateAction<IShow>>,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export interface IPopapp {
    isShow: IShow
    setIsShow: React.Dispatch<React.SetStateAction<IShow>>
    product: IProduct | undefined
    setProduct: React.Dispatch<React.SetStateAction<IProduct | undefined>>
}

export interface ICreatePopapp {
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<{
        filter: boolean, create: boolean, upDate: boolean, error: boolean, win: boolean
    }>>
    product: IProduct | undefined
    setProduct: React.Dispatch<React.SetStateAction<IProduct | undefined>>
}

export interface IButton {
    children: string,
    isShow?: IShow
    setIsShow?: React.Dispatch<React.SetStateAction<IShow>>
    disabled?: boolean | undefined
}

export interface Iinput {
    type: string,
    register?: unknown,
    className?: string,
    placeholder?: string,
    width?: number,
    height?: number,
    step?: number
    disabled?: boolean
}

export interface IProduct {
    category: string,
    count: number,
    description?: string,
    discount: number,
    id: string,
    image?: FileList | string | ArrayBuffer | [],
    price: number,
    title: string,
    units: string
}

export interface ITrContact extends IProduct {
    fetchDate: (id: string) => void,
    mutate: UseMutateFunction<AxiosResponse<any, any>, unknown, string, unknown>
}

export interface IPagination {
    start: number,
    end: number
}

export interface IPopappLayot{
    getIsShow: () => void,
    product?: IProduct | undefined,
    discont: boolean,
    delImg: boolean,
    errors: FieldErrors<IProduct>,
    setDelImg: React.Dispatch<React.SetStateAction<boolean>>,
    hIC: (e: React.ChangeEvent<HTMLInputElement>) => void,
    register: UseFormRegister<IProduct>,
    setValue: UseFormSetValue<IProduct>,
    url?: string,
    handleSubmit: UseFormHandleSubmit<IProduct, undefined>,
    updateDiscount: () => void,
    validateFileSize: (file: string | ArrayBuffer | FileList | [] | undefined) =>
        "Файл должен быть не более 1 МБ" | true,
    watch: UseFormWatch<IProduct>,
    createElement: (data: IProduct) => void
}

export interface IPopappLayotMain extends Pick<IPopappLayot,
    "register" | "errors" | "discont" | "updateDiscount" | "validateFileSize" |
        "hIC" | "watch" | "setDelImg" | "delImg" | "setValue" | "url"> { }

export interface IPopappLayotFooter extends Pick<IPopappLayot, "watch" | "product"> { }