<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnswerQuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'answer' => $this->answer,
            'email' => $this->email,
            'quizzes' => new QuizzesResource($this->quizzes),
            'questions' => new QuestionsResource($this->questions)
        ];
    }
}
