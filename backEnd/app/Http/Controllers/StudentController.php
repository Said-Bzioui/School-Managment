<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    
    // 🟢 عرض جميع التلاميذ
    public function index()
    {
        return Student::with('user','class')->get();
    }

    // 🟢 إضافة تلميذ جديد
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'student_code' => 'required|unique:students',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt('password'),
            'role' => 'student',
        ]);

        $student = Student::create([
            'user_id' => $user->id,
            'student_code' => $request->student_code,
            'birth_date' => $request->birth_date,
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