"use client";

import { SwitchForm } from '@/components/SwitchForm';
import { Button } from '@/components/ui/button';

import DataTable from '@/components/DataTable';

import ImportButton from '@/components/ImportButton';
import ImportExcelButton from '@/components/ImportExcelButton';
import { useStore } from '@/store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from "sonner";



export default function Home() {

  const { state, addConfigFile, addExcelFile } = useStore();
  const [configColonnes, setConfigColonnes] = useState<any[]>(state.config.colonnes);
  const [excelColonnes, setExcelColonnes] = useState<any[]>(state.excel.colonnes);

  useEffect(() => {
    setExcelColonnes(state.excel.colonnes);
  }, [state.excel.colonnes]);

  useEffect(() => {
    setConfigColonnes(state.config.colonnes);
  }, [state.config.colonnes]);


  function excelChange(file: File) {
    addExcelFile(file);
  }

  function configChange(file: File) {
    addConfigFile(file);
  }


  const matchColumns = (columnsA: string[], columnsB: string[]): { [key: string]: string } => {
    const columnObject: { [key: string]: string } = {};

    for (let i = 0; i < columnsA.length; i++) {
      const columnFromA = columnsA[i] || ''; // If columnsA[i] is undefined/null, default to an empty string
      const columnFromB = columnsB[i] || '';

      columnObject[columnFromA] = columnFromB;
    }
    return columnObject;
  };


  const sendData = async () => {
    let excelCol = state.excel.colonnes;
    let configCol = state.config.colonnes;
    const columnMapping: { [key: string]: string } = matchColumns(configCol, excelCol);
    try {
      const res = await axios.post('http://127.0.0.1:5000/save', columnMapping, {
        responseType: 'blob',
      })

      if (res.status !== 200) throw new Error('Error downloading file');
      if (res.data instanceof Blob) {
        const userInput = prompt('download errors file ? (y/n)');
        if (userInput?.toLowerCase() === 'y') {
          toast('We send back the errors data')
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'errors.csv');
          document.body.appendChild(link);
          link.click();
          // Clean up by revoking the URL object
          window.URL.revokeObjectURL(url);
        }
      }
      // Create a link element and simulate a click to trigger the download
    } catch (error) {
      throw error as Error;
    }
  }

  return (
    <main className="min-h-screen flex flex-col gap-4  px-24 py-16 ">

      <div className='pe-2'>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className='text-xl text-slate-500  tracking-tight'>
          Load & Extract & Transform your data
        </p>

        <div className='flex gap-5 mt-4'>
          {/* <ImportButton fileChange={excelChange} name='excel' title='import excel file' /> */}
          <ImportButton fileChange={configChange} name='config' title='import configuration file' />
          <ImportExcelButton fileChange={excelChange} name='excel' title='import excel file' />
        </div>

        <div className='mt-2'>
          <SwitchForm />
        </div>

      </div>
      <hr />
      <div className='flex-1'>
        <p className='text-xl text-slate-500  tracking-tight'>
          Match every column from excel to database
        </p>

        {
          state.excel.colonnes && state.config.colonnes &&
          <div className='flex'>
            <DataTable
              tableName='Table de base de donnee'
              isDBTable={true}
              columns={configColonnes} />

            <DataTable
              tableName='Table de excel'
              columns={excelColonnes} />
          </div>}
        <Button
          disabled={state.excel.colonnes.length === 0 || state.config.colonnes.length === 0}
          onClick={sendData}
          className='mt-2' >
          Submit
        </Button>
      </div>

    </main>
  )

}
