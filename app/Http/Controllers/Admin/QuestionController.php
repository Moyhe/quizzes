<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Http\Resources\QuestionsResource;
use App\Models\Question;
use App\Models\Quizzes;
use App\Traits\ModelNotFound;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Quizzes $quiz)
    {
        return QuestionsResource::collection($quiz->questions()->paginate(10));
    }

    public function AllQuestions()
    {
        return QuestionsResource::collection(Question::query()->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuestionRequest $request, string $quiz)
    {
        $quiz = Quizzes::findOrFail($quiz);

        $data = $request->validated();

        foreach ($data['questions'] as $question) {
            $quiz->questions()->create([
                'questions' => $question['question']
            ]);
        }

        return response()->json(['success' => 'question created successfullu']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $quiz, string $question)
    {
        $quiz = Quizzes::findOrFail($quiz);

        $questions = $quiz->questions()->findOrFail($question);

        return new QuestionsResource($questions);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuestionRequest $request, string $quiz, string $question)
    {
        $quiz = Quizzes::findOrFail($quiz);

        $question = $quiz->questions()->findOrFail($question);

        $data = $request->validated();

        $question->update($data);

        return new QuestionsResource($question);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $quiz, string $question)
    {
        $quiz = Quizzes::findOrFail($quiz);

        $question = $quiz->questions()->findOrFail($question);

        $question->delete();

        return response('', 201);
    }
}
