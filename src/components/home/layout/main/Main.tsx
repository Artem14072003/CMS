import ControlPanel from "./control-panel/ControlPanel.tsx";
import React, {useCallback, useEffect, useState} from "react";
import Table from "./table/Table.tsx";
import SectionPagination from "./section-pagination/SectionPagination.tsx";
import {ProductService} from "../../../../services/product.service.ts";
import {QueryClient, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {IPagination, IProduct} from "../../../../assets/ts/interface.ts";
import Popapp from "./poppap/Popapp.tsx";

const Main = ({setTotalPrice}: { setTotalPrice: React.Dispatch<React.SetStateAction<number>> }) => {

    const {data, isLoading} = useQuery(['product'], () => ProductService.getAll())

    const [product, setProduct] = useState<IProduct | undefined>()

    const [isShow, setIsShow] = useState({
        filter: false,
        create: false,
        upDate: false,
        error: false,
        win: false
    })

    const [pagination, setPagination] = useState<IPagination>({
        start: 0,
        end: 10
    })

    const queryClient: QueryClient = useQueryClient()

    const {mutate} = useMutation(['dell product'], (id: string) =>
            ProductService.delete(id), {
            onSuccess: () => {
                queryClient.invalidateQueries(['product'])
            }
        }
    )

    useEffect(() => {
        if (typeof data === "undefined") return
        setTotalPrice(data.map((i: IProduct) => {
            return i.discount === 0 ? i.price * i.count :
                (i.price - ((i.discount / 100) * i.price)) * i.count
        }).reduce((acc: number, i: number): number => acc + i))
    }, [data])

    const fetchDate = useCallback((id: string) => {
        const responseDate = async () => {
            const response = await ProductService.getById(id)
            setIsShow(prevState => ({...prevState, create: true}))
            setProduct(response)
        }

        responseDate()
    }, [])

    const [search, setSearch] = useState<string>('')

    return (
        <main className={'main'}>
            <ControlPanel setSearch={setSearch} isShow={isShow} setIsShow={setIsShow}/>
            <Table pagination={pagination} data={data} mutate={mutate} fetchDate={fetchDate} isLoading={isLoading}
                   search={search}/>
            {!isLoading &&
                <SectionPagination setPagination={setPagination} length={data.length}/>
            }
            <Popapp
                isShow={isShow}
                setIsShow={setIsShow}
                product={product}
                setProduct={setProduct}
            />
        </main>
    );
};

export default Main;