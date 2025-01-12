'use client'

export default function ErrorPage({error}) {
    return (
        <div id="error">
            <h2>Page Not Found</h2>
            <p>{error.message}</p>
        </div>
    );
}