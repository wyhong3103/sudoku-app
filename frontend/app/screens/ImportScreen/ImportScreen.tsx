import React, {FC} from 'react';
import { Alert, TextStyle, View, ViewStyle } from 'react-native';
import { Button, Text } from 'app/components';
import { AppStackScreenProps } from 'app/navigators';
import * as ImagePicker from 'expo-image-picker';
import { colors } from 'app/theme';
import { useStores } from 'app/models';


interface ImportScreenProps extends AppStackScreenProps<"Import">{}

export const ImportScreen: FC<ImportScreenProps> = ({navigation}) => {
    const { sudokuStore } = useStores();

    const recognizeSudoku = async (uri) => {
        const formData = new FormData();

       formData.append('image', {
            uri,
            name: "image.jpg",
            type: "image/jpeg"
        })
    
        // const res = await fetch('http://13.211.177.226:3030/inference', {
        //     method: 'POST',
        //     body: formData,
        // });
        const res = await fetch('http://192.168.0.175:3030/inference', {
            method: 'POST',
            body: formData,
        });

        console.log(res.status);
        if (!res.ok){
            Alert.alert("We could not understand your picture :(")
        }else{
            const data = await res.json();
            sudokuStore.reset();
            sudokuStore.setPuzzle(data.data);
            navigation.navigate("Correct");
        }
    }

    const importLibrary = async () => {
        const permission = await ImagePicker.getMediaLibraryPermissionsAsync();

        if (!permission.granted){
            if (permission.canAskAgain){
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            }else{
                Alert.alert("No permission.")
            }
        }
        
        if (permission.granted){
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64:true
            });

            if (result.assets){
                await recognizeSudoku(result.assets[0].uri)
            }
        }
    }

    const importCamera = async () => {
        const permission = await ImagePicker.getCameraPermissionsAsync();

        if (!permission.granted){
            if (permission.canAskAgain){
                const res = await ImagePicker.requestCameraPermissionsAsync();
                console.log(res);
            }else{
                Alert.alert("No permission.")
            }
        }
        
        if (permission.granted){
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true
            });

            if (result.assets)
                await recognizeSudoku(result.assets[0].uri)
        }
    }

    return (
        <View style={$container}>
            <View style={$main}>
                <Text text='IMPORT GAME' size={'xxl'} preset="heading"/>
                <Text text='PLAY SUDOKU PUZZLE FROM A PICTURE' size={'lg'} style={$subheading}/>
            </View>
            <View style={$btnContainer}>
                <Button
                    text='FROM CAMERA'
                    onPress={() => importCamera()}
                    style={$primaryBtn}
                    pressedStyle={$primaryBtnPressed}
                    textStyle={$btnText}
                />
                <Button
                    text='FROM STORAGE'
                    onPress={() => importLibrary()}
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