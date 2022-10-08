import * as React from "react"
import {StyleSheet, View} from "react-native"

import {Card, CARD_WIDTH, Cards, CARD_HEIGHT} from "../components";
import {PanGestureHandler} from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withDecay
} from "react-native-reanimated";
import {clamp} from "react-native-redash";

interface iProps {
    height: number;
    width: number;
}

export const PanGestureComponent: React.FC<iProps> = ({height, width}) => {
    const boundX = width - CARD_WIDTH;
    const boundY = height - CARD_HEIGHT;

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            // @ts-ignore
            ctx.offsetX = translateX.value;
            // @ts-ignore
            ctx.offsetY = translateY.value;
        },
        onActive: (event, ctx) => {
            // @ts-ignore
            translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
            // @ts-ignore
            translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
        },
        onEnd: (event) => {
            translateX.value = withDecay({
                velocity: event.velocityX, clamp: [0, boundX]
            });
            translateY.value = withDecay({
                velocity: event.velocityY, clamp: [0, boundY]
            })
        }
    })

    const style = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: translateX.value},
                {translateY: translateY.value}
            ]
        }
    })

    return (
        <View style={styles.container}>
            <PanGestureHandler {...{onGestureEvent}}>
                <Animated.View {...{style}}>
                    <Card card={Cards.Card1}/>
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
})
