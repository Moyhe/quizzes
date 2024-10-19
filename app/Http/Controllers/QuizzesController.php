<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuizzesRequest;
use App\Http\Requests\UpdateQuizzesRequest;
use App\Http\Resources\QuizzesResource;
use App\Models\Quizzes;
use App\Traits\ModelNotFound;
use Illuminate\Support\Str;

class QuizzesController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return QuizzesResource::collection(Quizzes::with('questions')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizzesRequest $request)
    {
        $data = $request->validated();

        $quizzes =  Quizzes::create([
            'title' => $data['title'],
            'slug' => Str::slug(request('title'))
        ]);

        return new QuizzesResource($quizzes);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $quiz)
    {
        $quizzes = Quizzes::query()->findOrFail($quiz);

        return new QuizzesResource($quizzes->load('questions'));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizzesRequest $request, string $quiz)
    {
        $quizzes = Quizzes::query()->findOrFail($quiz);

        $quizzes->update($request->validated());

        return new QuizzesResource($quizzes);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $quiz)
    {
        $quizzes = Quizzes::query()->findOrFail($quiz);

        $quizzes->delete();

        return response('', 201);
    }
}
