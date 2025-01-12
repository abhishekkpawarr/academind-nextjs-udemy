// 'use client';

// import {useParams} from "next/navigation";

export default function BlogPage({ params }){
    const {slug} = params;

    return (
        <main>
            <h1>{slug}</h1>
        </main>
    )
}