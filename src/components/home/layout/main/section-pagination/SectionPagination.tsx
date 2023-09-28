import React, {useEffect, useMemo, useState} from "react"
import {IPagination} from "../../../../../assets/ts/interface.ts";

const SectionPagination = ({setPagination, length}: {
    length: number,
    setPagination: React.Dispatch<React.SetStateAction<IPagination>>
}) => {

    const [controlPag, setControlPag] = useState({
        active: 10,
        start: 1,
        end: length
    })

    const setArrowRight = () => {
        if (controlPag.start === controlPag.end) return
        return setControlPag(prevState => ({
            ...prevState,
            start: controlPag.start + 1
        }))
    }

    const setArrowLeft = () => {
        if (controlPag.start === 1) return
        return setControlPag(prevState => ({
            ...prevState,
            start: controlPag.start - 1
        }))
    }

    useMemo(() =>
            setControlPag(prevState => ({
                ...prevState,
                end: Math.ceil(length / controlPag.active)
            })),
        [length, controlPag.active])

    useEffect(() => {
        if (controlPag.start > controlPag.end)
            setControlPag(prevState => ({
                ...prevState,
                start: controlPag.end
            }))

        controlPag.start >= 2 ?
            setPagination(() => ({
                start: controlPag.active * (controlPag.start - 1),
                end: controlPag.active * (controlPag.start - 1) + controlPag.active
            })) : setPagination(() => ({
                start: 0,
                end: controlPag.active
            }))
    }, [controlPag.active, controlPag.end, controlPag.start, setPagination])

    return (
        <section className="nav">
            <label form="number">Показывать на странице: </label>
            <select
                value={controlPag.active}
                onChange={(e) =>
                    setControlPag(prev => ({
                        ...prev,
                        active: +e.target.value
                    }))
                }
                id="number"
            >
                <option value={10}>10</option>
                <option value={5}>5</option>
                <option value={3}>3</option>
                <option value={1}>1</option>
            </select>
            <p className="tracking">
                <span className="page">{controlPag.start}</span>
                of <span className="pages">{controlPag.end}</span>
            </p>
            <button
                onClick={setArrowLeft}
                disabled={controlPag.start === 1}
            >&lt;</button>
            <button
                onClick={setArrowRight}
                disabled={controlPag.start === controlPag.end}
            >&gt;</button>
        </section>
    );
};

export default SectionPagination;