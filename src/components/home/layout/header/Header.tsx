import Logo from "../../../../UI/Logo.tsx";
import Price from "../../../../UI/Price.tsx";

const Header = ({totalPrice}: {totalPrice : number}) => {

    return (
        <header className={'header'}>
            <Logo/>

            <p className="result">
                Итоговая стоймость:
                <span className="price">
                    <Price price={totalPrice} />
                </span>
            </p>
        </header>
    );
};

export default Header;