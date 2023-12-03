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
// import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    excel: z.boolean().default(false),
    config: z.boolean(),
})

export function SwitchForm() {
    const { state: { excel, config }, addExcelColonnes, addDbColonnes } = useStore();
    const [excelFile, setExcelFile] = useState();

    useEffect(() => {
        if (excel)
            setExcelFile(excel.fichier?.name)
        else throw new Error('no excel file ')
    }, [excel, config])


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            excel: true,
            config: false,
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        // send to server
        try {
            const res = axios.post('http://localhost:5000/api/analyse', {
                excel: excel.fichier,
                config: config.fichier
            })

            /**
            * @todo add data to store
            * const { dbColonnes, excelColonnes } = res;
            * addExcelColonnes(excelColonnes);
            * addDbColonnes(dbColonnes);
            */

        } catch (error) {
            console.log(error);
        }

        // show toast
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
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
                                            excel file : {excel?.ficher?.name}
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
                                            config file : {config?.fichier?.name}
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
                <Button type="submit">Analyse</Button>
            </form>
        </Form>
    )
}
