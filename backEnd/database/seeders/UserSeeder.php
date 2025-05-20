<?php

namespace Database\Seeders;

use App\Models\Parents;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 👨‍💼 Admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // 👨‍🎓 Student
        $studentUser = User::create([
            'name' => 'Student One',
            'email' => 'student@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        $student = Student::create([
            'user_id' => $studentUser->id,
            'cef' => '2002112000438',
            'birth_date' => '2005-03-10',
            'address' => '123 School St',
        ]);

        // 👩‍🏫 Teacher
        $teacherUser = User::create([
            'name' => 'Teacher One',
            'email' => 'teacher@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
        ]);

        Teacher::create([
            'user_id' => $teacherUser->id,
            'speciality' => 'Mathematics',
            'hire_date' => '2020-09-01',
        ]);

        // 👨‍👩‍👦 Parent
        $parentUser = User::create([
            'name' => 'Parent One',
            'email' => 'parent@example.com',
            'password' => Hash::make('password'),
            'role' => 'parent',
        ]);

        Parents::create([
            'user_id' => $parentUser->id,
            'relation' => 'father',
            'student_id' => $student->id,
        ]);
    }
}