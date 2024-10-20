<?php

namespace App\Observers;

use App\Models\Quizzes;

class QuizObserver
{
    /**
     * Handle the Quizzes "deleted" event.
     */
    public function deleted(Quizzes $quiz): void
    {
        $quiz->questions()->each(function ($question) {
            $question->answers()->delete();
            $question->delete();
        });
    }
}
