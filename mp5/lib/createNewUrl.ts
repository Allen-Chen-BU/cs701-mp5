'use server'

import getCollection, { URL_COLLECTION } from "@/db";
import { Url } from "@/type";

export default async function createNewUrl(alias: string, url: string): Promise<Url | null> {
    try {
        new URL(url);
    } catch {
        return null;
    }

    const data = {
        alias: alias,
        url: url
    }

    const urlCollection = await getCollection(URL_COLLECTION);
    let res;
    try {
        res = await urlCollection.insertOne(data);
    } catch {
        return null;
    }

    if (!res.acknowledged) {
        return null;
    }
    return {alias: data.alias, url: data.url};
}