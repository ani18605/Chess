var Queen = function(config){
    this.type = 'queen';
    this.constructor(config);
};



Queen.prototype = new Piece({});

Queen.prototype.isValidMove = function(newPosition){
    let currCol = this.position.charAt(0);
    let currRow = this.position.charAt(1);
    let newCol = newPosition.col;
    let newRow = newPosition.row;
    if(currCol === newCol || currRow === newRow){
        return true;
    }
    else{
        
        while(currCol<='H' && currCol>='A' && currRow<='8' && currRow>='1'){
            if(currCol === newCol && currRow === Number(newRow)){
                return true;
            }
            currCol = String.fromCharCode(currCol.charCodeAt(0) + 1);
            currRow ++;
        }

        currCol = this.position.charAt(0);
        currRow = this.position.charAt(1);

        while(currCol<='H' && currCol>='A' && currRow<='8' && currRow>='1'){
            if(currCol === newCol && currRow === Number(newRow)){
                console.log("here");
                return true;
            }
            currCol = String.fromCharCode(currCol.charCodeAt(0) + 1);
            currRow --;
        }

        currCol = this.position.charAt(0);
        currRow = this.position.charAt(1);

        while(currCol<='H' && currCol>='A' && currRow<='8' && currRow>='1'){
            if(currCol === newCol && currRow === Number(newRow)){
                return true;
            }
            currCol = String.fromCharCode(currCol.charCodeAt(0) - 1);
            currRow ++;
        }

        currCol = this.position.charAt(0);
        currRow = this.position.charAt(1);

        while(currCol<='H' && currCol>='A' && currRow<='8' && currRow>='1'){
            if(currCol === newCol && currRow ===  Number(newRow)){
                return true;
            }
            currCol = String.fromCharCode(currCol.charCodeAt(0) - 1);
            currRow --;
        }
    }
    
    return false;
}

Queen.prototype.isPathClear = function(newPosition) {
    let currCol = this.position.charAt(0);
    let currRow = this.position.charAt(1);
    let targetCol = newPosition.col;
    let targetRow = newPosition.row;
    let board = this.Board;

    // Get differences between new and current positions
    let colDiff = targetCol.charCodeAt(0) - currCol.charCodeAt(0);
    let rowDiff = targetRow - currRow;

    // Normalize the movement direction (-1, 0, 1)
    let colStep = Math.sign(colDiff);
    let rowStep = Math.sign(rowDiff);

    // Make sure the move is along a valid path for a Queen (straight or diagonal)
    if (Math.abs(colDiff) !== Math.abs(rowDiff) && colDiff !== 0 && rowDiff !== 0) {
        return false; // Invalid Queen move
    }

    // Move one step at a time along the path and check if there's a piece
    let currentColCode = currCol.charCodeAt(0) + colStep;
    let currentRow = parseInt(currRow) + rowStep;

    while (currentColCode !== targetCol.charCodeAt(0) || currentRow !== parseInt(targetRow)) {
        let currentPosition = {
            col: String.fromCharCode(currentColCode),
            row: currentRow.toString()
        };

        // Check if there's a piece at the current position
        if (board.getPieceAt(currentPosition)) {
            return false;
        }

        // Move to the next square in the path
        currentColCode += colStep;
        currentRow += rowStep;
    }

    return true; // Path is clear
};

        

Queen.prototype.moveTo = function(newPosition){
    
    if(this.isValidMove(newPosition) && this.isPathClear(newPosition)){
        this.position = newPosition.col + newPosition.row;
        this.render();
    }
    else {
        console.warn("Invalid move for queen");
    }
}