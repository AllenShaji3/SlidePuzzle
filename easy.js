// distance: number of pixels a puzzle piece will move
const DISTANCE = 100;
var i, a;
var tileid;
const tile = document.getElementsByTagName("div");
/**********************************
// STEP 1 - Create puzzlePieces data structure.
// I suggest using an array of objects but feel free to change that
// An example of a puzzle piece object could be: { name: ".box1", x: 0, y: 0 }
**********************************/
const puzzlePieces = [
  { name: ".box1", x: 0, y: 00 },
  { name: ".box2", x: 100, y: 0 },
  { name: ".box3", x: 200, y: 0 },
  { name: ".box4", x: 300, y: 0 },
  { name: ".box5", x: 00, y: 100 },
  { name: ".box6", x: 100, y: 100 },
  { name: ".box7", x: 200, y: 100 },
  { name: ".box8", x: 300, y: 100 },
  { name: ".box9", x: 00, y: 200 },
  { name: ".box10", x: 100, y: 200 },
  { name: ".box11", x: 200, y: 200 },
  { name: ".box12", x: 300, y: 200 },
  { name: ".box13", x: 00, y: 300 },
  { name: ".box14", x: 100, y: 300 },
  { name: ".box15", x: 200, y: 300 }
];

// blankSpace: initialize blank square as last piece so as to remember where it is.
// Will eventually use it to ask direction of clicked puzzle piece(s).
// Once pieces move, must remember to update x,y values to new blank space coords
const blankSpace = { x: 300, y: 300, order: 16 };

// I'm structuring my program sort of like how Vue does it - all in my puzzle object below.
const puzzle = {
  pieces: puzzlePieces,
  distance: DISTANCE,
  blankSpace,
  currentPiece: null,
  directionToMove: "",
  initialize: function() {
    setTimeout(puzzle.shuffle, 1000);
    /************************************     
    // STEP 2 - Implement initialize function such that it
    // attache click event handlers for each piece
    // and within that, invokes the slide function
    ***************************************/

    for (
      i = 0;
      i < tile.length;
      i++ //Using for loop to assign click event to each tiles.
    ) {
      tile[i].addEventListener("click", function(e) {
        puzzle.currentPiece = e.target;
        puzzle.slide();
      });
    }
    // show puzzle pieces
    this.display();
  },
  display: function() {
    // initialize pieces to their proper order
    this.pieces.forEach(piece => {
      const pieceDOM = document.querySelector(piece.name);
      TweenLite.set(pieceDOM, { x: piece.x, y: piece.y });
    });
  },
  slide: function() {
    // call isMoveable to find out direction to move
    // remember to adjust coordinates including adjusting blank piece's coordinates
    /************************************
    // STEP 4 - Implement slide function so that you set x,y coordinates of appropriate puzzle piece(s)
    *********************************/
    this.MovDirection = this.isMoveable(); //Saving the blank space to MovDirection
    var MovTile = this.pieces[this.currentPiece.dataset.idx];
    switch (this.MovDirection) {
      //Using switch case to move the tile to their respective space
      case "up":
        MovTile.y -= 100;
        blankSpace.y += 100;
        break;
      case "down":
        MovTile.y += 100;
        blankSpace.y -= 100;
        break;
      case "right":
        MovTile.x += 100;
        blankSpace.x -= 100;
        break;
      case "left":
        MovTile.x -= 100;
        blankSpace.x += 100;
        break;
    }

    // Now animate current puzzle piece now that x, y coordinates have been set above
    TweenMax.to(this.currentPiece, 0.17, {
      x: this.pieces[this.currentPiece.dataset.idx].x,
      y: this.pieces[this.currentPiece.dataset.idx].y,
      ease: Power0.easeNone
    });
  },
  isMoveable: function() {
    /********************************************
    // STEP 3 - Implement isMoveable function to find out / return which direction to move
    // Is the clicked piece movable?
    // If yes, then return a direction to one of: "up", "down", "left", "right"
    // If no, then return a direction of ""
     ******************************************/
    var MovTile = this.pieces[this.currentPiece.dataset.idx];
    if (MovTile.y == blankSpace.y) {
      //checking for blank space and returning the direction to move
      if (MovTile.x - 100 == blankSpace.x) {
        return "left";
      }
      if (MovTile.x + 100 == blankSpace.x) {
        return "right";
      } else {
        return "";
      }
    } else if (MovTile.x == blankSpace.x) {
      if (MovTile.y - 100 == blankSpace.y) {
        return "up";
      }
      if (MovTile.y + 100 == blankSpace.y) {
        return "down";
      } else {
        return "";
      }
    } else {
      return "";
    }
  },
  shuffle: function() {
    tilearr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    var i = tilearr.length - 1;
    for (var j = 0; j < 1000; j++) {
      var shuffTIle = Math.floor(Math.random() * (i + 1));
      puzzle.currentPiece = tile[shuffTIle];
      puzzle.slide();
      console.log(shuffTIle);
    }
  }
};

puzzle.initialize();

/* 
STEP 5 - Comment each function implemented
STEP 6 - Submit to github
STEP 7 - host on web server
*/
