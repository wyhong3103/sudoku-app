import { AppStackScreenProps } from "app/navigators"
import { TextStyle, View , ViewStyle } from "react-native"
import { Button, Text } from "app/components"
import React, { FC } from "react"

import { colors } from "app/theme"


interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
    return (
        <View style={$container}>
            <View style={$titleContainer}>
                <Text text='Sudoku' size={'xxxl'}/>
            </View>
            <View style={$btnContainer}>
                <Button
                    text='NEW GAME'
                    onPress={() => console.log("new")}
                    style={[{backgroundColor: "#8873FF"}, { borderRadius: 10 }]}
                    pressedStyle={[{backgroundColor: "#A493FF"}, { borderRadius: 10 }]}
                    textStyle={[{ fontSize: 20 }, { color: "white" }]}
                />
                <Button
                    text='IMPORT GAME'
                    onPress={() => console.log("import")}
                    style={[{backgroundColor: "#9F9F9F"}, { borderRadius: 10 }]}
                    pressedStyle={[{backgroundColor: "#C2C2C2"}, { borderRadius: 10 }]}
                    textStyle={[{ fontSize: 20 }, { color: "white" }]}
                />
            </View>
        </View>
    )
}

const $container: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background,
}

const $titleContainer: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
}

const $btnContainer: ViewStyle = {
    padding: 20,
    gap: 10
}