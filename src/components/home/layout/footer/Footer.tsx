const Footer = () => {
    return (
        <section className="nav">
            <label form="number">Показывать на странице: </label>
            <select name="" id="number">
                <option value="five">1</option>
                <option value="ten">3</option>
                <option value="fifteen">5</option>
                <option value="twenty">10</option>
            </select>
            <p className="tracking"><span className="page">1</span> of <span className="pages">1</span></p>
            <button>&lt;</button>
            <button>&gt;</button>
        </section>
    );
};

export default Footer;