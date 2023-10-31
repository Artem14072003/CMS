import {IProduct} from "../../../../../../../assets/ts/interface.ts";

const PopappHeader = ({product}: {product: IProduct | undefined}) => {
    return (
        <>
            <div className="module">
                <h1>{product ? 'Изменить товар' : 'Добавить товар'}</h1>
                <div className="line"></div>
            </div>
        </>
    );
};

export default PopappHeader;