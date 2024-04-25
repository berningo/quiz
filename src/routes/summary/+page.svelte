<script lang="ts">
	import { selectedAnswers } from '$lib/user_store';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	let selection: SelectedAnswers = $selectedAnswers;
	let { score, maxScore, report } = evaluate();

	function evaluate(): { score: number; maxScore: number; report: string } {
		let totalScore = 0;
		let maxScore = 0;
		let report = '';

		for (const [i, question] of data.quiz.entries()) {
			let score = 0;
			let wrong = 0;
			report += (i + 1).toString() + '. ' + question.question + '\n';
			for (const [j, answer] of question.answers.entries()) {
				const choice = selection.find((el) => el.answerId === answer.id)?.isSelected || false;
				const choiceSymbol = choice ? "[X]" : "[ ]";
				if (answer.isCorrect === choice) {
					report += String.fromCharCode(97 + j) + '. ' + choiceSymbol + " " + answer.answer + '\n';
					//console.log(answer.answer + ' should be ' + answer.isCorrect + ' OK ');
				} else {
					report += String.fromCharCode(97 + j) + '. ' + choiceSymbol + " " + answer.answer + ' ❌\n';
					//console.log(answer.answer + ' should be ' + answer.isCorrect + ' FAILED ');
					wrong++;
				}
			}
			//console.log('Wrong: ' + wrong);
			score = Math.max(
				0,
				((question.answers.length - 2 * wrong) / question.answers.length) * question.score
			);
			report += '\nScore: ' + score.toString() + ' / ' + question.score.toString() + '\n\n';
			//console.log('Score: ' + score);
			maxScore += question.score;
			totalScore += score;
		}
		report +=
			'\nTotal Score: ' +
			totalScore.toString() +
			' / ' +
			maxScore.toString() +
			'  ≈ ' +
			(Math.round((totalScore / maxScore) * 1000) / 10).toString() +
			'%\n\n';
		return { score: totalScore, maxScore, report };
	}

	onMount(async () => {
		const response = await fetch('/report', {
			method: 'POST',
			body: report,
			headers: {
				'Content-Type': 'application/text'
			}
		});
	});
</script>

<h1>Thank you!</h1>
<!-- Your Score: {Math.round((score / maxScore) * 1000) / 10}% -->

<!--
{JSON.stringify(selection)}
<hr />
{JSON.stringify(data)}
-->