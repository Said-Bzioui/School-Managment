<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    use HasFactory;

    protected $fillable = [ 
        'title',
        'description',
        'date',
        'start_time',
        'end_time',
        'created_by',
        'class_id',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function class()
    {
        return $this->belongsTo(Classes::class);
    }
}