import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import createAnswer from "../../services/http-answerQuestion";
import Answer, { AnswersQuestions } from "../../entities/Answers";

const Answers = () => {
    const answerQuiz = createAnswer("/answers");

    const [answers, setAnswers] = useState<Answer[]>([]);
    const getAnswers = () => {
        answerQuiz
            .getAnswers<AnswersQuestions>()
            .then(({ data }) => {
                const answer = data;
                console.log("Quizzes:", answer.data);

                setAnswers(answer.data);
            })
            .catch((error: Error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getAnswers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {answers.length == 0 && (
                <div className="flex justify-center items-center text-red-700 mt-11">
                    No answers Listed yet
                </div>
            )}

            <div className="flex justify-center items-center mt-28">
                <div className="relative overflow-x-auto container mx-auto mt-20">
                    <div className="flex justify-end mb-3">
                        <Link
                            className="p-2 px-5 text-white bg-gray-600 rounded "
                            to={"/admin/Allquestions"}
                        >
                            All Question
                        </Link>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Answer
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    quiz
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    question
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {answers &&
                                answers.map((answer) => (
                                    <tr
                                        key={answer.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {answer.answer}
                                        </th>
                                        <td className="px-6 py-4">
                                            {answer.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {answer.quizzes.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            {answer.questions.questions}
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

export default Answers;
