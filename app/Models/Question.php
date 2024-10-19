<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Question extends Model
{
    /**
     * Get the quizzes that owns the Question
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function quizzes(): BelongsTo
    {
        return $this->belongsTo(Quizzes::class);
    }
}
