import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ClientPagination from "@/components/client-pagination"; // Import the component

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }`;

  const data = await client.fetch(query);

  return data;
}


export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  //console.log(data);

  return (
    <div className="">
 <ClientPagination data={data} /> {/* Pass the data as a prop */}
      
    </div>
  );
}