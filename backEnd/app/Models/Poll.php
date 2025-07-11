<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    protected $fillable = ["name"];


    public function classes()
    {
        return $this->hasMany(Classes::class, 'polls_id');
    }
}