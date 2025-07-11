<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;

class AssignmentsController extends Controller
{
    // عرض جميع التعيينات
    public function index()
    {
        return Assignment::with(['subject', 'studentClass', 'teacher'])->paginate(10);
    }

    // إنشاء تعيين جديد
    public function store(Request $request)
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'class_id' => 'required|exists:classes,id',
            'teacher_id' => 'required|exists:teachers,id',
            'DueDate' => 'required|date',
        ]);

        $assignment = Assignment::create($request->all());

        return response()->json($assignment, 201);
    }

    // عرض تعيين محدد
    public function show($id)
    {
        $assignment = Assignment::with(['subject', 'classroom', 'teacher'])->findOrFail($id);
        return response()->json($assignment);
    }

    // تعديل تعيين
    public function update(Request $request, $id)
    {
        $assignment = Assignment::findOrFail($id);

        $request->validate([
            'subject_id' => 'sometimes|exists:subjects,id',
            'class_id' => 'sometimes|exists:classrooms,id',
            'teacher_id' => 'sometimes|exists:teachers,id',
            'DueDate' => 'sometimes|date',
        ]);

        $assignment->update($request->all());

        return response()->json($assignment);
    }

    // حذف تعيين
    public function destroy($id)
    {
        Assignment::destroy($id);
        return response()->json(['message' => 'Assignment deleted successfully']);
    }
}