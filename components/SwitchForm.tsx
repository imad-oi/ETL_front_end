"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { useStore } from "@/store"
import { File } from "buffer"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const FormSchema = z.object({
    excel: z.boolean().default(false),
    config: z.boolean(),
})

export function SwitchForm() {
    const { state, addExcelColonnes, addDbColonnes, addConfigColonnes } = useStore();
    const [excelFile, setExcelFile] = useState<File | null>(state.excel.fichier);
    const [configFile, setConfigFile] = useState<File | null>(state.config.fichier);
    const [loading, setLoading] = useState(false);

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
            config: true,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        const formData = new FormData();
        formData.append('data', excelFile as any);
        formData.append('config', configFile as any);
        try {
            const res = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setLoading(false);
            addExcelColonnes(res.data.data);
            addConfigColonnes(res.data.config);

        } catch (error) {
            setLoading(false);
            toast('error while uploading files, please check your console for more details');
            throw error as Error;
        }

    }



    return (
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
                                            excel file name : {excelFile && excelFile.name}
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        {/* <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        /> */}
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
                                            config file name : {configFile && configFile?.name}
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        {/* <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        /> */}
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                    </div>
                </div>
                <Button disabled={excelFile === null || configFile === null} type="submit">
                    {loading ? 'loading...' : 'Analyse'}
                </Button>
            </form>
        </Form>

    )
}
