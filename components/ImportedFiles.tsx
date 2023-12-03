import Image from "next/image"
import { Button } from "./ui/button"

function ImportedFiles() {
    return (
        <div className='ring-1 ring-black rounded-md p-4 mt-4 w' >
            <h3 className='text-xl text-slate-600 font-bold  tracking-tight'>Imported files  </h3>
            <div className='flex gap-3'>
                <div className='bg-gray-300 rounded-md w-fit p-4'>
                    excel.xlsx
                </div>
            </div>
            <Button className='mt-4'>
                <Image src="/import.png" className='text-white' alt="import" width={16} height={24} />
                <span className='px-2'>
                    Analyse
                </span>
            </Button>
        </div>
    )
}

export default ImportedFiles