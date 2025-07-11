<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;

class StudentController extends Controller
{

    public function index()
    {
        return Student::with('user', 'class')->paginate(10);
    }

    public function store(Request $request)
    {

        $request->validate([
            'email' => 'required|email|unique:users',
            'nom' => 'required',
            'prenom' => 'required',
            'phone' => 'required',
            'photo' => 'nullable|image',
            'gender' => 'required',
            'class_id' => 'required',
            'birth_date' => 'required',
            'address' => 'required',
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('avatars', 'public');
        }

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        $birthDate = $request->birth_date; 

        $birthDigits = str_replace("-", "", $birthDate); 

        $randomDigits = str_pad(rand(1, 99999), rand(1, 5), '0', STR_PAD_LEFT);

        $cef = $birthDigits . $randomDigits;

        $student = Student::create([
            'user_id' => $user->id,
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'phone' => $request->phone,
            'photo' => $photoPath,
            'gender' => $request->gender,
            'class_id' => $request->class_id,
            'cef' => $cef,
            'birth_date' => $birthDate,
            'address' => $request->address,
        ]);


        return response()->json(['student' => $student], 201);
    }

    // 🟡 عرض تلميذ حسب ID
    public function show($id)
    {
        return Student::with('user')->findOrFail($id);
    }

    // 🟠 تعديل
    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);
        $student->update($request->all());

        return response()->json(['student' => $student]);
    }

    // 🔴 حذف
    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->user()->delete(); // حذف حتى الـ user
        $student->delete();

        return response()->json(['message' => 'Student deleted']);
    }
}