import Input from "../../../../../../../UI/input/Input.tsx";
import {category, count, description, discount, price, title, units} from "../../option_popapp/option.ts";
import {RiDeleteBin6Line} from "react-icons/ri";
import {IPopappLayotMain} from "../../../../../../../assets/ts/interface.ts";

const PopappMain = ({
                        register,
                        errors,
                        discont,
                        updateDiscount,
                        validateFileSize,
                        hIC,
                        watch,
                        setDelImg,
                        delImg,
                        setValue,
                        url
                    }: IPopappLayotMain) => {
    return (
        <div className="container">
            <div className="content">
                <div className="one-five">
                    <span className="txt1"> Наименование </span>
                    <Input register={
                        register('title', title)
                    } type={'text'}/>
                    {errors.title && <span className={'error'}>{errors.title.message}</span>}

                    <span className="txt2"> Категория </span>
                    <Input
                        register={register('category', category)}
                        type={'text'}
                    />
                    {errors.category && <span className={'error'}>{errors.category.message}</span>}

                    <span className="txt3"> Единицы измерения </span>
                    <Input register={register('units', units)} type={'text'}/>
                    {errors.units && <span className={'error'}>{errors.units.message}</span>}

                    <span className="txt4"> Дисконт </span>
                    <div className="connection">
                        <input type="checkbox" className="checkbox" id="check_mark"/>
                        <label
                            onClick={updateDiscount}
                            className={!discont ? 'icons' : ''}
                        ></label>
                        <Input register={register('discount', discount)} type={'number'} width={196}
                               disabled={discont}/>
                    </div>
                    {errors.discount && <span className={'error'}>{errors.discount.message}</span>}
                </div>
                <div className="six-nine">
                    <span className="txt5"> Описание </span>
                    <textarea {...register("description", description)}/>
                    {errors.description && <span className={'error'}>{errors.description.message}</span>}
                    <span className="txt6"> Количество </span>
                    <Input register={register('count', count)} type={'number'} width={250}/>
                    {errors.count && <span className={'error'}>{errors.count.message}</span>}
                    <span className="txt7"> Цена </span>
                    <Input register={register('price', price)} type={'number'} step={0.1} width={250}/>
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
                            onChange: (e) => hIC(e),
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
                                `${url ? url + watch("image"): ""}` :
                                `${watch("image")}`} alt={'img'}/>
                    </div>
                </div>
                : <></>}
        </div>
    );
};

export default PopappMain;