<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonsController extends Controller
{
    // عرض كل الدروس
    public function index()
    {
        $lessons = Lesson::with(['classroom', 'subject', 'teacher', 'class'])->get();
        return response()->json($lessons);
    }

    // عرض درس معين
    public function show($id)
    {
        $lesson = Lesson::with(['classroom', 'subject', 'teacher', 'class'])->findOrFail($id);
        return response()->json($lesson);
    }

    // إضافة درس جديد
    public function store(Request $request)
    {
        $request->validate([
            'classroom_id' => 'required|exists:classrooms,id',
            'subject_id' => 'required|exists:subjects,id',
            'teacher_id' => 'required|exists:teachers,id',
            'class_id' => 'required|exists:classes,id',
            'day' => 'required|string',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s',
        ]);

        $lesson = Lesson::create([
            'classroom_id' => $request->classroom_id,
            'subject_id' => $request->subject_id,
            'teacher_id' => $request->teacher_id,
            'class_id' => $request->class_id,
            'day' => $request->day,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
        ]);

        return response()->json($lesson, 201);
    }

    // تحديث درس معين
    public function update(Request $request, $id)
    {
        $lesson = Lesson::findOrFail($id);

        $request->validate([
            'classroom_id' => 'required|exists:classrooms,id',
            'subject_id' => 'required|exists:subjects,id',
            'teacher_id' => 'required|exists:teachers,id',
            'class_id' => 'required|exists:classes,id',
            'day' => 'required|string',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'required|date_format:H:i:s',
        ]);

        $lesson->update([
            'classroom_id' => $request->classroom_id,
            'subject_id' => $request->subject_id,
            'teacher_id' => $request->teacher_id,
            'class_id' => $request->class_id,
            'day' => $request->day,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
        ]);

        return response()->json($lesson);
    }

    // حذف درس معين
    public function destroy($id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();

        return response()->json(['message' => 'Lesson deleted successfully']);
    }
}