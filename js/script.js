$(document).ready(function(){
  $(".sq").on('click', function(){
    if (this.innerHTML =="-" ){
      var that = this;
      $(that).text(game.turn);
      var space = $(this).data("value");
      game = new_board(space, game);
      ai.minmax(game);
      console.log("game turn:  " + game.turn);
      $('div').find("[data-value="+ai.choice.toString()+"]").text(game.turn);
      game = new_board(ai.choice, game);
      if ( over(game) ){
        if (won(game, "x")) {
          $("#over").append("x won! click here for new game");
        } else if (won(game, "o")){
          $("#over").append("o won! click here for new game");
        } else {
          $("#over").append("its a draw! click here for new game");
        }
      }
    } else {
      console.log("space already taken");
    }
  })

  $('#over').on("click", function(e){
    e.preventDefault();
    window.location.reload();
  })
})

var game = {
  board: new Array(9),
  turn: "x",
  depth: 0,
}


function won(game, player){
  var board = game.board;
  var horizontals = [ [0, 1, 2] ,[3, 4, 5], [6, 7, 8] ];
  var verticals = [ [0, 3, 6], [1, 4, 7], [2, 5, 8] ];
  var diagonals = [ [0, 4, 8], [2, 4, 6] ];
  var winning_moves = [horizontals, verticals, diagonals];
  for (var group=0; group < winning_moves.length; group++){
    for (var move=0; move < winning_moves[group].length; move++){
      var set = winning_moves[group][move];
      var check = [ board[set[0]], board[set[1]], board[set[2]] ];
      if ( equal_arrays(check, [player, player, player]) ) {
        return true;
      }
    }
  }
  return false;
}

function equal_arrays(one, two){
  if (one.length != two.length){
    return false;
  }
  for (var i=0; i<one.length; i++){
    if(one[i] != two[i]){
      return false;
    }
  }
  return true;
}

function over(game){
  if (won(game, "x") || won(game, "o")){
    return true;
  } else if (!spaces_left(game)){
    return true;
  }
  else {
    return false 
  }
}

function spaces_left(game){
  var board = game.board;
  for (var i = 0; i < board.length;i++){
    if (board[i]==undefined){
      return true;
    }
  }
  return false; 
}

function availabe_moves(game){
  var board = game.board;
  var spaces = [];
  for (var i =0; i < board.length; i++){
    if (board[i] == undefined){
      spaces.push(i);
    }
  }
  return spaces;
}

function score(game){
  if (won(game, "o")) {
    return 10 - game.depth;
  } else if (won(game, "x")) {
    return game.depth -10;
  } else {
    return 0;
  }
}

new_board = function(move, game){
  var board = game.board.slice();
  board[move] = game.turn;
  var turn;
  if (game.turn=="x"){
    turn = "o";
  } else if (game.turn=="o") {
    turn ="x";
  }
  var depth = game.depth + 1;
  return {board: board, turn: turn, depth: depth};
}

var ai;

var ai = {
  choice: undefined,
  minmax: function(game){
    if (over(game)) {
      return score(game);
    }
    var moves =[];
    var scores = [];
    availabe_moves(game).forEach(function(move){
      nBoard = new_board(move, game);
      scores.push(ai.minmax(nBoard));
      moves.push(move);
    });

    if (game.turn == "o"){
      var max_index = scores.indexOf(scores.max());
      ai.choice = moves[max_index]
      return scores[max_index]
    } else {
      var min_index = scores.indexOf(scores.min());
      ai.choice = moves[min_index]
      return scores[min_index]
    }
  }
}




// Utilities 
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};