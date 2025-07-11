<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonsController extends Controller
{
    public function index()
    {
        $lessons = Lesson::with(['classroom', 'subject', 'teacher', 'class'])->paginate(10);
        return response()->json($lessons);
    }

    public function get_student_lessons($id)
    {

        $class = Classes::with(['lessons' => function ($query) {
            $query->with('classroom', 'subject', 'teacher');
        }])->findOrFail($id);
        if (!$class) {
            return response()->json(['message' => 'Classroom not found'], 404);
        }

        return response()->json([
            'classData' => $class,
        ]);
    }

    public function show($id)
    {
        $lesson = Lesson::with(['classroom', 'subject', 'teacher', 'class'])->findOrFail($id);
        return response()->json($lesson);
    }

    public function store(Request $request)
    {
        $request->validate([
            'classroom_id' => 'required|exists:classrooms,id',
            'subject_id' => 'required|exists:subjects,id',
            'teacher_id' => 'required|exists:teachers,id',
            'class_id' => 'required|exists:classes,id',
            'day' => 'required|string',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
        ]);


        $existingLesson = Lesson::where('day', $request->day)
            ->where(function ($query) use ($request) {
                $query
                    ->where('class_id', $request->class_id)
                    ->orWhere('teacher_id', $request->teacher_id)
                    ->orWhere('classroom_id', $request->classroom_id);  
            })
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_time', [$request->start_time, $request->end_time])
                    ->orWhereBetween('end_time', [$request->start_time, $request->end_time])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('start_time', '<=', $request->start_time)
                            ->where('end_time', '>=', $request->end_time);
                    });
            })
            ->first();

        if ($existingLesson) {
            return response()->json([
                'message' => 'Il existe déjà '
            ], 422);
        }

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