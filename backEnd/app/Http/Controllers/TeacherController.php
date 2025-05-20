<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index()
    {
        return Teacher::with('user','subjects','classes')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'speciality' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt('password'),
            'role' => 'teacher',
        ]);

        $teacher = Teacher::create([
            'user_id' => $user->id,
            'speciality' => $request->speciality,
            'hire_date' => $request->hire_date,
        ]);

        return response()->json(['teacher' => $teacher], 201);
    }

    public function show($id)
    {
        return Teacher::with('user')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->update($request->all());

        return response()->json(['teacher' => $teacher]);
    }

    public function destroy($id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->user()->delete();
        $teacher->delete();

        return response()->json(['message' => 'Teacher deleted']);
    }
}