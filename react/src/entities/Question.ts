import Quiz from "./Quizzes";

export default interface Question {
    id: number;
    questions: string;
    created_at: string;
    quizzes: Quiz;
}

interface Links {
    url: string;
    active: boolean;
    label: string;
}

export interface QuizQuestions {
    data: Question[];
    meta: { links: Links[] };
    links: object;
}

export interface ShowQuestion {
    data: Question;
    meta: { links: Links[] };
    links: object;
}
