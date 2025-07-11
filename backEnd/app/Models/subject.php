<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{

    use HasFactory;
    protected $fillable = ['name','code', 'niveu', 'filier','coificient', 'masse_horaire','done_hours', 'teacher_id'];

    // Relationships with class
public function classes()
{
    return $this->belongsToMany(Classes::class, 'class_subjects', 'subject_id', 'class_id');
}

    // Relationships with teacher
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
    // Relationships with lesson
    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }
    // Relationships with exam
    public function exams()
    {
        return $this->hasMany(Exam::class);
    }
    // Relationships with result
    public function results()
    {
        return $this->hasMany(Result::class);
    }

        public function absences()
    {
        return $this->hasMany(absences::class);
    }
}