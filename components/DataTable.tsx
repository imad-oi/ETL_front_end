"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { useStore } from "@/store"
import { FC, useEffect, useState } from 'react'
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6'
import { Checkbox } from './ui/checkbox'

type TableProps = {
    tableName: string,
    columns: any[],
    isDBTable?: boolean,
    // SendObject?: (arg0: any[]) => void | undefined
}

const ExcelTable: FC<TableProps> = ({ tableName, columns, isDBTable }) => {
    const [tableColumns, setTableColumns] = useState<any[]>(columns);
    const { state, updateExcelColonnesTrie, addExcelColonnes } = useStore();

    // console.log("from data table  : \n", tableColumns);

    const moveColumnUp = (index: number) => {
        if (index === 0) return;
        const updatedColumns = [...tableColumns];
        const columnToMove = updatedColumns[index];
        updatedColumns.splice(index, 1);
        updatedColumns.splice(index - 1, 0, columnToMove);
        addExcelColonnes(updatedColumns);
        setTableColumns(updatedColumns);
    };

    const moveColumnDown = (index: number) => {
        if (index === tableColumns.length - 1) return;
        const updatedColumns = [...tableColumns];
        const columnToMove = updatedColumns[index];
        updatedColumns.splice(index, 1);
        updatedColumns.splice(index + 1, 0, columnToMove);
        addExcelColonnes(updatedColumns);
        setTableColumns(updatedColumns);
    };

    useEffect(() => {
        setTableColumns(state.excel.colonnes)
    }, [state])

    // useEffect(() => {
    //     if (isDBTable) return;
    //     const columnsWithIndex = tableColumns.map((column: any, index: number) => ({ ...column, index }));
    //     console.log(columnsWithIndex);
    //     // updateExcelColonnesTrie(columnsWithIndex);
    // }, []);

    return (
        // <div>
            <Table className='rounded border'>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-full font-bold text-lg">{tableName}</TableHead>
                    </TableRow>
                    <TableRow>
                        <TableHead className="w-[100px]">Columns</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableColumns.map((column, index) => (
                        <TableRow key={index} className='h-14'>
                            <TableCell className="font-medium">
                                <div className="flex items-center space-x-2">
                                    {/* {isDBTable && <Checkbox id="terms" />} */}
                                    <span>
                                        {index + 1} -
                                    </span>
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {columns[index]}
                                    </label>
                                </div>
                            </TableCell>
                            {!isDBTable && (
                                <TableCell className='flex gap-1 justify-center items-center'>
                                    <button
                                        className='bg-red-200 py-1 px-3 rounded-sm'
                                        onClick={() => moveColumnUp(index)}
                                        disabled={index === 0}
                                    >
                                        <FaArrowUpLong className="h-3 w-2" />
                                    </button>
                                    <button
                                        className='bg-green-200 py-1 px-3 rounded-sm'
                                        onClick={() => moveColumnDown(index)}
                                        disabled={index === tableColumns.length - 1}
                                    >
                                        <FaArrowDownLong className="h-3 w-2" />
                                    </button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        // </div>
    )
}

export default ExcelTable