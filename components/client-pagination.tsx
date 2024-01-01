"use client";

import { urlFor } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { simpleBlogCard } from "@/app/lib/interface";
import { Input } from "./ui/input";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";


export default function ClientPagination({ data }: { data: simpleBlogCard[] }) {
    const [isClient, setIsClient] = useState(false);
    const [filteredData, setFilteredData] = useState<simpleBlogCard[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(2);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setIsClient(true);
        setFilteredData(data);
    }, [data]);

    useEffect(() => {
        const filtered = data.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, data]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);

    return (
        <>
            {/* <button onClick={resetLocalStorage}>Reset Local Storage</button> */}
            {isClient ? (
                <>
                    <Input type="text" placeholder="검색어를 입력해주세요" onChange={handleSearch} />
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
                        {currentPosts.map((data, idx) => {
                            return (
                                <Card key={idx}>
                                    <Image
                                        src={urlFor(data.titleImage).url()}
                                        alt="image"
                                        width={500}
                                        height={500}
                                        className="rounded-t-lg h-[200px] object-cover"
                                    />

                                    <CardContent className="mt-5">
                                        <h3 className="text-lg line-clamp-1 font-bold">{data.title}</h3>
                                        <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                                            {data.smallDescription}
                                        </p>
                                        <Button asChild className="w-full mt-7">
                                            <Link href={`/blog/${data.currentSlug}`}>Read More</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                    <PaginationSection
                        totalPosts={filteredData.length}
                        postsPerPage={postsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 w-full p-10"></div>
            )}
        </>
    );
}

function PaginationSection({
    totalPosts,
    postsPerPage,
    currentPage,
    setCurrentPage,
}: {
    totalPosts: any;
    postsPerPage: any;
    currentPage: any;
    setCurrentPage: any;
}) {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }
    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (
        <div className="mt-10">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handlePrevPage()} />
                    </PaginationItem>

                    {pages.map((page, idx) => (
                        <PaginationItem
                            key={idx}
                            className={
                                currentPage === page ? "bg-gray-300 rounded-md dark:bg-gray-700" : ""
                            }
                        >
                            <PaginationLink onClick={() => setCurrentPage(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext onClick={() => handleNextPage()} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
