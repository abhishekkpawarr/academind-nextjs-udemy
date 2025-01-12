export default function NewsDetailPage({params}) {
    const { id } = params;

  return (
    <div id={'news-detail'}>
      <h1>News Detail</h1>
      <p>News Detail Page: {id}</p>
    </div>
  );
}