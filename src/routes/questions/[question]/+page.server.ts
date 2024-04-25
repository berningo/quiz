import { quiz } from '$lib/server/data'
import { error } from '@sveltejs/kit';

export function load({ params }) {
    const question = quiz[Number(params.question)];
    if (!question) throw error(404);
    return {
        quizLength: quiz.length,
        question: {
            text: question.question,
            score: question.score,
            answers: question.answers
        }
    }
}