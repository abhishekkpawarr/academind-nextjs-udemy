import {getLatestNews} from "@/lib/news";
import NewsList from "@/components/news-list";

export default function LatestNewsPage() {
    const latestNews = getLatestNews();

    return (
        <>
            <h2>Latest News</h2>
            <p>Here you will find the latest news articles that have been published on this website.</p>
            <NewsList news={latestNews}/>
        </>
    );
}