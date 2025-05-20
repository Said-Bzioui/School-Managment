<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{

    use HasFactory;
    protected $fillable = [
        'subject_id',
        'class_id',
        'teacher_id',
        'student_id',
        'type',
        'note',
        'date',
    ];

    // العلاقة مع المادة
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    // العلاقة مع القسم
    public function studentClass()
    {
        return $this->belongsTo(Classes::class);
    }

    // العلاقة مع الأستاذ
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    // العلاقة مع التلميذ
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}