<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject_id', 
        'class_id', 
        'teacher_id', 
        'DueDate'
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }


    public function studentClass()
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }


    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}