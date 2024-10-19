<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

trait ModelNotFound
{

    public function modelNotFound($collection)
    {
        if (!$collection->exists()) {
            throw new ModelNotFoundException('Model Not Found');
        }
    }
}
