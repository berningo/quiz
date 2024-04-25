type Answer = {
    id: number,
    answer: string,
    isCorrect: boolean
};

type Question = {
	question: string,
    score: number,
	answers: Answer[]
};

type Quiz = Question[];

type SelectedAnswers = {
    answerId: number,
    isSelected: boolean
}[];