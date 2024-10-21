// import axiosInstance from "./api-client";

// export interface Entity {
//     id?: number | undefined;
// }

// class HttpService {
//     endpoint: string;

//     constructor(endpoint: string) {
//         this.endpoint = endpoint;
//     }

//     getAllQuestions<T>() {
//         return axiosInstance.get<T>("/questions");
//     }

//     create<T>(entity: T) {
//         return axiosInstance.post(this.endpoint, entity);
//     }

//     update<T extends Entity>(entity: T) {
//         return axiosInstance.patch(this.endpoint + "/" + entity.id, entity);
//     }

//     delete(id: number | undefined) {
//         return axiosInstance.delete(this.endpoint + "/" + id);
//     }
// }

// const create = (endpoint: string) => new HttpService(endpoint);

// export default create;
