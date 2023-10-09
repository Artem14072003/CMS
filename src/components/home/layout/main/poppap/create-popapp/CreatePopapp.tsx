import React, {useEffect, useState} from "react";
import {RxCross1} from "react-icons/rx"
import Button from "../../../../../../UI/button/Button.tsx";
import Input from "../../../../../../UI/input/Input.tsx";
import Price from "../../../../../../UI/Price.tsx";
import {ICreatePopapp, IProduct} from "../../../../../../assets/ts/interface.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ProductService} from "../../../../../../services/product.service.ts";
import {RiDeleteBin6Line} from "react-icons/ri"

const url = 'https://gorgeous-mellow-amaryllis.glitch.me/'

const CreatePopapp = ({isShow, setIsShow, product, setProduct}: ICreatePopapp) => {

        const [discont, setDiscont] = useState<boolean>(true)
        const [delImg, setDelImg] = useState<boolean>(false)
        const {
            register,
            watch,
            handleSubmit,
            reset,
            formState: {errors},
            resetField,
            setValue,
        } = useForm<IProduct>({
            mode: 'onChange',
            defaultValues: {
                count: 0,
                price: 0,
                discount: 0,
                image: []
            }
        })

        const queryClient = useQueryClient()

        const {mutate} = useMutation(['create product'], (data: IProduct) =>
                product ? ProductService.update(data, product.id) : ProductService.create(data), {
                onSuccess: () => {
                    queryClient.invalidateQueries(['product'])
                    setIsShow(prev => ({...prev, create: !isShow}))
                    setDelImg(false)
                    reset()
                }
            }
        )

        useEffect(() => {
                if (typeof product === 'undefined') return setDiscont(true)
                setValue('title', product['title'] ?? '')
                setValue('category', product['category'] ?? '')
                setValue('units', product['units'] ?? '')
                setValue('discount', product['discount'] ?? 0)
                setValue('description', product['description'] ?? '')
                setValue('count', product['count'] ?? 0)
                setValue('price', product['price'] ?? 0)
                setValue('image', product.image !== "image/notimage.jpg" ?
                    product.image : [] ?? []);

                product.discount >= 1 && setDiscont(false)
            },
            [product, setValue])

        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
            const file = e.target.files?.[0];
            if (!file) return;
            else if (file.size < 1000000) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event: ProgressEvent<FileReader>) => {
                    const result = event.target?.result;
                    if (!result) return;
                    setValue('image', result);
                };
            }
        };

        const createElement: SubmitHandler<IProduct> = (data: IProduct) => {
            console.log(data);
            mutate(data)
        }

        const getIsShow = () => {
            setTimeout(() => {
                setProduct(undefined)
                reset()
            }, 300)
            return setIsShow(prev => ({...prev, create: !isShow}))
        }

        const validateFileSize = (file: string | ArrayBuffer | FileList | undefined | []) =>
            typeof file === "undefined" || Array.isArray(file) || typeof file === "string" || ArrayBuffer.isView(file)
                ? true
                : file instanceof FileList && file.length === 0
                    ? true
                    : file instanceof FileList && file[0] && file[0].size > 1000000
                        ? "Файл должен быть не более 1 МБ"
                        : true;


        return (
            <div onClick={getIsShow} className={`popapp ${isShow ? 'is-visible ' : ''}`}>
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
                        <div className="module">
                            <h1>{product ? 'Изменить товар' : 'Добавить товар'}</h1>
                            <div className="line"></div>
                        </div>

                        <div className="container">
                            <div className="content">
                                <div className="one-five">
                                    <span className="txt1"> Наименование </span>
                                    <Input register={
                                        register('title', {
                                            required: "Заполните поле",
                                            maxLength: {
                                                value: 100,
                                                message: 'Слишком длинный title'
                                            }
                                        })
                                    } type={'text'}/>
                                    {errors.title && <span className={'error'}>{errors.title.message}</span>}
                                    <span className="txt2"> Категория </span>
                                    <Input register={register('category', {
                                        pattern: {
                                            value: /^[a-zA-ZА-я\s]+$/,
                                            message: "Только буквы"
                                        },
                                        required: "Заполните поле",
                                        maxLength: {
                                            value: 50,
                                            message: 'Слишком длинный'
                                        }
                                    })} type={'text'}/>
                                    {errors.category && <span className={'error'}>{errors.category.message}</span>}
                                    <span className="txt3"> Единицы измерения </span>
                                    <Input register={register('units', {
                                        required: "Заполните поле",
                                        pattern: {
                                            value: /^[a-zA-ZА-я\s]+$/,
                                            message: "Только буквы"
                                        },
                                        maxLength: {
                                            value: 2,
                                            message: 'Слишком длинный'
                                        }
                                    })} type={'text'}/>
                                    {errors.units && <span className={'error'}>{errors.units.message}</span>}
                                    <span className="txt4"> Дисконт </span>
                                    <div className="connection">
                                        <input type="checkbox" className="checkbox" id="check_mark"/>
                                        <label onClick={() => {
                                            setDiscont(!discont)
                                            if (!discont) {
                                                resetField('discount')
                                                return setValue('discount', 0)
                                            }
                                        }}
                                               className={!discont ? 'icons' : ''}></label>
                                        <Input register={register('discount', {
                                            required: 'Обязательное поле',
                                            valueAsNumber: true,
                                            min: {
                                                value: 0,
                                                message: 'Введите скидку от 0'
                                            },
                                            max: {
                                                value: 100,
                                                message: 'Дискон не может превышать 100%'
                                            }
                                        })} type={'number'} width={196}
                                               disabled={discont}/>
                                    </div>
                                    {errors.discount && <span className={'error'}>{errors.discount.message}</span>}
                                </div>
                                <div className="six-nine">
                                    <span className="txt5"> Описание </span>
                                    <textarea {...register("description", {
                                        required: "Обязательное поле!"
                                    })}/>
                                    {errors.description && <span className={'error'}>{errors.description.message}</span>}
                                    <span className="txt6"> Количество </span>
                                    <Input register={register('count', {
                                        valueAsNumber: true,
                                        min: {
                                            value: 1,
                                            message: 'Минимальное количество от 1'
                                        }

                                    })} type={'number'} width={250}/>
                                    {errors.count && <span className={'error'}>{errors.count.message}</span>}
                                    <span className="txt7"> Цена </span>
                                    <Input register={register('price', {
                                        valueAsNumber: true,
                                        min: {
                                            value: 0.1,
                                            message: "Цена от $0.1"
                                        }
                                    })} type={'number'} step={0.1} width={250}/>
                                    {errors.price && <span className={'error'}>{errors.price.message}</span>}
                                </div>
                            </div>

                            <div className={`button_img ${errors.image ? "error" : ''}`}>
                                {errors.image && <p className={'error'}>{errors.image.message}</p>}
                                <label className="input__file-button">
                                <span
                                    className="input__file-button-text"
                                >
                                    Добавить изображение
                                </span>
                                    <input
                                        type="file"
                                        {...register('image', {
                                            validate: validateFileSize,
                                            onChange: (e) => handleImageChange(e),
                                        })}
                                        className={'hidden'}
                                        accept={"image/*, .png, .jpg, .gif, .web"}
                                    />
                                </label>
                            </div>
                            {typeof watch('image') === "string" && typeof errors.image === "undefined" ?
                                <div className={'image'}>
                                    <div
                                        onMouseEnter={() => setDelImg(true)}
                                        onMouseLeave={() => setDelImg(false)}
                                        className={`wrapper ${delImg ? 'dark' : ''}`}
                                    >
                                        {delImg &&
                                            <RiDeleteBin6Line
                                                className={'del'}
                                                onClick={() => {
                                                    setValue('image', [])
                                                    setDelImg(false)
                                                }}
                                            />
                                        }
                                        <img
                                            src={`${watch("image")}`.slice(0, 6).includes('image/') ?
                                                `${url + watch("image")}` :
                                                `${watch("image")}`} alt={'img'}/>
                                    </div>
                                </div>
                                : <></>}
                        </div>
                        <div className="footer">
                            <div className="text">
                                <p>Итоговая стоимость: <span className="price_result">
                                <Price price={
                                    watch('count') * watch('price') -
                                    (watch("discount") / 100 * (watch('count') * watch('price')))}/>
                            </span></p>
                            </div>
                            <div className="button">
                                <Button>{product ? 'Изменить товар' : 'Добавить товар'}</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
;
export default CreatePopapp;