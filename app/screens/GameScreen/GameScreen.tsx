import { AppStackScreenProps } from "app/navigators";
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "app/theme";
import React, {FC, useEffect, useState} from "react";
import { Text, Icon } from "app/components";
import PuzzleGrid from "./PuzzleGrid";
import NumPad from "./NumPad";
import { observer } from "mobx-react-lite";
import { useStores } from "app/models";
import Sudoku from "./services/sudoku";

interface GameScreenProps extends AppStackScreenProps<"GameScreen"> {}

export const GameScreen: FC<GameScreenProps> = observer(({navigation, route}) => {
    const { sudokuStore } = useStores();

    useEffect(
        () => {
            if (route.params.clues !== undefined){
                const { puzzle, mask } =  Sudoku.generatePuzzle(route.params.clues)
                sudokuStore.setPuzzle(puzzle)
                sudokuStore.setMask(mask)
            }
        }
    ,[sudokuStore])

    return (
        <View style={$container}>
            <View style={$gameContainer}>
                <Text text='Sudoku' preset='heading'/>
                {
                    sudokuStore.puzzle.length > 0 && sudokuStore.mask.length > 0 ? 
                    <PuzzleGrid puzzle={sudokuStore.puzzle} mask={sudokuStore.mask}/>
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
                <Pressable style={({pressed}) => [$btn, pressed && $pressed]}>
                    <Icon icon='lightbulb' color='white' style={$icon}/>
                    <Text text='HINT' style={$text}/>
                </Pressable>
                <Pressable style={({pressed}) => [$btn, pressed && $pressed]}>
                    <Icon icon='check' color='white' style={$icon}/>
                    <Text text='ANSWER' style={$text}/>
                </Pressable>
                <Pressable style={({pressed}) => [$btn, pressed && $pressed]}>
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