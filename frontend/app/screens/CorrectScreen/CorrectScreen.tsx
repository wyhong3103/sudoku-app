import { AppStackScreenProps } from "app/navigators";
import { ImageStyle, Pressable, TextStyle, View, ViewStyle, Alert } from "react-native";
import { colors } from "app/theme";
import React, {FC, useEffect, useState} from "react";
import { PuzzleGrid, NumPad, Text, Button } from "app/components";
import { observer } from "mobx-react-lite";
import { useStores } from "app/models";
import { getSnapshot } from "mobx-state-tree";
import Sudoku from "../../services/sudoku/sudoku";

interface CorrectScreenProps extends AppStackScreenProps<"Correct"> {}

export const CorrectScreen: FC<CorrectScreenProps> = observer(({navigation}) => {
    const { sudokuStore } = useStores();

    const onNext = () => {
        if (Sudoku.isValid(sudokuStore.puzzle))
            navigation.navigate('SetClue')
        else Alert.alert("Invalid puzzle.")
    }
 
    useEffect(
        () => {
            sudokuStore.setPuzzle(
                [[1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
            )
            sudokuStore.setMask(
                [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
            )

            sudokuStore.setSelected(undefined, undefined);
        }
    ,[sudokuStore])

    return (
        <View style={$container}>
            <View style={$gameContainer}>
                <Text text='CORRECT PUZZLE' size={'xl'} preset="heading"/>
                {
                    sudokuStore.puzzle.length > 0 && sudokuStore.mask.length > 0 ? 
                    // getSnapshot is used because it is updated asynchronously
                    // https://github.com/mobxjs/mobx-state-tree/issues/1185
                    <PuzzleGrid puzzle={sudokuStore.puzzle} mask={getSnapshot(sudokuStore.mask)} disabled={[1]}/>
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
                <Button
                    text='NEXT'
                    onPress={() => onNext()}
                    style={$primaryBtn}
                    pressedStyle={$primaryBtnPressed}
                    textStyle={$btnText}
                />
                <Button
                    text='BACK'
                    onPress={() => navigation.goBack()}
                    style={$secondaryBtn}
                    pressedStyle={$secondaryBtnPressed}
                    textStyle={$btnText}
                />
            </View>
        </View>
    )
})

const $container: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    gap: 20
}

const $gameContainer: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 100
}

const $btnContainer: ViewStyle = {
    padding: 20,
    gap: 10
}

const $primaryBtn = {
    backgroundColor: "#8873FF",  
    borderRadius: 10 
}

const $primaryDisabledBtn ={
    backgroundColor: "#c0b5ff",  
    borderRadius: 10 
}

const $primaryBtnPressed = {
    backgroundColor: "#A493FF",  
    borderRadius: 10 
}

const $secondaryBtn = {
    backgroundColor: "#9F9F9F",  
    borderRadius: 10 
}

const $secondaryBtnPressed = {
    backgroundColor: "#C2C2C2",  
    borderRadius: 10 
}

const $btnText = {
    fontSize: 20,
    color: "white"
}