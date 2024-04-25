<script lang="ts">
	import type { PageData } from './$types';
	import { selectedAnswers } from '$lib/user_store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let selection: SelectedAnswers = $selectedAnswers;
	let isChecked: { [answerId: number]: boolean } = {};
	let isFinished = false;

	$: {
		if (Number($page.params.question) === data.quizLength - 1) {
			isFinished = true;
		}

		for (const answer of selection) {
			isChecked[answer.answerId] = answer.isSelected;
		}
		$selectedAnswers = selection;
	}

	function handleClick(event: Event) {
		const answerId = Number((event?.target as HTMLInputElement)?.name);
		const index = selection.findIndex((el) => el.answerId === answerId);
		if (index === -1) {
			selection = [
				...selection,
				{
					answerId: answerId,
					isSelected: true
				}
			];
		} else {
			selection[index].isSelected = !selection[index].isSelected;
		}
	}

	function gotoPreviousPage() {
		const question = Number($page.params.question) - 1;
		goto(`/questions/${question}`);
	}

	function gotoNextPage() {
		const question = Number($page.params.question) + 1;
		goto(`/questions/${question}`);
	}

	function finish() {
		goto("/summary");
	}
</script>

<article>
	<div class="text-lead">{Number($page.params.question) + 1}. {data.question.text}</div>
	<fieldset class="form-group">
		{#each data.question.answers as answer, i (answer.id)}
			<label for={answer.id.toString()} class="paper-check">
				<input
					type="checkbox"
					checked={isChecked[answer.id]}
					name={answer.id.toString()}
					id={answer.id.toString()}
					on:click={handleClick}
				/>
				<span class:background-secondary={isChecked[answer.id]}
					>{String.fromCharCode(97 + i)}. {answer.answer}</span
				>
			</label>
		{/each}
	</fieldset>
	<br />
</article>

<div class="row">
	<button
		class="col-2 col"
		disabled={Number($page.params.question) === 0}
		on:click={gotoPreviousPage}
	>
		&lt;&lt;&nbsp;Prev
	</button>
	<div class="col-1 col" />
	<button
		class="col-2 col"
		disabled={Number($page.params.question) >= data.quizLength - 1}
		on:click={gotoNextPage}
	>
		Next&nbsp;&gt;&gt;
	</button>
	<div class="col-5 col" />
	<button class="col-2 col" class:background-secondary={isFinished} on:click={finish}>Finish</button>
</div>
