<?php

namespace App\Http\Controllers;

use App\Models\Absences;
use App\Models\Student;
use Illuminate\Http\Request;

class AbsencesController extends Controller
{

    public function index(Request $request)
    {
        $absences = Absences::with(['teacher.user', 'class', 'lesson'])->get();

        // تحويل absent_students إلى مع أسماء التلاميذ
        $absences = $absences->map(function ($absence) {
            $studentsData =$absence->absent_students;

            // نجيب أسماء التلاميذ حسب id
            $students = collect($studentsData)->map(function ($s) {
                $student = Student::find($s['studentId']);
                return [
                    'id' => $s['studentId'],
                    'nom' => $student?->nom,
                    'prenom' => $student?->prenom,
                    'status' => $s['status'],
                ];
            });

            return [
                'id' => $absence->id,
                'date' => $absence->date,
                'time' => $absence->time,
                'class_name' => $absence->class?->name,
                'teacher_name' => $absence->teacher?->user?->prenom . ' ' . $absence->teacher?->user?->nom,
                'lesson' => $absence->lesson,
                'students' => $students,
            ];
        });

        return response()->json($absences);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'class_id' => 'required|exists:classes,id',
            'lesson_id' => 'required|exists:lessons,id',
            'date' => 'required|date_format:Y-m-d',
            'time' => 'required',
            'absent_students' => 'required|array',
        ]);

        $absence = Absences::create([
            'teacher_id' => $request->teacher_id,
            'class_id' => $request->class_id,
            'lesson_id' => $request->lesson_id,
            'date' => $request->date,
            'time' => $request->time,
            'absent_students' => $request->absent_students,
        ]);

        return response()->json([
            'message' => 'Absence recorded successfully.',
            'data' => $absence
        ], 201);
    }
}