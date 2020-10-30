<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <style>
        .card-header {
            height: 65px;
        }

        .card-body {
            min-height: 300px;
        }

        .close {
            color: red;
            height: 30px;
            width: 30px;
            position: absolute;
            right: 0px;
        }

        .check_item_true {
            text-decoration: line-through;
        }
    </style>

    <title>todo</title>
</head>

<body>
    <div class="container">
        <div class="row mt-4">
            <div class="col-5 text-center">
                <div class="card bg-light mb-3">
                    <div class="card-header">
                        <input type="text" id="new_list_name" placeholder='enter: '>
                        <button type="submit" id="send_list_name" class="btn-sm btn-outline-success"
                            onclick="sendListName()"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">To do list</h5>
                        <div class="card-text row" id='list_name'>

                        </div>
                    </div>
                </div>
            </div>

            <div class="col-7 d-none" id="block_items">
                <div class="card bg-light mb-3">
                    <h5 class="card-header text-center" id="todo_name">todo_name</h5>
                    <button class="close" onclick="hideTodoItems()"><i class="fa fa-times-circle"
                            aria-hidden="true"></i></button>
                    <div class="card-body">
                        <div class="card-text my-2">
                            <input type="text" id="add_todo_item" placeholder='enter: '>
                            <button type="submit" id="send_todo_item" class="btn-sm btn-success"
                                onclick="SendTodoItem()"><i class="fa fa-pencil-square-o"
                                    aria-hidden="true"></i></button>
                        </div>
                        <div id="todo_items">
                            <div class="row">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
        crossorigin="anonymous"></script>
    <script src="./functions.js"></script>
</body>

</html>