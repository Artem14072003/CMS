import TrContact from "./tr-contact/TrContact.tsx";
import {IPagination, IProduct} from "../../../../../../assets/ts/interface.ts";
import {UseMutateFunction} from "@tanstack/react-query";
import {AxiosResponse} from "axios";

const TableBody = ({search, data, pagination, isLoading, fetchDate, mutate}: {
        search: string,
        data: IProduct[],
        pagination: IPagination,
        isLoading: boolean,
        fetchDate: (id: string) => void,
        mutate: UseMutateFunction<AxiosResponse<any, any>, unknown, string, unknown>
    }) => {
        return (
            <tbody>
            {!isLoading ?
                data ?
                    data
                        .filter(e =>
                            e.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                            e.category.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                        )
                        .slice(pagination.start, pagination.end)
                        .map(product =>
                            <TrContact
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                category={product.category}
                                count={product.count}
                                discount={product.discount}
                                price={product.price}
                                units={product.units}
                                fetchDate={fetchDate}
                                mutate={mutate}
                            />
                        )
                    : (
                        <tr>
                            <td>Товара нету!</td>
                        </tr>
                    )
                : <tr>
                    <td>Загрузка...</td>
                </tr>
            }
            </tbody>
        )
            ;
    }
;

export default TableBody;