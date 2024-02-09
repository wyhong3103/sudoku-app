import { Instance, SnapshotOut, types, cast, flow } from "mobx-state-tree"
import { runInAction } from "mobx";

const MatrixType = types.array(types.array(types.number));

const SelectedModel = types
    .model("Selected")
    .props({
        row: types.maybe(types.number),
        col: types.maybe(types.number)
    })
    .actions((store) => ({
        setRow(row?: number){
            store.row = row
        },
        setCol(col?: number){
            store.col = col
        }
    }))

export const SudokuStoreModel = types
    .model("SudokuStore")
    .props({
        puzzle: MatrixType,
        mask: MatrixType,
        selected: SelectedModel
    })
    .actions((store) => ({
        setItem(row: number, col: number, value: number) {
            store.puzzle[row][col] = value
        },
        setPuzzle(puzzle: number[][]){
            store.puzzle = cast(puzzle)
        },
        setMask(mask: number[][]){
            store.mask = cast(mask)
        },
        setSelected(row?:number, col?:number){
            store.selected.setRow(row);
            store.selected.setCol(col);
        },
        clearHint(row: number, col: number){
            store.mask[row][col] = 0;
        }
    }))

export interface SudokuStore extends Instance<typeof SudokuStoreModel> {}
export interface SudokuStoreSnapshot extends SnapshotOut<typeof SudokuStoreModel> {}