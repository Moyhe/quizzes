export default interface Quiz {
    id: number;
    title: string;
    slug: string;
    created_at: string;
}

interface Links {
    url: string;
    active: boolean;
    label: string;
}

export interface Quizzes {
    data: Quiz[];
    meta: { links: Links[] };
    links: object;
}

export interface ShowQuiz {
    data: Quiz;
    meta: { links: Links[] };
    links: object;
}
