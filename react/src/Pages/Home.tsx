import { useEffect, useState } from "react";
import Quiz, { Quizzes } from "../entities/Quizzes";
import createQuiz from "../services/http-quizeService";
import { Link } from "react-router-dom";

const Home = () => {
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

    useEffect(() => {
        getQuizzes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="py-10 px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
                Available Quizzes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-transform duration-300"
                    >
                        <div className="flex flex-col justify-between h-full">
                            <div className="p-5">
                                {/* Quiz title */}
                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                    {quiz.title}
                                </h3>

                                <Link
                                    to={`/quizzes/${quiz.id}`}
                                    className="block mt-4"
                                >
                                    <button className="w-full bg-indigo-600 text-white text-sm font-semibold py-2 rounded-md hover:bg-indigo-500 focus:ring focus:ring-indigo-300">
                                        Take Quiz
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
