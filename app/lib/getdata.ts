import { client } from "./sanity";

export async function getData() {
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


  export async function getSlugData(slug: string) {
    const query = `*[_type == "blog" && slug.current == '${slug}']{
        "currentSlug" : slug.current,
          title,
          content,
          titleImage
    }[0]`

    const data = await client.fetch(query);
	return data;
 }