<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ToDoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/Lists',[ToDoController::class,'getAllList_db']);
Route::get('/listItems/{toDosId}',[ToDoController::class,'getListItems']);
Route::delete('/delAll/{toDosId}',[ToDoController::class,'delAllListsAndItems']);

Route::post('/addList',[ToDoController::class,'sendListName']);
Route::post('/addItem',[ToDoController::class,'sendItemName']);
Route::patch('/checkItem/{itemId}',[ToDoController::class,'checkItem']);
Route::delete('/delItem/{itemId}',[ToDoController::class,'delTodoItem']);
Route::patch('/renameItem/{itemId}',[ToDoController::class,'renameTodoItem']);

