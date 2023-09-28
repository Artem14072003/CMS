import Button from "../../../../../UI/button/Button.tsx";
import {IControlPanel} from "../../../../../assets/ts/interface.ts";
import Filter from "./filter/Filter.tsx";

const ControlPanel = ({setIsShow, isShow, setSearch}: IControlPanel) => {

    const isShowFilter = () => setIsShow(prev => ({...prev, filter: !isShow.filter}));

    return (
        <div className={'control-panel'}>
            <div className="search-panel">
                <button onClick={isShowFilter} type="button" className="filter">Фильтр</button>
                {isShow.filter && <Filter />}
                <div className="search">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        className="search"
                        placeholder="Поиск по наименованию и категории"
                    />
                </div>
            </div>

            <Button
                isShow={isShow}
                setIsShow={setIsShow}
            >Добавить товар</Button>

        </div>
    );
};

export default ControlPanel;