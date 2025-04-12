'use server'

import getCollection, { URL_COLLECTION } from "@/db";
import { Url } from "@/type";

export default async function getUrl(alias:string): Promise<Url | null> {
    const urlCollection = await getCollection(URL_COLLECTION);
    const data =  await urlCollection.findOne({ alias: alias });

    if (!data) {
        return null
    }
    return { alias: data.alias, url: data.url } as Url;
}