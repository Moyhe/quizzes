<?php

namespace App\QuizExceptions;

use Exception;
use Illuminate\Http\Response;

class QuizExecptionsError extends Exception
{

    public static function throw()
    {
        $instance = new static("you alreay answer this quiz", Response::HTTP_UNPROCESSABLE_ENTITY);

        throw $instance;
    }
}
