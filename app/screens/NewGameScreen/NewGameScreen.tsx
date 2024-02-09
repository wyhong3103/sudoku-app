import React, {FC, useState, useRef} from "react";
import { View, Dimensions, ViewStyle, TextStyle } from "react-native";
import { Text, Button } from "app/components";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { AppStackScreenProps } from "app/navigators";
import Slider from '@react-native-community/slider';
import { colors } from "app/theme";

interface NewGameScreenProps extends AppStackScreenProps<"NewGame"> {}

export const NewGameScreen: FC<NewGameScreenProps> = ({navigation}) => {
    const [clue, setClue] = useState(17)
    const clues = Array.from(Array(82).keys())
    const swiperRef = useRef<any>({});
    
    const handleUpdate = (value: number) => {
        setClue(value);
        swiperRef.current._swiper.scrollToIndex({index: value});
    }

    return(
        <View style={$container}>
            <View style={$main}>
                <Text text='Number of Clues' size={'xl'} preset="subheading"/>
                <View style={$swiperContainer}>
                    <SwiperFlatList
                        ref={(component) => { swiperRef.current._swiper = component; }}
                        index={clue}
                        data={clues}
                        renderItem={({ item }) => {
                            return(
                                <View style={$itemContainer}>
                                    <Text text={`${item}`} style={$clue}/>
                                </View>
                            )
                        }}
                        onChangeIndex={({index}) => handleUpdate(index)}
                    />
                </View>
                <Slider
                    style={$slider}
                    value={clue}
                    onSlidingComplete={(value) => handleUpdate(value)}
                    minimumValue={0}
                    maximumValue={81}
                    step={1}
                    minimumTrackTintColor={colors.palette.secondary}
                    maximumTrackTintColor={colors.palette.primary}
                />
                <Text text='Set the number of clues given at the beginning of the puzzle' size={'md'} style={$instruction}/>
            </View>
            <View style={$btnContainer}>
                <Button
                    text='START'
                    onPress={() => navigation.navigate("Game", {clues: clue})}
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

const { width  } = Dimensions.get('window');

const $itemContainer: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    width,
}

const $swiperContainer: ViewStyle = {
    height: width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
}

const $clue : TextStyle = {
    fontSize: width*0.4,
    lineHeight: undefined,
    color: "#565656",
    textAlign: "center"
}

const $instruction : TextStyle = {
    width: width * 0.7,
    color: colors.palette.primaryLight,
    textAlign: "center"
}

const $slider = {
    width: width * 0.7,
}

const $main: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 100
}
