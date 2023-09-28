import TableHeader from "./table-header/TableHeader.tsx";
import TableBody from "./table-body/TableBody.tsx";
import {IPagination, IProduct} from "../../../../../assets/ts/interface.ts";
import {UseMutateFunction} from "@tanstack/react-query";
import {AxiosResponse} from "axios";

const Table = ({search, data, pagination, isLoading, fetchDate, mutate}: {
    search: string,
    pagination: IPagination,
    data: IProduct[],
    isLoading: boolean,
    fetchDate: (id: string) => void,
    mutate: UseMutateFunction<AxiosResponse<any, any>, unknown, string, unknown>
}) => {
    return (
        <table className="table">
            <TableHeader/>
            <TableBody
                pagination={pagination}
                mutate={mutate}
                fetchDate={fetchDate}
                data={data}
                isLoading={isLoading}
                search={search}/>
        </table>
    );
};

export default Table;