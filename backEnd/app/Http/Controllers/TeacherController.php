<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index()
    {
        return Teacher::with('user', 'subjects', 'classes')->paginate(10); 
    }


    public function store(Request $request)
    {
        // dd([
        //     'nom' => $request->nom,
        //     'prenom' => $request->prenom,
        //     'phone' => $request->phone,
        //     'gender' => $request->gender,
        //     'speciality' => $request->speciality,
        // ]);
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'email' => 'required|email|unique:users',
            'phone' => 'required|string',
            'gender' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('avatars', 'public');
        }
        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt('password'),
            'role' => 'teacher',
        ]);

        $teacher = Teacher::create([
            'user_id' => $user->id,
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'phone' => $request->phone,
            'gender' => $request->gender,
            'photo' => $photoPath,
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