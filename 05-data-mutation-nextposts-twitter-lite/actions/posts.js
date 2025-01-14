'use server';

import {storePost, updatePostLikeStatus} from "@/lib/posts";
import {redirect} from "next/navigation";
import {uploadImage} from "@/lib/cloudinary";
import {revalidatePath} from "next/cache";

export async function createPost(prevState, formData) {
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    const errors = [];
    if (!title || title.trim() === '') {
        errors.push('Title must not be empty');
    }
    if (!content || content.trim() === '') {
        errors.push('Content must not be empty');
    }
    if (!image || image.size === 0) {
        errors.push('Image must not be empty');
    }
    if (errors.length > 0) {
        return {errors};
    }

    let imageUrl;
    try {
        imageUrl = await uploadImage(image);
    } catch (e) {
        throw new Error('Could not upload image, please try again later.');
    }

    await storePost({
        imageUrl: imageUrl,
        title,
        content,
        userId: 1
    })

    revalidatePath('/', 'layout');
    redirect('/feed');
}

export async function togglePostLikeStatus(postId, userId) {

    // hardcoding userId to 2 for now
    await updatePostLikeStatus(postId, 2);

    revalidatePath('/', 'layout');
}