import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Question, { QuizQuestions } from "../../../entities/Question";
import createQuestion from "../../../services/http-questionSerivce";

const Questions = () => {
    const QuestionService = createQuestion("/questions");
    const QuestoinDelete = createQuestion("");

    const [questions, setQuestions] = useState<Question[]>([]);
    const getQuizzes = () => {
        QuestionService.getAllQuestions<QuizQuestions>()
            .then(({ data }) => {
                const question = data;
                console.log("Questions:", question.data);

                setQuestions(question.data);
            })
            .catch((error: Error) => {
                console.log(error.message);
            });
    };

    const onDelete = (quizId: number, questionId: number) => {
        if (!window.confirm("are you want to delete this user?")) {
            return;
        }

        QuestoinDelete.delete(quizId, questionId).then(() => {
            getQuizzes();
        });
    };

    useEffect(() => {
        getQuizzes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {questions.length == 0 && (
                <div className="flex justify-center items-center text-red-700 mt-11">
                    No Questions Listed yet
                </div>
            )}

            <div className="flex justify-center items-center mt-28">
                <div className="relative overflow-x-auto container mx-auto mt-20">
                    <div className="flex justify-end mb-3">
                        <Link
                            className="p-2 px-5 text-white bg-gray-600 rounded"
                            to="/admin"
                        >
                            All Quizzes
                        </Link>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Question
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quiz Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    created At
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions &&
                                questions.map((question) => (
                                    <tr
                                        key={question.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {question.questions}
                                        </th>

                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {question.quizzes.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {question.created_at}
                                        </td>

                                        <td>
                                            <Link
                                                className="p-2 px-5 text-white bg-gray-600 rounded"
                                                to={`/admin/questions/edit/${question.quizzes.id}/${question.id}`}
                                            >
                                                Edit
                                            </Link>
                                            &nbsp;
                                            <button
                                                className="p-2 px-5 text-white bg-red-600 rounded"
                                                onClick={() =>
                                                    onDelete(
                                                        question.quizzes.id,
                                                        question.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Questions;
