"use client"

import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import { Button } from './ui/button';

type ImportExcelButtonProps = {
    name: string,
    title: string,
    fileChange: (file: File) => void
}
const ImportExcelButton: React.FC<ImportExcelButtonProps> = ({ name, title, fileChange }) => {

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log(file);
            fileChange(file);
        } else throw new Error('no file selected');
    };

    return (
        <Button>
            <label htmlFor="file-excel" className='flex hover:cursor-pointer' >
                <Image src="/import.png" className='text-white' alt="import" width={16} height={24} />
                <span className='px-2 '>
                    {title}
                </span>
            </label>
            <input
                type="file"
                id="file-excel"
                accept=".xlsx , .xls"
                style={{ display: 'none' }}
                onChange={handleFileChange} />
        </Button>

    );
};

export default ImportExcelButton;
