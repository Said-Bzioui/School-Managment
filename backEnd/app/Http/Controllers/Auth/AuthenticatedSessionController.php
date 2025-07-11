<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Admin;
use App\Models\Parents;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class AuthenticatedSessionController extends Controller
{
    use HasApiTokens, Notifiable;
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->email)->first();


        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        if ($user->role == 'admin') {
            $userData = Admin::where('user_id', $user->id)->first();
        } elseif ($user->role == 'teacher') {
            $userData = Teacher::where('user_id', $user->id)->first();
        } elseif ($user->role == 'student') {
            $userData = Student::where('user_id', $user->id)->first();
        } else {
            $userData = Parents::where('user_id', $user->id)->first();
        }
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'userData' => $userData,
            'token' => $token,
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}