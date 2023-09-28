const Filter = () => {
    return (
        <div className={"filter-search"}>
            <input type="number" placeholder={'Цена от'}/>
            <input type="number" placeholder={'Цена до'}/>
        </div>
    );
};

export default Filter;