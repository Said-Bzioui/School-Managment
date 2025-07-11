<?php

use App\Http\Controllers\AbsencesController;
use App\Http\Controllers\Admin\DashsController;
use App\Http\Controllers\AnnouncementsController;
use App\Http\Controllers\AssignmentsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\ParentsController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\ClassSubjectsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\ExamsController;
use App\Http\Controllers\LessonsController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\SubjectsController;
use App\Models\Poll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
// ---------------------Auth Routes----------------------

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'login'])
    ->middleware('guest')
    ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.store');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');





// ======================ADMIN ROUTS=========================

Route::get('/counting', [DashsController::class, 'counting'])->name('counting');
Route::get('/Students_Gender', [DashsController::class, 'Students_Gender'])->name('Students_Gender');


// ============================class_subject==============================
Route::get('/classes/{id}/subjects', [ClassSubjectsController::class, 'class_subject']);
// ============================get_class_exams==============================
Route::get('/classes/{id}/exams', [ClassesController::class, 'get_class_exams']);
// ============================get_student_lessons==============================
Route::get('/classes/{id}/lessons', [LessonsController::class, 'get_student_lessons']);
// ==========================get_class_by_poll============================
Route::get('/poll/{id}/classes', [PollController::class, 'get_class_by_poll']);

// ==========================================================
// ==========================================================
// ==========================================================
// Students Routs
Route::apiResource('students', StudentController::class);
// teachers Routs
Route::apiResource('teachers', TeacherController::class);
// parents Routs
Route::apiResource('parents', ParentsController::class);
// POLL Routs
Route::apiResource('polls', PollController::class);
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
// absences Routs
Route::apiResource('absences', AbsencesController::class);