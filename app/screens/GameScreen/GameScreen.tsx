import { AppStackScreenProps } from "app/navigators";
import { ImageStyle, Pressable, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "app/theme";
import React, {FC} from "react";
import { Text, Icon } from "app/components";
import PuzzleGrid from "./PuzzleGrid";
import NumPad from "./NumPad";

interface GameScreenProps extends AppStackScreenProps<"GameScreen"> {}

export const GameScreen: FC<GameScreenProps> = () => {
    const puzzle = [];
    const mask = [];
    for (let i = 0; i < 9; i++){
        const row = []
        for(let j = 0; j  < 9; j++){
            row.push(j)
        }
        puzzle.push(row)
    }

    for (let i = 0; i < 9; i++){
        const row = []
        for(let j = 0; j  < 9; j++){
            row.push(!!Math.floor(Math.random() * 2))
        }
        mask.push(row)
    }

    return (
        <View style={$container}>
            <View style={$gameContainer}>
                <Text text='Sudoku' preset='heading'/>
                <PuzzleGrid puzzle={puzzle} mask={mask}/>
                <NumPad available={[false, true, false, false, false, false, true, false, true, false]}/>
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
                <Pressable style={({pressed}) => [$btn, $exitBtn, pressed && $exitPressed]}>
                    <Icon icon='back' color='white' style={$icon}/>
                    <Text text='EXIT' style={$text}/>
                </Pressable>
            </View>
        </View>
    )
}

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