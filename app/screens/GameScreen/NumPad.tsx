import React, {FC} from "react";
import { View, ViewStyle, TextStyle, Pressable, ImageStyle } from "react-native";
import { Icon, Text } from "app/components";
import { colors } from "app/theme";
import { useStores } from "app/models";

interface NumPadProps{
    available: boolean[]
}

const NumPad: FC<NumPadProps> = ({available}) => {

    const {sudokuStore} = useStores();

    const onSet = (value: number) => {
        if (sudokuStore.selected.row !== undefined && sudokuStore.selected.col !== undefined) 
            sudokuStore.setItem(sudokuStore.selected.row, sudokuStore.selected.col, value)
    }

    const onUnset = () => {
        if (sudokuStore.selected.row !== undefined && sudokuStore.selected.col !== undefined) 
            sudokuStore.setItem(sudokuStore.selected.row, sudokuStore.selected.col, 0)
    }

    return(
        <View style={$container}>
            <View style={$rowContainer}>
                {
                    [1, 2, 3, 4, 5].map(
                        (i, idx) => (
                            <Pressable key={idx} style={({pressed}) => [$btn, pressed && $pressed]}  disabled={!available[i-1]} onPress={() => onSet(i)}>
                                <Text text={`${i}`} style={[$text, !available[i-1] && $disabled]} preset="bold"/>
                            </Pressable>
                        )
                    )
                }
            </View>
            <View style={$rowContainer}>
                {
                    [6, 7, 8, 9].map(
                        (i, idx) => (
                            <Pressable key={idx} style={({pressed}) => [$btn, pressed && $pressed]}  disabled={!available[i-1]} onPress={() => onSet(i)}>
                                <Text text={`${i}`} style={[$text, !available[i-1] && $disabled]} preset="bold"/>
                            </Pressable>
                        )
                    )
                }
                <Pressable style={({pressed}) => [$unsetBtn, pressed && $pressed]} onPress={() => onUnset()}>
                    <Icon icon='x' style={$icon}/>
                </Pressable>
            </View>
        </View>
   )
}

const $container : ViewStyle = {
    flexDirection: "column",
    gap: 15
}

const $rowContainer: ViewStyle = {
    flexDirection: "row",
    gap: 20
}

const $btn : ViewStyle = {
    borderWidth: 3,
    borderColor: colors.palette.primary,
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
}

const $unsetBtn : ViewStyle= {
    borderWidth: 3,
    borderColor: colors.palette.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 12
}

const $pressed: ViewStyle = {
    backgroundColor: "#CCC"
}

const $text: TextStyle = {
    fontSize: 40,
    lineHeight: undefined
}

const $icon: ImageStyle = {
    width: 30,
    height: 30
}

const $disabled: TextStyle = {
    color: "#ABABAB"
}

export default NumPad;