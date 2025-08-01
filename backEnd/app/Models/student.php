<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{

    use HasFactory;

    protected $fillable = [
        'user_id',
        'nom',
        'prenom',
        'cef',
        'birth_date',
        'photo',
        'phone',
        'gender',
        'address',
        'class_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function class()
    {
        return $this->belongsTo(Classes::class);
    }

    public function parents()
    {
        return $this->hasMany(Parents::class);
    }
    public function results()
    {
        return $this->hasMany(Result::class);
    }
}