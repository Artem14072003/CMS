import Header from "./header/Header.tsx";
import Main from "./main/Main.tsx";
import {useState} from "react";

const Layot = () => {
    const [totalPrice, setTotalPrice] = useState(0)
    return (
        <>
            <Header totalPrice={totalPrice} />
            <Main setTotalPrice={setTotalPrice} />
        </>
    );
};

export default Layot;