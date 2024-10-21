import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { ShowQuestion } from "../../entities/Question";
import createQuestion from "../../services/http-questionSerivce";

const EditQuestion = () => {
    const { quizId, questionId } = useParams();
    const QuestionService = createQuestion(
        `/quizzes/${quizId}/questions/${questionId}`
    );
    const navigate = useNavigate();

    const quizSchema = z.object({
        questions: z.string().min(1, "Question is required"),
    });

    type FormData = z.infer<typeof quizSchema>;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            questions: "",
        },
    });

    // Fetch question details
    const fetchQuestion = () => {
        QuestionService.getQuestion<ShowQuestion>()
            .then(({ data }) => {
                const question = data;
                console.log("Question data:", question.data);

                reset({ questions: question.data.questions });
            })
            .catch((error: Error) => {
                console.log("Error fetching question:", error.message);
            });
    };

    useEffect(() => {
        if (quizId && questionId) {
            fetchQuestion();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (data: FieldValues) => {
        if (quizId && questionId) {
            QuestionService.update({ quizId, questionId, ...data })
                .then(() => navigate("/admin/Allquestions"))
                .catch((error: Error) => {
                    console.log("Error updating question:", error.message);
                });
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Edit Question
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            htmlFor="question"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Question
                        </label>
                        <div className="mt-2">
                            <input
                                id="question"
                                {...register("questions")}
                                className={`flex-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                                    errors.questions ? "ring-red-600" : ""
                                }`}
                            />
                            {errors.questions && (
                                <span className="text-red-600 text-sm">
                                    {errors.questions?.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditQuestion;
