<?php

use App\Http\Controllers\AnswerQuestionController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizzesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// admin

Route::controller(QuizzesController::class)->group(function () {
    Route::get('/quizzes', 'index');
    Route::post('/quizzes', 'store');
    Route::get('/quizzes/{quiz}', 'show');
    Route::patch('/quizzes/{quiz}', 'update');
    Route::delete('/quizzes/{quiz}', 'destroy');
});

Route::get('answers', [AnswerQuestionController::class, 'index']);
Route::get('/quizzes/{quiz}/answers', [AnswerQuestionController::class, 'show']);

Route::get('questions', [QuestionController::class, 'index']);
Route::apiResource('quizzes.questions', QuestionController::class);

// users
Route::post('/quizzes/{quiz}/answers', [AnswerQuestionController::class, 'store']);
