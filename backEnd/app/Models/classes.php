<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    use HasFactory;
    protected $table = 'classes';

    protected $fillable = ['name', 'level', 'capacite','teacher_id'];

    public function students()
    {
        return $this->hasMany(Student::class, 'class_id');
    }
    public function result()
    {
        return $this->hasMany(Result::class);
    }
    public function exams()
    {
        return $this->hasMany(Exam::class);
    }

}