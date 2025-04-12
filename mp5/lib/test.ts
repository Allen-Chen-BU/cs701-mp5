'use server'

import { Url } from "@/type";

export default async function handler() {

    console.log('Entered the serverless function')

    return { alias: "test", url: "https://stackoverflow.com/questions/67456980/getting-a-504-502-error-on-api-requests-in-nextjs-deployed-on-vercel" } as Url;
}