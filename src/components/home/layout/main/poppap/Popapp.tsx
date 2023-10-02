import {IPopapp} from "../../../../../assets/ts/interface.ts";
import CreatePopapp from "./create-popapp/CreatePopapp.tsx";

const Popapp = ({ isShow, setIsShow, product, setProduct }: IPopapp) => {
    return (
        <>
            <CreatePopapp
                isShow={isShow.create}
                setIsShow={setIsShow}
                product={product}
                setProduct={setProduct}
            />
        </>
    );
};

export default Popapp;