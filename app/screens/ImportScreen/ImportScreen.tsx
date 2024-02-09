import React, {FC} from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Button, Text } from 'app/components';
import { AppStackScreenProps } from 'app/navigators';
import { colors } from 'app/theme';


interface ImportScreenProps extends AppStackScreenProps<"Import">{}

export const ImportScreen: FC<ImportScreenProps> = ({navigation}) => {
    return (
        <View style={$container}>
            <View style={$main}>
                <Text text='IMPORT GAME' size={'xxl'} preset="heading"/>
                <Text text='PLAY SUDOKU PUZZLE FROM A PICTURE' size={'lg'} style={$subheading}/>
            </View>
            <View style={$btnContainer}>
                <Button
                    text='FROM CAMERA'
                    onPress={() => console.log("camera")}
                    style={$primaryBtn}
                    pressedStyle={$primaryBtnPressed}
                    textStyle={$btnText}
                />
                <Button
                    text='FROM STORAGE'
                    onPress={() => console.log("storage")}
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
}

const $container: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background,
    alignContent: "center"
}

const $main: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    gap: 20,
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

const $subheading: TextStyle = {
    width: 350,
    textAlign: "center"
}