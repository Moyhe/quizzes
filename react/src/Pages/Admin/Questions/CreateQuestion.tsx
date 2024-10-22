import { FieldValues, useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import createQuestion from "../../../services/http-quizeService";

const CreateQuestion = () => {
    const { id } = useParams();

    const QuestionService = createQuestion(`/quizzes/${id}/questions`);

    const navigate = useNavigate();

    const quizSchema = z.object({
        questions: z.array(
            z.object({
                question: z.string().min(1, "Question is required"),
            })
        ),
    });

    type FormData = z.infer<typeof quizSchema>;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            questions: [{ question: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions",
    });

    const onSubmit = async (data: FieldValues) => {
        QuestionService.create<FieldValues>(data)
            .then(() => navigate("/admin"))
            .catch((error: Error) => {
                console.log(error.message);
            });
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Add Multiple Questions
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <label
                                htmlFor={`questions[${index}].question`}
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Question {index + 1}
                            </label>
                            <div className="mt-2 flex items-center space-x-2">
                                <input
                                    id={`questions[${index}].question`}
                                    {...register(`questions.${index}.question`)}
                                    className={`flex-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                                        errors.questions?.[index]?.question
                                            ? "ring-red-600"
                                            : ""
                                    }`}
                                />
                                <button
                                    type="button"
                                    className="text-red-600 text-sm"
                                    onClick={() => remove(index)}
                                >
                                    Remove
                                </button>
                            </div>
                            {errors.questions?.[index]?.question && (
                                <span className="text-red-600 text-sm">
                                    {errors.questions[index].question?.message}
                                </span>
                            )}
                        </div>
                    ))}

                    <div className="mt-4 flex justify-between">
                        <button
                            type="button"
                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => append({ question: "" })}
                        >
                            Add Another Question
                        </button>
                        <button
                            disabled={!isValid}
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateQuestion;
