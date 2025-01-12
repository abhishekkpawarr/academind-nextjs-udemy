import NewsList from "@/components/news-list";
import {getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth} from "@/lib/news";
import Link from "next/link";
import {Suspense} from "react";

async function FilterHeader({year, month}) {
    const availableYears = await getAvailableNewsYears();
    let links = availableYears;

    if (year && !month) {
        // news = await getNewsForYear(selectedYear);
        links = getAvailableNewsMonths(year);
    }

    if (year && month) {
        // news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = [];
    }

    const availableMonths = getAvailableNewsMonths(year);

    if (
        year && !availableYears?.includes(year) ||
        month && !availableMonths?.includes(month)
    ) {
        throw new Error('invalid filter')
    }

    return <header id={'archive-header'}>
        <nav>
            <ul>
                {links.map((link) => {
                    const href = year ? `/archive/${year}/${link}` : `/archive/${link}`

                    return <li key={link}>
                        <Link href={href}>{link}</Link>
                    </li>
                })}
            </ul>
        </nav>
    </header>
}

async function FilteredNews({year, month}) {
    let news;

    if (year && !month) {
        news = await getNewsForYear(year);
    }

    if (year && month) {
        news = await getNewsForYearAndMonth(year, month);
    }

    let newsContent = <p>No news found for the selected period.</p>

    if (news && news.length > 0) {
        newsContent = <NewsList news={news}/>
    }

    return newsContent;
}

export default async function FilteredNewsPage({params}) {
    const {filter} = params;
    // console.log(filter);

    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];

    return <>
        <Suspense fallback={<p>Loading filter...</p>}>
            <FilterHeader year={selectedYear} month={selectedMonth}/>
        </Suspense>
        <Suspense fallback={<p>Loading news...</p>}>
            <FilteredNews year={selectedYear} month={selectedMonth}/>
        </Suspense>
    </>
}