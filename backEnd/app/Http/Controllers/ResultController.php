<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    // عرض جميع النتائج
    public function index()
    {
        return response()->json(Result::with(['student', 'teacher', 'subject'])->get());
    }

    // تخزين نتيجة جديدة
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'teacher_id' => 'required|exists:teachers,id',
            'subject_id' => 'required|exists:subjects,id',
            'classroom_id' => 'required|exists:classrooms,id',
            'type' => 'required|in:examen,controle,devoir',
            'note' => 'required|numeric|min:0|max:20',
            'date' => 'required|date',
        ]);

        $result = Result::create($request->all());

        return response()->json($result, 201);
    }

    // عرض نتيجة واحدة
    public function show($id)
    {
        $result = Result::with(['student', 'teacher', 'subject'])->findOrFail($id);
        return response()->json($result);
    }

    // تحديث نتيجة
    public function update(Request $request, $id)
    {
        $result = Result::findOrFail($id);

        $request->validate([
            'note' => 'nullable|numeric|min:0|max:20',
            'type' => 'nullable|in:examen,controle,devoir',
            'date' => 'nullable|date',
        ]);

        $result->update($request->all());

        return response()->json($result);
    }

    // حذف نتيجة
    public function destroy($id)
    {
        $result = Result::findOrFail($id);
        $result->delete();

        return response()->json(['message' => 'Result deleted successfully.']);
    }
}