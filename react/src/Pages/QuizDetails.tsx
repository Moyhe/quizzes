import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod for validation
import { zodResolver } from "@hookform/resolvers/zod";
import Question, { QuizQuestions } from "../entities/Question";
import createQuestion from "../services/http-questionSerivce";
import createAnswer from "../services/http-answerQuestion";
import ErrorMessage from "../entities/ErrorMessage";
import { AxiosError } from "axios";

const Questions = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState<ErrorMessage>({} as ErrorMessage);

    const questionService = createQuestion(`/quizzes/${quizId}/questions`);
    const answerService = createAnswer(`/quizzes/${quizId}/answers`);

    const [questions, setQuestions] = useState<Question[]>([]);

    const answerSchema = z.object({
        email: z.string().email("Please provide a valid email"),
        answers: z.array(
            z.object({
                question_id: z.number(),
                answer: z.string().min(1, "Answer is required"),
            })
        ),
    });

    type FormData = z.infer<typeof answerSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(answerSchema),
        defaultValues: {
            email: "",
            answers: [],
        },
    });

    useEffect(() => {
        questionService
            .getQuizQuestions<QuizQuestions>()
            .then(({ data }) => {
                const quizQuestions = data;
                setQuestions(quizQuestions.data);

                quizQuestions.data.forEach(
                    (question: Question, index: number) => {
                        setValue(`answers.${index}.question_id`, question.id);
                    }
                );
            })
            .catch((error: Error) => {
                console.log("Error:", error.message);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (data: FieldValues) => {
        answerService
            .create<FieldValues>(data)
            .then(() => navigate("/"))
            .catch((error: AxiosError<ErrorMessage>) => {
                const { response } = error;

                if (response?.data.message && response.status == 500) {
                    console.log(response.data.message);

                    setError({ message: response.data.message });

                    setTimeout(() => {
                        setError({ message: "" });
                    }, 2000);
                }
            });
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            {questions.length == 0 && <div>No Questions For That Quiz</div>}
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
                Quiz {quizId}
            </h2>
            {error && (
                <p className="text-red-600 text-center mb-3">{error.message}</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="you@example.com"
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.email?.message}
                        </p>
                    )}
                </div>

                {questions.map((question, index) => (
                    <div
                        key={question.id}
                        className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg"
                    >
                        <h3 className="text-lg font-semibold text-gray-900">
                            {index + 1}. {question.questions}
                        </h3>

                        <textarea
                            rows={3}
                            {...register(`answers.${index}.answer`)}
                            className="mt-3 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="Your answer"
                        ></textarea>

                        <input
                            type="hidden"
                            {...register(`answers.${index}.question_id`)}
                            value={question.id}
                        />

                        {/* Display validation errors */}
                        {errors.answers?.[index]?.answer && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.answers?.[index]?.answer?.message}
                            </p>
                        )}
                    </div>
                ))}

                <button
                    disabled={!isValid}
                    type="submit"
                    className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                >
                    Submit Quiz
                </button>
            </form>
        </div>
    );
};

export default Questions;
