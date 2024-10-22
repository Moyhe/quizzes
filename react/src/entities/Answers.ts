import Question from "./Question";
import Quiz from "./Quizzes";

export default interface Answer {
    id: number;
    answer: string;
    email: string;
    quizzes: Quiz;
    questions: Question;
}

interface Links {
    url: string;
    active: boolean;
    label: string;
}

export interface AnswersQuestions {
    data: Answer[];
    meta: { links: Links[] };
    links: object;
}
