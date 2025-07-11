<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\Student;
use Illuminate\Http\Request;

class ClassSubjectsController extends Controller
{
    public function class_subject($id)
    {
        $findClass = Classes::findOrFail($id);
        $class = Classes::with(['subjects' => function ($query) use ($findClass) {
            $query->where('filier', $findClass->filier)
                ->where('niveu', $findClass->niveu);
        }])->findOrFail($id);
        if (!$class) {
            return response()->json(['message' => 'Classroom not found'], 404);
        }

        return response()->json([
            'class' => $class,
            'subjects' => $class->subjects
        ]);
    }
}