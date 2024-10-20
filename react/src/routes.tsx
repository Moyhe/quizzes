import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import QuizDetails from "./Pages/QuizDetails";
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminPage from "./Pages/Admin/AdminPage";
import Quiz from "./Pages/Admin/Quiz";
import AnswerQuestions from "./Pages/Admin/AnswerQuestions";
import Question from "./Pages/Admin/Question";
import CreateQuiz from "./Pages/Admin/CreateQuiz";
import EditQuiz from "./Pages/Admin/EditQuiz";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "quiz-create",
                element: <CreateQuiz />,
            },

            {
                path: "quiz-details/:id",
                element: <QuizDetails />,
            },

            {
                path: "admin",
                element: <AdminLayout />,
                children: [
                    { index: true, element: <AdminPage /> },
                    { path: "quizzes/new", element: <Quiz /> },
                    { path: "quizzes/edit/:id", element: <EditQuiz /> },
                    { path: "quizzes/question/:id", element: <Question /> },
                    {
                        path: "answer-questions/:id",
                        element: <AnswerQuestions />,
                    },
                ],
            },
        ],
    },
]);

export default router;
