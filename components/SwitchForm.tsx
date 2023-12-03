"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "./ui/use-toast"
import { useStore } from "@/store"
import { useEffect, useState } from "react"
import { File } from "buffer"
// import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    excel: z.boolean().default(false),
    config: z.boolean(),
})

export function SwitchForm() {
    const { state, addExcelColonnes, addDbColonnes, addConfigColonnes } = useStore();
    const [excelFile, setExcelFile] = useState<File>(state.excel.fichier);
    const [configFile, setConfigFile] = useState<File>(state.config.fichier);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     // if (state.excel.fichier && state.config.fichier)
    //     //     setExcelFile(state.excel.fichier?.name)
    //     // else throw new Error('no excel file ')
    //     console.log(state)
    // }, [state])

    useEffect(() => {
        setExcelFile(state.excel.fichier);
    }, [state.excel.fichier])

    useEffect(() => {
        setConfigFile(state.config.fichier);
    }, [state.config.fichier])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            excel: true,
            config: false,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        setLoading(true);
        const formData = new FormData();
        formData.append('data', excelFile as any);
        formData.append('config', configFile as any);
        // send to server
        try {
            const res = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setLoading(false);
            console.log("data from server : \n",res.data)
            addExcelColonnes(res.data.data);
            addConfigColonnes(res.data.config);

            /**
            * @todo add data to store
            * const { dbColonnes, excelColonnes } = res;
            * addExcelColonnes(excelColonnes);
            * addDbColonnes(dbColonnes);
            */

        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }



    return (
        // <div>
        //     <h1>imported files </h1>
        //     <div className="flex flex-col">
        //         <div>
        //             {excelFile && <p>excel file : {excelFile.name}</p>}
        //         </div>
        //         <div>

        //             {configFile && <p>config file : {configFile.name}</p>}
        //         </div>
        //     </div>
        // </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => onSubmit(form.getValues()))} className="w-full space-y-6">
                <div>
                    <h3 className="mb-4 text-lg font-medium">Imported files</h3>
                    <div className="space-y-4  ">
                        <FormField
                            control={form.control}
                            name="excel"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Excel</FormLabel>
                                        <FormDescription>
                                            excel file : {excelFile && excelFile.name}
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="config"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Configuration</FormLabel>
                                        <FormDescription>
                                            config file : {configFile && configFile?.name}
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                    </div>
                </div>
                <Button type="submit">
                    {loading ? 'loading...' : 'Analyse'}
                    </Button>
            </form>
        </Form>

    )
}
