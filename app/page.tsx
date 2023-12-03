"use client";

import { SwitchForm } from '@/components/SwitchForm'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import DataTable from '@/components/DataTable'

import ImportButton from '@/components/ImportButton'
import { invoices } from '@/utils/data'
import { useStore } from '@/store';
import { send } from 'process';



export default function Home() {

  const { state } = useStore();

  const trouverCorresandance = () => {

  }

  const sendData = () => {
    console.log('send data');
    console.log(state);
    const { db, excel, config } = state;
    /**
     * @todo send data to server
     * config:
     * - fichier
     * excel:
     * - fichier
     * tableJointure:
     * - data
     */
  }

  return (
    <main className="min-h-screen flex gap-4  px-24 py-16 ">

      <div className='pe-2'>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className='text-xl text-slate-500  tracking-tight'>
          Hand-picked themes that you can copy
        </p>

        <div className='flex gap-5 mt-4'>
          {/* <Button>
            <Image src="/import.png" className='text-white' alt="import" width={16} height={24} />
            <span className='px-2'>
              import excel file
            </span>
          </Button> */}
          <ImportButton isConfig={'excel'} title='import excel file' />
          <ImportButton isConfig={'config'} title='import configuration file' />
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

        <div className='flex '>
          <DataTable
            tableName='Table de base de donnee'
            isDBTable={true}
            columns={state.db.colonnes} />

          <DataTable
            tableName='Table de excel'
            columns={state.excel.colonnes} />
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
