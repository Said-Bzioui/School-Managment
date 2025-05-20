<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'speciality',
        'hire_date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function classes()
    {
        return $this->hasMany(Classes::class);
    }
    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }
    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }
    public function exams()
    {
        return $this->hasMany(Exam::class);
    }
    public function results()
    {
        return $this->hasMany(Result::class);
    }
}