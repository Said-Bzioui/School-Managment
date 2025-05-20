<?php
namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Events;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    // عرض جميع الأحداث
    public function index()
    {
        $events = Events::with(['creator', 'class'])->get();
        return response()->json($events);
    }

    // إضافة حدث جديد
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'created_by' => 'required|exists:users,id',
            'class_id' => 'nullable|exists:classes,id',
        ]);

        $event = Events::create($request->all());

        return response()->json($event, 201);
    }

    // عرض حدث واحد
    public function show($id)
    {
        $event = Events::with(['creator', 'class'])->findOrFail($id);
        return response()->json($event);
    }

    // تعديل حدث
    public function update(Request $request, $id)
    {
        $event = Events::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'date' => 'sometimes|required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'created_by' => 'sometimes|required|exists:users,id',
            'class_id' => 'nullable|exists:classes,id',
        ]);

        $event->update($request->all());

        return response()->json($event);
    }

    // حذف حدث
    public function destroy($id)
    {
        $event = Events::findOrFail($id);
        $event->delete();

        return response()->json(['message' => 'Event deleted']);
    }
}