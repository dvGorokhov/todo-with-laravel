<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListToDo extends Model
{
    protected $table = 'todo_list';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'name',
    ];
}
