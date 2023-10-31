import React, {useState} from "react";
import {ICreatePopapp, IProduct} from "../../../../../../assets/ts/interface.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ProductService} from "../../../../../../services/product.service.ts";
import PopappLayout from "../popappLayout/PopappLayout.tsx";

const CreatePopapp = ({isShow, setIsShow}: ICreatePopapp) => {

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
                ProductService.create(data), {
                onSuccess: () => {
                    queryClient.invalidateQueries(['product'])
                    setIsShow(prev => ({...prev, create: !isShow, win: false}))
                    setDelImg(false)
                    reset()
                }
            }
        )

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
            setIsShow(prev => ({...prev, win: true}))
            setTimeout(mutate, 1000, data)
        }

        const getIsShow = () => {
            setTimeout(() => {
                reset()
            }, 300)
            setDiscont(true)
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

        const updateDiscount = () => {
            setDiscont(!discont)
            if (!discont) {
                resetField('discount')
                return setValue('discount', 0)
            }
        }

        return (
            <div onClick={getIsShow} className={`popapp ${isShow ? 'is-visible ' : ''}`}>
                <PopappLayout
                    watch={watch}
                    discont={discont}
                    updateDiscount={updateDiscount}
                    validateFileSize={validateFileSize}
                    register={register}
                    getIsShow={getIsShow}
                    setValue={setValue}
                    setDelImg={setDelImg}
                    delImg={delImg}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    createElement={createElement}
                    hIC={handleImageChange}
                />
            </div>
        );
    }
;
export default CreatePopapp;