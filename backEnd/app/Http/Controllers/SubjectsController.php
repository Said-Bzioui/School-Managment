<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{

    public function index()
    {
        return response()->json(Subject::with(['teacher'])->paginate(10));
    }

    public function show($id)
    {
        $subject = Subject::with(['teacher'])->findOrFail($id);
        return response()->json($subject);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'niveu' => 'required',
            'filier' => 'required',
            'coificient' => 'required|integer',
            'masse_horaire' => 'required|integer',
            'teacher_id' => 'required|exists:teachers,id'
        ]);

        $subject = Subject::create($request->all());
        return response()->json($subject, 201);
    }

    public function update(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'masse_horaire' => 'sometimes|required|integer',
            'teacher_id' => 'sometimes|required|exists:teachers,id'
        ]);

        $subject->update($request->all());
        return response()->json($subject);
    }

    public function destroy($id)
    {
        $subject = Subject::findOrFail($id);
        $subject->delete();
        return response()->json(['message' => 'Subject deleted successfully']);
    }
}