<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnswerQuestionRequest;
use App\Http\Requests\UpdateAnswerQuestionRequest;
use App\Http\Resources\AnswerQuestionResource;
use App\Models\AnswerQuestion;
use App\Models\Quizzes;

class AnswerQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AnswerQuestionResource::collection(AnswerQuestion::query()->with(['questions', 'quizzes'])->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnswerQuestionRequest $request, Quizzes $quiz)
    {
        // Ensure guest only answers once

        $data = $request->validated();

        $answer = AnswerQuestion::where([
            ['quizzes_id', $quiz->id],
            ['email', request('email')]
        ])->first();


        if ($answer?->exists()) {
            return response()->json(['message' => 'You have already answered this quiz.'], 403);
        }

        // Store answer
        $answer = AnswerQuestion::create([
            'quizzes_id' => $quiz->id,
            'question_id' => $data['question_id'],
            'email' => $data['email'],
            'answer' => $data['answer'],
        ]);

        return new AnswerQuestionResource($answer);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quizzes $quiz)
    {
        $answer =  AnswerQuestion::where('quizzes_id', $quiz->id)->get();

        return new AnswerQuestionResource($answer);
    }
}
