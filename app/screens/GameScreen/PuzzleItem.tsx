import React, {FC, useState} from "react";
import { TouchableWithoutFeedback, View, ViewStyle, TextStyle } from "react-native";
import { Text } from "app/components";
import { typography } from "app/theme";

interface PuzzleItemProps{
    value: number,
    row: number,
    col: number,
    anchor: boolean
}

const PuzzleItem: FC<PuzzleItemProps> = ({row, col, value, anchor}) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
      setIsPressed(true);
    };
  
    const handlePressOut = () => {
      setIsPressed(false);
    };


    const getItemContainerStyles = (row: number, col: number) => {
        const styles = [isPressed ? $pressedContainer : $container]

        if (row < 8){
            if ((row+1) % 3 === 0){
                styles.push($borderThickBottom)
            } 
            else styles.push($borderBottom)
        } 
        if (col < 8){
            if ((col+1) % 3 === 0) styles.push($borderThickRight)
            else styles.push($borderRight)
        } 
        return styles
    }

    return(
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <View style={getItemContainerStyles(row, col)}>
                <Text text={`${value}`} style={[$item, !anchor && $unmasked]}/>
            </View>
        </TouchableWithoutFeedback>
    )
}

const $borderRight: ViewStyle = {
    borderRightWidth: 1,
    borderRightColor: "#C6C6C6"
}

const $borderBottom: ViewStyle = {
    borderBottomWidth: 1,
    borderBottomColor: "#C6C6C6"
}

const $borderThickRight: ViewStyle = {
    borderRightWidth: 2,
    borderRightColor: "#565656",
}

const $borderThickBottom: ViewStyle = {
    borderBottomWidth: 2,
    borderBottomColor: "#565656",
}

const $item: TextStyle = {
    fontSize: 30,
    lineHeight: undefined
}


const $unmasked: TextStyle = {
    fontFamily: typography.fonts.shadow.normal,
    color: "#888"
}

const $container: ViewStyle = {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center"
}

const $pressedContainer: ViewStyle = {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCC"
}

export default PuzzleItem;