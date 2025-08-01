<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillable = ['nom','prenom','user_id', 'photo'];

        public function user()
    {
        return $this->belongsTo(User::class);
    }
}