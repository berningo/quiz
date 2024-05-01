import { quiz } from '$lib/server/data'
import { error } from '@sveltejs/kit';

function shuffleAnswers(answers: Answer[]) {
    let curidx = answers.length;
    for (let i = answers.length - 1; i > 0; i--) {
        let rndidx = Math.floor(Math.random() * i);
        let [a, b] = [answers[rndidx], answers[i]];
        [answers[i], answers[rndidx]] = [answers[rndidx], answers[i]];
    }
}

export function load({ params, cookies }) {
    const page = Number(params.question);
    const question = quiz[page];
    
    if (!question) throw error(404);
    
    let visitedPages: number[] = JSON.parse(cookies.get("visitedPages") || "[]");
    if (!visitedPages.includes(page)) {
        shuffleAnswers(question.answers);
        visitedPages.push(page);
        cookies.set("visitedPages", JSON.stringify(visitedPages), { path: "/" });
    }

    return {
        quizLength: quiz.length,
        question: {
            text: question.question,
            score: question.score,
            answers: question.answers
        },
        visitedPages
    }
}