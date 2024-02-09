import { AppStackScreenProps } from "app/navigators";
import { ImageStyle, Pressable, TextStyle, View, ViewStyle, Alert } from "react-native";
import { colors } from "app/theme";
import React, {FC, useEffect, useState} from "react";
import { PuzzleGrid, Text, Button } from "app/components";
import { observer } from "mobx-react-lite";
import { useStores } from "app/models";
import { getSnapshot } from "mobx-state-tree";
import Sudoku from "../../services/sudoku/sudoku";

interface SetClueScreenProps extends AppStackScreenProps<"SetClue"> {}

export const SetClueScreen: FC<SetClueScreenProps> = observer(({navigation}) => {
    const { sudokuStore } = useStores();

    const toggle = (row:number, col:number, value:number) => {
        sudokuStore.setMaskItem(row, col, 1-value)
    }

    const onNext = () => {
        if (Sudoku.isValidMask(sudokuStore.puzzle, sudokuStore.mask))
            navigation.navigate('Game', {clues: undefined})
        else Alert.alert("Invalid clues.")
    }
    
    useEffect(
        () => {
            sudokuStore.setSelected(undefined, undefined);
        }
    ,[sudokuStore])

    return (
        <View style={$container}>
            <View style={$gameContainer}>
                <Text text='SET CLUE' size={'xl'} preset="heading"/>
                {
                    sudokuStore.puzzle.length > 0 && sudokuStore.mask.length > 0 ? 
                    // getSnapshot is used because it is updated asynchronously
                    // https://github.com/mobxjs/mobx-state-tree/issues/1185
                    <PuzzleGrid puzzle={sudokuStore.puzzle} mask={getSnapshot(sudokuStore.mask)} cb={toggle}/>
                    :
                    null
                }
                <Text text='PRESS ON A NUMBER TO TOGGLE' size={'lg'}/>
            </View>
            <View style={$btnContainer}>
                <Button
                    text='START'
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