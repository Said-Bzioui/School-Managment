<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    // عرض جميع الأقسام (classrooms) مع الدروس المرتبطة
    public function index()
    {
        $classrooms = Classroom::with('lessons')->get();
        return response()->json($classrooms);
    }

    // عرض قسم واحد حسب ID مع الدروس المرتبطة
    public function show($id)
    {
        $classroom = Classroom::with('lessons')->findOrFail($id);
        return response()->json($classroom);
    }

    // إضافة قسم جديد
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'capacity' => 'required|integer',
        ]);

        $classroom = Classroom::create($request->all());
        return response()->json($classroom, 201);
    }

    // تعديل قسم
    public function update(Request $request, $id)
    {
        $classroom = Classroom::findOrFail($id);
        $classroom->update($request->all());

        return response()->json($classroom);
    }

    // حذف قسم
    public function destroy($id)
    {
        $classroom = Classroom::findOrFail($id);
        $classroom->delete();

        return response()->json(null, 204);
    }
}