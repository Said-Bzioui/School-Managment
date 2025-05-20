<?php

use App\Http\Controllers\Admin\DashsController;
use App\Http\Controllers\AnnouncementsController;
use App\Http\Controllers\AssignmentsController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\ParentsController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\ExamsController;
use App\Http\Controllers\LessonsController;
use App\Http\Controllers\SubjectsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});





// ======================ADMIN ROUTS=========================

Route::get('/counting', [DashsController::class, 'counting'])->name('counting');
Route::get('/Students_Gender', [DashsController::class, 'Students_Gender'])->name('Students_Gender');


// ==========================================================
// Students Routs
Route::apiResource('students', StudentController::class);
// teachers Routs
Route::apiResource('teachers', TeacherController::class);
// parents Routs
Route::apiResource('parents', ParentsController::class);
// classes Routs
Route::apiResource('classes', ClassesController::class);
// classrooms Routs
Route::apiResource('classrooms', ClassroomController::class);
// subjects Routs
Route::apiResource('subjects', SubjectsController::class);
// lessons Routs
Route::apiResource('lessons', LessonsController::class);
// exams Routs
Route::apiResource('exams', ExamsController::class);
// results Routs
Route::apiResource('results', ResultController::class);
// assignments Routs
Route::apiResource('assignments', AssignmentsController::class);
// events Routs
Route::apiResource('events', EventsController::class);
// Announcements Routs
Route::apiResource('announcements', AnnouncementsController::class);