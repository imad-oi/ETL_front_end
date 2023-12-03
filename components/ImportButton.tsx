"use client"

import { useStore } from '@/store/index'; // Replace with your StoreContext import
import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import { Button } from './ui/button';

type ImportExcelButtonProps = {
    isConfig: string,
    title: string
}
const ImportButton: React.FC<ImportExcelButtonProps> = ({ isConfig, title }) => {
    const { state, addConfigFile, addExcelFile } =  useStore();

    console.log(isConfig)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (isConfig === 'config') {
                addConfigFile(file);
            } else {
                addExcelFile(file);
            }
            // isConfig ? addConfigFile(file) : addExcelFile(file);
        } else throw new Error('no file selected');
        console.log(state?.excel.fichier.name);
    };

    return (
        <Button>
            <label htmlFor="file-input" className='flex hover:cursor-pointer' >
                <Image src="/import.png" className='text-white' alt="import" width={16} height={24} />
                <span className='px-2 '>
                    {title}
                </span>
            </label>
            <input
                type="file"
                id="file-input"
                accept={isConfig === 'config' ? '.txt' : '.xlsx'}
                style={{ display: 'none' }}
                onChange={handleFileChange} />
        </Button>

    );
};

export default ImportButton;
