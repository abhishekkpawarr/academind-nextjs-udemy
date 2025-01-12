'use server';

import {saveMeal} from "@/lib/meals";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

function invalidText(text) {
    return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    }

    if (invalidText(meal.title) || invalidText(meal.summary) || invalidText(meal.instructions) || invalidText(meal.creator) || invalidText(meal.creator_email)) {
        return {message: 'Please fill out all fields'};
    }

    // console.log(meal);

    await saveMeal(meal);
    revalidatePath('/meals');
    redirect('/meals');
}