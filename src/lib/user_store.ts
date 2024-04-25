import { writable } from "svelte/store";

export const selectedAnswers = writable<SelectedAnswers>([]);
