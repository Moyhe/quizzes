import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import create from "../../../services/http-quizeService";
import { useNavigate } from "react-router";

const CreateQuiz = () => {
    const QuizService = create("/quizzes");

    const navigate = useNavigate();

    const quizSchema = z.object({
        title: z.string().min(1, "Title is required"),
    });

    type FormData = z.infer<typeof quizSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(quizSchema),
    });

    const onSubmit = async (data: FieldValues) => {
        QuizService.create<FieldValues>(data)
            .then(() => navigate("/admin"))
            .catch((error: Error) => {
                console.log(error.message);
            });
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create New Quiz
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Title
                        </label>
                        <div className="mt-2">
                            <input
                                id="title"
                                {...register("title")}
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                                    errors.title ? "ring-red-600" : ""
                                }`}
                            />
                            {errors.title && (
                                <span className="text-red-600 text-sm">
                                    {errors.title.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            disabled={!isValid}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateQuiz;
