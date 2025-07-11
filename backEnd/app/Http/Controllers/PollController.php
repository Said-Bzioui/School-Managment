<?php

namespace App\Http\Controllers;

use App\Models\Poll;
use Illuminate\Http\Request;

class PollController extends Controller
{
    public function index()
    {
        $polls = Poll::all();
        return response()->json($polls);
    }

    public function get_class_by_poll($id)
    {
        $poll = Poll::with('classes')->find($id);
        return response()->json($poll);
    }
}