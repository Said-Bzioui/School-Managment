<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    public function index()
    {
        $classrooms = Classroom::with('lessons')->paginate(10);
        return response()->json($classrooms);
    }


    public function show($id)
    {
        $classroom = Classroom::with('lessons')->findOrFail($id);
        return response()->json($classroom);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'capacity' => 'required|integer',
        ]);

        $classroom = Classroom::create($request->all());
        return response()->json($classroom, 201);
    }

    public function update(Request $request, $id)
    {
        $classroom = Classroom::findOrFail($id);
        $classroom->update($request->all());

        return response()->json($classroom);
    }

    public function destroy($id)
    {
        $classroom = Classroom::findOrFail($id);
        $classroom->delete();

        return response()->json(null, 204);
    }
}