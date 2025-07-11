<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;

class ExamsController extends Controller
{

    public function index()
    {
        return Exam::with(['teacher', 'studentClass', 'classroom', 'subject'])
            ->orderBy('subject_id')
            ->paginate(10);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'classroom_id' => 'required|exists:classrooms,id',
            'subject_id' => 'required|exists:subjects,id',
            'class_id' => 'required|exists:classes,id',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'type' => 'required',
        ]);
        $existing = Exam::where('subject_id', $request->subject_id)
            ->where('type', $request->type)
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'الامتحان من هاد النوع مسجل من قبل ✅'
            ], 422);
        }

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