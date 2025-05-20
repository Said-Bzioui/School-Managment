<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;

class ExamsController extends Controller
{
    // جلب جميع الإمتحانات مع العلاقات
    public function index()
    {
        return Exam::with(['teacher','studentClass', 'classroom', 'subject'])->get();
    }

    // إنشاء إمتحان جديد
    public function store(Request $request)
    {
        $validated = $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'classroom_id' => 'required|exists:classrooms,id',
            'subject_id' => 'required|exists:subjects,id',
            'date' => 'required|date',
        ]);

        $exam = Exam::create($validated);
        return response()->json($exam, 201);
    }

    // جلب إمتحان واحد
    public function show($id)
    {
        return Exam::with(['teacher', 'classroom', 'subject'])->findOrFail($id);
    }

    // تعديل إمتحان
    public function update(Request $request, $id)
    {
        $exam = Exam::findOrFail($id);

        $validated = $request->validate([
            'teacher_id' => 'sometimes|exists:teachers,id',
            'classroom_id' => 'sometimes|exists:classrooms,id',
            'subject_id' => 'sometimes|exists:subjects,id',
            'date' => 'sometimes|date',
        ]);

        $exam->update($validated);
        return response()->json($exam);
    }

    // حذف الإمتحان
    public function destroy($id)
    {
        $exam = Exam::findOrFail($id);
        $exam->delete();

        return response()->json(null, 204);
    }
}