import { quiz } from '$lib/server/data'
import { error } from '@sveltejs/kit';

export function load() {
    if (!quiz) throw error(404);
    return {
        quiz: quiz
    };
}