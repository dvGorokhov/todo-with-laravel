<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemsToDo extends Model
{
    protected $table = 'todo_item';
    public $timestamps = false;
    protected $casts = [
        'check' => 'boolean',
      ];
    protected $fillable = [
        'id',
        'name',
        'check',
        'toDosId',
    ];
}
