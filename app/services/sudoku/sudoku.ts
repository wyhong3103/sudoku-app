const Sudoku = (() => {

    const shuffle = (array: any[]) => { 
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array; 
    }; 

    const initMatrix = () => {
        const matrix = []
        for(let i = 0; i < 9; i++){
            const row = [];
            for(let j = 0; j < 9; j++){
                row.push(0);
            }
            matrix.push(row);
        }

        return matrix;
    }

    const getAvailable = (row:number, col:number, puzzle:number[][]) => {
        const found = Array(9).fill(0)
        for(let i = 0; i < 9; i++){
            if (puzzle[row][i]) found[puzzle[row][i]-1] = 1;
        }
        for(let i = 0; i < 9; i++){
            if (puzzle[i][col]) found[puzzle[i][col]-1] = 1;
        }
        for(let i = 0; i < 9; i++){
            if (puzzle[Math.floor(row/3)*3 + Math.floor(i/3)][Math.floor(col/3)*3 + i%3]) 
                found[puzzle[Math.floor(row/3)*3 + Math.floor(i/3)][Math.floor(col/3)*3 + i%3]-1] = 1;
        }
        for(let i = 0; i < 9; i++){
            found[i] = 1 - found[i]
        }
        return found
    }

    // Assuming puzzle is always valid
    const solveHelper: (row:number, col:number, puzzle:number[][]) => boolean = (row: number, col: number, puzzle: number[][]) => {
        const available = getAvailable(row, col, puzzle)
        if (!puzzle[row][col]){
            for(let i = 0; i < 9; i++){
                if (available[i]){
                    puzzle[row][col] = i+1

                    if (col < 8){
                        if (solveHelper(row, col+1, puzzle)) return true;
                    }
                    else if (row < 8){
                        if (solveHelper(row+1, 0, puzzle)) return true;
                    }
                    else return true;

                    puzzle[row][col] = 0
                }
            }
            return false;
        }else{
            return (row === 8 && col === 8 || (col < 8 ? solveHelper(row, col+1, puzzle) :  solveHelper(row+1, 0, puzzle)))
        }
    }

    const solvePuzzle = (puzzle: number[][], mask: number[][]) => {
        const cloned = JSON.parse(JSON.stringify(puzzle))

        if (solveHelper(0, 0, cloned)){
            return cloned
        }else{
            // user input
            let user = []
            for(let i = 0; i < 9; i++){
                for(let j = 0; j < 9; j++){
                    if (mask[i][j] !== 1 && cloned[i][j]){
                        user.push([i, j])
                    }
                }
            }

            user = shuffle(user);

            for(const i of user){
                cloned[i[0]][i[1]] = 0;
                if (solveHelper(0, 0, cloned)){
                    return cloned;
                }
            }
        }
        return cloned
    }

    const isSolved = (puzzle: number[][]) => {
        let ok = true;
        for(let i = 0; i < 9; i++){
            const vert = Array(9).fill(false);
            const hor = Array(9).fill(false);
            for(let j = 0; j < 9; j++){
                if (!puzzle[i][j]) return false;
                hor[puzzle[i][j]-1] = true;

                if (!puzzle[j][i]) return false;
                vert[puzzle[j][i]-1] = true;
            }

            for(let j = 0; j < 9; j++){
                ok = ok && hor[j];
                ok = ok && vert[j];
            }
        }

        for(let i = 0; i < 3; i++){
            const found = Array(9).fill(false);
            for(let j = 0; j < 9; j++){
                if (!puzzle[i*3 + Math.floor(j/3)][i*3 + j % 3]) return false;
                found[puzzle[i*3 + Math.floor(j/3)][i*3 + j % 3]-1] = true;
            }
        }

        return ok;
    }

    const getHint: (puzzle:number[][], mask:number[][]) => 
        {
            puzzle:number[][],
            mask: number[][],
                hint: number[]
        } = 
        (puzzle: number[][], mask: number[][]) => {

        const cloned = JSON.parse(JSON.stringify(puzzle))
        const retPuzzle = JSON.parse(JSON.stringify(puzzle))
        const retMask = JSON.parse(JSON.stringify(mask))

        if (solveHelper(0, 0, cloned)){
            for(let i = 0; i < 9; i++){
                for(let j = 0; j < 9; j++){
                    if (!retPuzzle[i][j] && cloned[i][j]){
                        retPuzzle[i][j]  = cloned[i][j]; 
                        // mark as hint
                        retMask[i][j] = 2;
                        return {puzzle: retPuzzle, mask: retMask, hint:[i, j]};
                    }
                }
            }
            return  { puzzle, mask, hint: [0, 0] }
        }else{
            // user input
            let user = []
            for(let i = 0; i < 9; i++){
                for(let j = 0; j < 9; j++){
                    if (mask[i][j] !== 1 && cloned[i][j]){
                        user.push([i, j])
                    }
                }
            }

            user = shuffle(user);

            for(const i of user){
                cloned[i[0]][i[1]] = 0;
                if (solveHelper(0, 0, cloned)){
                    retPuzzle[i[0]][i[1]] = 0;
                    // mark as removed
                    retMask[i[0]][i[1]] = 3;
                    return {puzzle: retPuzzle, mask: retMask, hint: i};
                }
                cloned[i[0]][i[1]] = retPuzzle[i[0]][i[1]];
            }

            retPuzzle[user[0][0]][user[0][1]] = 0;
            retMask[user[0][0]][user[0][1]] = 3;
            return {puzzle: retPuzzle, mask: retMask, hint: user[0]};
        }
    }

    const generatePuzzle = (clues: number) => {
        const puzzle = initMatrix();
        const mask = initMatrix();

        for(let i = 0; i < 3; i++){
            const arr = shuffle(Array.from(Array(10).keys()).slice(1));
            for(let j = 0; j < 9; j++){
                puzzle[i*3 + Math.floor(j/3)][i*3 + j % 3] = arr[j]
            }
        }

        // Solve puzzle
        solveHelper(0, 0, puzzle);

        const indices = shuffle(Array.from(Array(81).keys()))


        for(let i = 0;  i < 81; i++){
            if (i < clues){
                mask[Math.floor(indices[i]/9)][indices[i] % 9] = 1
            }else{
                puzzle[Math.floor(indices[i]/9)][indices[i] % 9] = 0
            }
        }

        return {puzzle, mask}
    }

    return {
        getAvailable,
        generatePuzzle,
        solvePuzzle,
        getHint,
        isSolved
    }
})()

export default Sudoku;