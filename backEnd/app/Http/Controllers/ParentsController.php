<?php

namespace App\Http\Controllers;

use App\Models\Parents;
use App\Models\User;
use Illuminate\Http\Request;

class ParentsController extends Controller
{
    public function index()
    {
        return Parents::with(['user', 'student'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'relation' => 'required',
            'student_id' => 'required|exists:students,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt('password'),
            'role' => 'parent',
        ]);

        $parent = Parents::create([
            'user_id' => $user->id,
            'relation' => $request->relation,
            'student_id' => $request->student_id,
        ]);

        return response()->json(['parent' => $parent], 201);
    }

    public function show($id)
    {
        return Parents::with(['user', 'student'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $parent = Parents::findOrFail($id);
        $parent->update($request->all());

        return response()->json(['parent' => $parent]);
    }

    public function destroy($id)
    {
        $parent = Parents::findOrFail($id);
        $parent->user()->delete();
        $parent->delete();

        return response()->json(['message' => 'Parent deleted']);
    }
}