"use client";

import { SwitchForm } from '@/components/SwitchForm';
import { Button } from '@/components/ui/button';

import DataTable from '@/components/DataTable';

import ImportButton from '@/components/ImportButton';
import { useStore } from '@/store';
import { useEffect, useState } from 'react';
import ImportExcelButton from '@/components/ImportExcelButton';
import axios from 'axios';



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

  useEffect(() => {
    console.log("state updated  : ", state);
  }, [state])

  function excelChange(file: File) {
    console.log('excel change');
    addExcelFile(file);
  }

  function configChange(file: File) {
    console.log('config change');
    addConfigFile(file);
  }


  const matchColumns = (columnsA: string[], columnsB: string[]): { [key: string]: string } => {
    const columnObject: { [key: string]: string } = {};

    const maxLength = Math.max(columnsA.length, columnsB.length);
    for (let i = 0; i < maxLength; i++) {
      const columnFromA = columnsA[i] || ''; // If columnsA[i] is undefined/null, default to an empty string
      const columnFromB = columnsB[i] || '';

      columnObject[columnFromA] = columnFromB;
    }
    return columnObject;
  };

  const sendData = async () => {
    // let excelColumns = state.excel.colonnes.map((column: any, index: number) => ({ ...column, index }));
    let excelCol = state.excel.colonnes;
    let configCol = state.config.colonnes;
    // Example usage:
    const columnMapping: { [key: string]: string } = matchColumns(configCol, excelCol);
    const jsonMapping: string = JSON.stringify(columnMapping);

    console.log(jsonMapping);

    try {
      const res = await axios.post('http://127.0.0.1:5000/save', columnMapping, {
        responseType: 'blob' // Set the response type to 'blob' to handle binary data
      })
      console.log(res);
      const url = window.URL.createObjectURL(new Blob([res.data]));

      // Create a link element and simulate a click to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'errors.csv');
      document.body.appendChild(link);
      link.click();

      // Clean up by revoking the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw error as Error;
    }
  }

  // const { db, excel, config } = state;
  /**
   * @todo send data to server
   * config:
   * - fichier
   * excel:
   * - fichier
   * tableJointure:
   * - data
   */
  return (
    <main className="min-h-screen flex flex-col gap-4  px-24 py-16 ">

      <div className='pe-2'>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className='text-xl text-slate-500  tracking-tight'>
          Hand-picked themes that you can copy
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
      <div className='flex-1 border-s ps-4'>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className='text-xl text-slate-500  tracking-tight'>
          Hand-picked themes that you can copy
        </p>

        <div className='flex  min-h-screen overflow-y-scroll'>
          <DataTable
            tableName='Table de base de donnee'
            isDBTable={true}
            columns={configColonnes} />

          <DataTable
            tableName='Table de excel'
            columns={excelColonnes} />
        </div>
        <Button
          onClick={sendData}
          className='mt-2' >
          Submit
        </Button>
      </div>

    </main>
  )

}
