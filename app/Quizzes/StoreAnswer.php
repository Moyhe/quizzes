<?php

namespace App\Quizzes;

use App\Models\AnswerQuestion;
use App\QuizExceptions\QuizExecptionsError;
use Exception;

readonly class StoreAnswer
{

    public function answer(array $answers, string $quizId, array $data)
    {
        foreach ($answers as $answer) {
            $answerQuestion = AnswerQuestion::where([
                ['quizzes_id', '=', $quizId],
                ['email', '=', $data['email']],
                ['question_id', '=', $answer['question_id']],
            ])->first();

            if ($answerQuestion) {
                QuizExecptionsError::throw();
            }

            AnswerQuestion::create([
                'quizzes_id' => $quizId,
                'question_id' => $answer['question_id'],
                'email' => $data['email'],
                'answer' => $answer['answer'],
            ]);
        }
    }
}
