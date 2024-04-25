import { quiz } from "$lib/server/data.js"

export function load() {
    const numberOfQuestions: number = quiz.length;
    return {
        numberOfQuestions
    };
}