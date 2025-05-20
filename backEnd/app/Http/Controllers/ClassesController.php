<?php
namespace App\Http\Controllers;

use App\Models\Classes;
use Illuminate\Http\Request;

class ClassesController extends Controller
{
    public function index()
    {
        $classes = Classes::with(['students'])->get();
        return response()->json($classes);
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