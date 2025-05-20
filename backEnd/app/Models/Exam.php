<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'classroom_id',
        'class_id',
        'subject_id',
        'date',
    ];

    // العلاقة مع الأستاذ
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    // العلاقة مع القسم
    public function studentClass()
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }


    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    // العلاقة مع المادة
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}