'use client';

import {useFormStatus} from "react-dom";

export default function FormSubmit() {
    const status = useFormStatus();

    console.log(status);
    if (status && status.pending) {
        return <p>Submitting...</p>
    }

    return <>
        <button type="reset">Reset</button>
        <button>Create Post</button>
    </>
}