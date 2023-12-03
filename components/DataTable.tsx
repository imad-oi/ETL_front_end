"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { FC, useEffect, useState } from 'react'
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { useStore } from "@/store"

type TableProps = {
    tableName: string,
    columns: any[],
    isDBTable?: boolean,
    // SendObject?: (arg0: any[]) => void | undefined
}

const ExcelTable: FC<TableProps> = ({ tableName, columns, isDBTable }) => {
    const [tableColumns, setTableColumns] = useState<any[]>(columns);
    const { state, updateExcelColonnesTrie } = useStore();

    const moveColumnUp = (index: number) => {
        if (index === 0) return;
        const updatedColumns = [...tableColumns];
        const columnToMove = updatedColumns[index];
        updatedColumns.splice(index, 1);
        updatedColumns.splice(index - 1, 0, columnToMove);
        setTableColumns(updatedColumns);
    };

    const moveColumnDown = (index: number) => {
        if (index === tableColumns.length - 1) return;
        const updatedColumns = [...tableColumns];
        const columnToMove = updatedColumns[index];
        updatedColumns.splice(index, 1);
        updatedColumns.splice(index + 1, 0, columnToMove);
        setTableColumns(updatedColumns);
    };

    useEffect(() => {
        if (isDBTable) return;
        const columnsWithIndex = tableColumns.map((column: any, index: number) => ({ ...column, index }));
        console.log(columnsWithIndex);
        updateExcelColonnesTrie(columnsWithIndex);
        console.log(state)
    }, []);

    return (
        <div>
            <Table className='rounded overflow-hidden border'>
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
                                    {isDBTable && <Checkbox id="terms" />}
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {column.paymentMethod}
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
        </div>
    )
}

export default ExcelTable