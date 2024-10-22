import { useEffect, useState } from "react";
import Quiz, { Quizzes } from "../../../entities/Quizzes";
import { Link } from "react-router-dom";
import createQuiz from "../../../services/http-quizeService";

const AdminPage = () => {
    const QuizService = createQuiz("/quizzes");

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const getQuizzes = () => {
        QuizService.getAllQuizzes<Quizzes>()
            .then(({ data }) => {
                const quiz = data;
                console.log("Quizzes:", quiz.data);

                setQuizzes(quiz.data);
            })
            .catch((error: Error) => {
                console.log(error.message);
            });
    };

    const onDelete = (QuizId: number | undefined) => {
        if (!window.confirm("are you want to delete this user?")) {
            return;
        }

        QuizService.delete(QuizId).then(() => {
            getQuizzes();
        });
    };

    useEffect(() => {
        getQuizzes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {quizzes.length == 0 && (
                <div className="flex justify-center items-center text-red-700 mt-11">
                    No Quizzes Listed yet
                </div>
            )}

            <div className="flex justify-center items-center mt-28">
                <div className="relative overflow-x-auto container mx-auto mt-20">
                    <div className="flex justify-between mb-3">
                        <Link
                            className="p-2 px-5 text-white bg-gray-600 rounded"
                            to={"answers"}
                        >
                            All Answers
                        </Link>

                        <Link
                            className="p-2 px-5 text-white bg-gray-600 rounded"
                            to={"Allquestions"}
                        >
                            All Question
                        </Link>
                        <Link
                            className="p-2 px-5 text-white bg-gray-600 rounded"
                            to="/quiz-create"
                        >
                            Add new Quiz
                        </Link>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    slug
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
                            {quizzes &&
                                quizzes.map((quiz) => (
                                    <tr
                                        key={quiz.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {quiz.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {quiz.slug}
                                        </td>
                                        <td className="px-6 py-4">
                                            {quiz.created_at}
                                        </td>

                                        <td>
                                            <Link
                                                className="p-2 px-2 m-2 text-white bg-gray-600 rounded"
                                                to={"quizzes/new/" + quiz.id}
                                            >
                                                Add Question
                                            </Link>
                                            <Link
                                                className="p-2 px-5 text-white bg-gray-600 rounded"
                                                to={"quizzes/edit/" + quiz.id}
                                            >
                                                Edit
                                            </Link>
                                            &nbsp;
                                            <button
                                                className="p-2 px-5 text-white bg-red-600 rounded"
                                                onClick={() =>
                                                    onDelete(quiz.id)
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

export default AdminPage;
