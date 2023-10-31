import Button from "../../../../../../../UI/button/Button.tsx";
import Price from "../../../../../../../UI/Price.tsx";
import {IPopappLayotFooter} from "../../../../../../../assets/ts/interface.ts";


const PopappFooter = ({watch, product}: IPopappLayotFooter ) => {
    return (
        <div className="footer">
            <div className="text">
                <p>Итоговая стоимость:
                    <span className="price_result">
                        <Price price={
                            watch('count') * watch('price') -
                            (watch("discount") / 100 * (watch('count') * watch('price')))}
                        />
                    </span>
                </p>
            </div>
            <div className="button">
                <Button>{product ? 'Изменить товар' : 'Добавить товар'}</Button>
            </div>
        </div>
    );
};

export default PopappFooter;