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
                <Text text='Sudoku' size={'xxxl'} preset="heading"/>
            </View>
            <View style={$btnContainer}>
                <Button
                    text='NEW GAME'
                    onPress={() => navigation.navigate('NewGame')}
                    style={$primaryBtn}
                    pressedStyle={$primaryBtnPressed}
                    textStyle={$btnText}
                />
                <Button
                    text='IMPORT GAME'
                    onPress={() => console.log("import")}
                    style={$secondaryBtn}
                    pressedStyle={$secondaryBtnPressed}
                    textStyle={$btnText}
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
    alignItems: 'center',
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