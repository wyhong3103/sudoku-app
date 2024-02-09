import { AppStackScreenProps } from "app/navigators";
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "app/theme";
import React, {FC, useEffect, useState} from "react";
import { PuzzleGrid, NumPad, Text, Icon } from "app/components";
import { observer } from "mobx-react-lite";
import { useStores } from "app/models";
import { getSnapshot } from "mobx-state-tree";
import Sudoku from "../../services/sudoku/sudoku";

interface GameScreenProps extends AppStackScreenProps<"Game"> {}

export const GameScreen: FC<GameScreenProps> = observer(({navigation, route}) => {
    const { sudokuStore } = useStores();
    
    const onHint = () => {
        const { puzzle, mask, hint } = Sudoku.getHint(sudokuStore.puzzle, sudokuStore.mask);
        sudokuStore.setPuzzle(puzzle);
        sudokuStore.setMask(mask);
        setTimeout(
            () => {
                sudokuStore.clearHint(hint[0], hint[1]);
            }
        , 1000)
    }

    const onAnswer = () => {
        const puzzle = Sudoku.solvePuzzle(sudokuStore.puzzle, sudokuStore.mask);
        sudokuStore.setPuzzle(puzzle);
    }

    const onRestart = () => {
        let clues = 0;
        const curMask = sudokuStore.mask;
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                clues += Math.min(1, curMask[i][j])
            }
        }

        const { puzzle, mask } =  Sudoku.generatePuzzle(clues)
        sudokuStore.setPuzzle(puzzle)
        sudokuStore.setMask(mask)
        sudokuStore.setSelected(undefined, undefined);
    }

    useEffect(
        () => {
            if (route.params.clues !== undefined){
                const { puzzle, mask } =  Sudoku.generatePuzzle(route.params.clues)
                sudokuStore.setPuzzle(puzzle)
                sudokuStore.setMask(mask)
                sudokuStore.setSelected(undefined, undefined);
            }
        }
    ,[sudokuStore])

    return (
        <View style={$container}>
            <View style={$gameContainer}>
                <Text text='Sudoku' preset='heading'/>
                {
                    sudokuStore.puzzle.length > 0 && sudokuStore.mask.length > 0 ? 
                    // getSnapshot is used because it is updated asynchronously
                    // https://github.com/mobxjs/mobx-state-tree/issues/1185
                    <PuzzleGrid puzzle={sudokuStore.puzzle} mask={getSnapshot(sudokuStore.mask)}/>
                    :
                    null
                }
                <NumPad available={
                    sudokuStore.selected.row !== undefined && sudokuStore.selected.col !== undefined ? 
                    Sudoku.getAvailable(sudokuStore.selected.row, sudokuStore.selected.col, sudokuStore.puzzle) :
                    Array(10).fill(0)
                }/>
            </View>
            <View style={$btnContainer}>
                <Pressable style={({pressed}) => [$btn, pressed && $pressed]} onPress={onHint}>
                    <Icon icon='lightbulb' color='white' style={$icon}/>
                    <Text text='HINT' style={$text}/>
                </Pressable>
                <Pressable style={({pressed}) => [$btn, pressed && $pressed]} onPress={onAnswer}>
                    <Icon icon='check' color='white' style={$icon}/>
                    <Text text='ANSWER' style={$text}/>
                </Pressable>
                <Pressable style={({pressed}) => [$btn, pressed && $pressed]} onPress={onRestart}>
                    <Icon icon='restart' color='white' style={$icon}/>
                    <Text text='RESTART' style={$text}/>
                </Pressable>
                <Pressable style={({pressed}) => [$btn, $exitBtn, pressed && $exitPressed]} onPressOut={() => navigation.navigate('Home')}>
                    <Icon icon='back' color='white' style={$icon}/>
                    <Text text='EXIT' style={$text}/>
                </Pressable>
            </View>
        </View>
    )
})

const $container: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    gap: 20
}

const $btnContainer: ViewStyle = {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20
}

const $btn: ViewStyle = {
    width: 80,
    height: 80,
    backgroundColor: colors.palette.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
}

const $pressed: ViewStyle = {
    backgroundColor: "#A493FF"
}

const $exitBtn: ViewStyle = {
    backgroundColor: "#9F9F9F"
}

const $exitPressed: ViewStyle = {
    backgroundColor: "#C2C2C2",
}

const $icon: ImageStyle = {
    width: 35,
    height: 35
}

const $text: TextStyle = {
    color: "white"
}

const $gameContainer: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 100
}