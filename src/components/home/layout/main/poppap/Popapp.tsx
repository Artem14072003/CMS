import {IPopapp} from "../../../../../assets/ts/interface.ts";
import CreatePopapp from "./create-popapp/CreatePopapp.tsx";
import UpdatePopapp from "./update-popapp/UpdatePopapp.tsx";
import CurrectPopapp from "./currect_popapp/CurrectPopapp.tsx";

const Popapp = ({ isShow, setIsShow, product, setProduct }: IPopapp) => {
    return (
        <>
            <CreatePopapp
                isShow={isShow.create}
                setIsShow={setIsShow}
                product={product}
                setProduct={setProduct}
            />
            <UpdatePopapp
                isShow={isShow.upDate}
                setIsShow={setIsShow}
                product={product}
                setProduct={setProduct}
            />
            <CurrectPopapp
                win={isShow.win}
            />
        </>
    );
};

export default Popapp;