<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnswerQuestionRequest;
use App\Http\Requests\UpdateAnswerQuestionRequest;
use App\Http\Resources\AnswerQuestionResource;
use App\Models\AnswerQuestion;
use App\Models\Quizzes;
use App\Quizzes\StoreAnswer;


class AnswerQuestionController extends Controller
{

    public function __construct(protected StoreAnswer $storeAnswer) {}
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
        $data = $request->validated();

        $this->storeAnswer->answer($data['answers'], $quiz->id, $data);

        return response("", 201);
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
