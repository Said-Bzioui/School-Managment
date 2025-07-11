<?php
namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\Exam;
use Illuminate\Http\Request;

class ClassesController extends Controller
{
    public function index()
    {
        $classes = Classes::with(['students','poll'])->paginate(10);
        return response()->json($classes);
    }

    public function get_class_exams($id)
    {
        return Exam::with(['teacher', 'studentClass', 'classroom', 'subject'])
        ->where('class_id',$id)->get();
    }
    
    public function store(Request $request)
    {
        $class = Classes::create($request->all());
        return response()->json($class, 201);
    }

    public function show($id)
    {
        $class = Classes::with(['students'])->findOrFail($id);
        return response()->json($class);
    }

    public function update(Request $request, $id)
    {
        $class = Classes::findOrFail($id);
        $class->update($request->all());
        return response()->json($class);
    }

    public function destroy($id)
    {
        Classes::destroy($id);
        return response()->json(null, 204);
    }
}