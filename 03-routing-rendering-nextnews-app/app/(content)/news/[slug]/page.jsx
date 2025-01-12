import {DUMMY_NEWS} from "@/dummy-news";
import {notFound} from "next/navigation";
import Link from "next/link";

export default function NewsDetailPage({params}) {
    const {slug} = params;
    const newsItem = DUMMY_NEWS.find(news => news.slug === slug);

    if (!newsItem) {
        return notFound();
    }

    return (
        <article className={'news-article'}>
            <header>
                <Link href={`/news/${newsItem.slug}/image`}>
                    <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}/>
                </Link>
                <h1>{newsItem.title}</h1>
                <time dateTime={newsItem.date}>{newsItem.date}</time>
            </header>
            <p>{newsItem.content}</p>
        </article>
    );
}