import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SudokuStoreModel } from "./SudokuStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    sudokuStore: types.optional(SudokuStoreModel, {
        puzzle: [],
        mask: [],
        selected: {
            row: undefined,
            col: undefined
        }
    })
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
