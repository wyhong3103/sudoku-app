import React, {FC} from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { PuzzleItem } from "./PuzzleItem";

interface PuzzleGridProps {
    puzzle: number[][],
    mask: number[][],
    cb?: any,
    disabled?: number[]
}

export const PuzzleGrid : FC<PuzzleGridProps> = ({puzzle, mask, cb, disabled}) => {
    const toSudokuGrid = (puzzle: number[][]) => {
        const rows = []
        for(let i = 0; i < 9; i++){
            rows.push(
                <View style={$row}>
                    {
                        puzzle[i].map(
                            (value: number, idx: number) => (
                                <PuzzleItem key={idx} value={value} row={i} col={idx} mask={mask[i][idx]} cb={cb} disabled={disabled}/>
                            )
                        )
                    }
                </View>
            )
        }

        return rows;
    }

    return (
        <View style={$grid}>
            {
                toSudokuGrid(puzzle)
            }
        </View>
    )
}

const $grid: ViewStyle = {
    flexDirection: "column",
    backgroundColor: "F5F5F5",
    borderColor: "#565656",
    borderWidth: 5,
    borderRadius: 10,
 }

const $row: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
}