<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absences extends Model
{
    protected $fillable = [
        'teacher_id',
        'class_id',
        'lesson_id',
        'date',
        'time',
        'absent_students',
    ];
    protected $casts = [
        'absent_students' => 'array',
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
    public function class()
    {
        return $this->belongsTo(Classes::class);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}