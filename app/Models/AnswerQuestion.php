<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnswerQuestion extends Model
{
    /**
     * Get the quiz that owns the AnswerQuestion
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function quizzes(): BelongsTo
    {
        return $this->belongsTo(Quizzes::class);
    }

    /**
     * Get the questions that owns the AnswerQuestion
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function questions(): BelongsTo
    {
        return $this->belongsTo(Question::class, 'question_id');
    }
}
