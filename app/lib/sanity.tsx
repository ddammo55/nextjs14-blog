import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId   = 'ga4b1vr0'
const dataset = 'production'
const apiVersion = '2023-12-04'

export const client =  createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
});

const builder = imageUrlBuilder(client);
export function urlFor(source : any) {
    return builder.image(source);
}
