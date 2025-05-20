<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\Classes;
use App\Models\Student;
use App\Models\Teacher;
use App\Http\Controllers\Controller;
use App\Models\User;

class DashsController extends Controller
{
    public function counting()
    {
        return response()->json([
            'students' => Student::count(),
            'teachers' => Teacher::count(),
            'classes'  => Classes::count()
        ]);
    }
    public function Students_Gender()
    {
        $students = Student::count();
        $maleCount = User::where('role', 'student')->where('gender', 'male')->count();
        $femaleCount = User::where('role', 'student')->where('gender', 'female')->count();

        return response()->json([
            'total'=>   $students ,
            'males' => $maleCount,
            'females' => $femaleCount,
        ]);
    }
}