import axiosInstance from "./api-client";

export interface Entity {
    id?: number | undefined;
}

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAnswers<T>() {
        return axiosInstance.get<T>(this.endpoint);
    }

    create<T>(entity: T) {
        return axiosInstance.post(this.endpoint, entity);
    }
}

const createAnswer = (endpoint: string) => new HttpService(endpoint);

export default createAnswer;
