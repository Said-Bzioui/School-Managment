<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    use HasFactory;
    protected $table = 'classes';

    protected $fillable = ['name', 'niveu', 'filier', 'capacite', 'polls_id', 'teacher_id'];

    public function poll()
    {
        return $this->belongsTo(Poll::class, 'polls_id');
    }


    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'class_subjects', 'class_id', 'subject_id');
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'class_id');
    }
    public function lessons()
    {
        return $this->hasMany(Lesson::class, 'class_id');
    }
    // Relationships with result
    public function result()
    {
        return $this->hasMany(Result::class, 'class_id');
    }
    // Relationships with exam
    public function exams()
    {
        return $this->hasMany(Exam::class, 'class_id');
    }
    public function absences()
    {
        return $this->hasMany(absences::class);
    }
}