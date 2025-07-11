<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Announcement;
use App\Models\Announcements;

class AnnouncementsController extends Controller
{
    // عرض جميع الإعلانات
    public function index()
    {
        return response()->json(Announcements::latest()->paginate(10));
    }

    // إضافة إعلان جديد
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'user_id' => 'nullable|exists:users,id',
            'target' => 'in:all,students,teachers,parents',
        ]);

        $announcement = Announcements::create($validated);

        return response()->json(['message' => 'إعلان تمت إضافته بنجاح', 'announcement' => $announcement]);
    }

    // عرض إعلان واحد
    public function show($id)
    {
        $announcement = Announcements::findOrFail($id);
        return response()->json($announcement);
    }

    // تعديل إعلان
    public function update(Request $request, $id)
    {
        $announcement = Announcements::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'user_id' => 'nullable|exists:users,id',
            'target' => 'in:all,students,teachers,parents',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $announcement->update($validated);

        return response()->json(['message' => 'تم تحديث الإعلان بنجاح', 'announcement' => $announcement]);
    }

    // حذف إعلان
    public function destroy($id)
    {
        $announcement = Announcements::findOrFail($id);
        $announcement->delete();

        return response()->json(['message' => 'تم حذف الإعلان بنجاح']);
    }
}