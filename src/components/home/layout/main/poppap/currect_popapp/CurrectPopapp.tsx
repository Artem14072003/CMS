const CurrectPopapp = ({win}: { win: boolean }) => {
    console.log(win)
    return (
        <div className={`block__connected ${win ? "is-visible" : ""}`}>
            <div className="contener">
                <div className="correctly_img"></div>
                <div className="text__result">
                    <h1 className="text">Поля успешно заполненны</h1>
                </div>
            </div>
        </div>
    );
};

export default CurrectPopapp;