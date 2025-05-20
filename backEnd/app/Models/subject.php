<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{

    use HasFactory;
    protected $fillable = ['name', 'masse_horaire', 'teacher_id'];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
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