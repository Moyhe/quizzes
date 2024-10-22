import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import QuizDetails from "./Pages/QuizDetails";
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminPage from "./Pages/Admin/Quizzes/AdminPage";
import Question from "./Pages/Admin/Questions/CreateQuestion";
import CreateQuiz from "./Pages/Admin/Quizzes/CreateQuiz";
import EditQuiz from "./Pages/Admin/Quizzes/EditQuiz";
import CreateQuestion from "./Pages/Admin/Questions/CreateQuestion";
import Questions from "./Pages/Admin/Questions/Questions";
import EditQuestion from "./Pages/Admin/Questions/EditQuestion";
import Answers from "./Pages/Admin/Answers";

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
                path: "quizzes/:quizId",
                element: <QuizDetails />,
            },

            {
                path: "admin",
                element: <AdminLayout />,
                children: [
                    { index: true, element: <AdminPage /> },
                    { path: "quizzes/new/:id", element: <CreateQuestion /> },
                    { path: "quizzes/edit/:id", element: <EditQuiz /> },
                    { path: "quizzes/question/:id", element: <Question /> },
                    { path: "Allquestions", element: <Questions /> },
                    {
                        path: "questions/edit/:quizId/:questionId",
                        element: <EditQuestion />,
                    },

                    {
                        path: "answers",
                        element: <Answers />,
                    },
                ],
            },
        ],
    },
]);

export default router;
