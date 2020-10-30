<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListToDo;
use App\Models\ItemsToDo;

class ToDoController extends Controller
{
   public function getAllList_db(Request $request){
    $lists = ListToDo::all();
    return $lists;
   }

   public function sendListName(Request $request){
       $newList = ListToDo::create([
        'name'=>$request->name,
       ]);
       return  $newList;
   }

   public function delAllListsAndItems(Request $request){
       //return $request->all();
    $items = ItemsToDo::where('toDosId',$request->toDosId)->delete();
    $lists = ListToDo::find($request->toDosId)->delete();
    return $lists;
   }

   public function getListItems(Request $request){
    return ItemsToDo::where('toDosId',$request->toDosId)->get();
   }

   public function sendItemName(Request $request){
    $newItem = ItemsToDo::create([
     'name'=>$request->name,
     'toDosId'=>$request->listID
    ]);
    return  $newItem;
   }

   public function checkItem(Request $request){
      $checkItem = ItemsToDo::find($request->itemId);
      $checkItem->check = $request->check ? 1 : 0;
      $checkItem->save();
      return true;
   }

   public function delTodoItem(Request $request){
    $delItem = ItemsToDo::find($request->itemId);
    $delItem->delete();
    return true;
   }

   public function renameTodoItem(Request $request){
    $renameItem = ItemsToDo::find($request->itemId);
    $renameItem->name = $request->name;
    $renameItem->save();
    return  $renameItem;
   }
}
