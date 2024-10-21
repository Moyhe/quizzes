import axiosInstance from "./api-client";

export interface Entity {
    quizId: string;
    questionId?: string;
}

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getQuestion<T>() {
        return axiosInstance.get<T>(this.endpoint);
    }

    getAllQuestions<T>() {
        return axiosInstance.get<T>(this.endpoint);
    }

    create<T>(entity: T) {
        return axiosInstance.post(this.endpoint, entity);
    }

    update<T extends Entity>(entity: T) {
        return axiosInstance.patch(this.endpoint, entity);
    }

    delete(quizId: number, questionId: number) {
        return axiosInstance.delete(
            this.endpoint +
                "/" +
                "quizzes/" +
                quizId +
                "/" +
                "questions/" +
                questionId
        );
    }
}

const createQuestion = (endpoint: string) => new HttpService(endpoint);

export default createQuestion;
