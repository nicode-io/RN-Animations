import {StyleSheet, Dimensions} from "react-native";
import Animated, {AnimatableValue, SharedValue, useAnimatedStyle} from "react-native-reanimated";

import type {Cards} from "../../components";
import {Card, StyleGuide} from "../../components";
import {mix} from "react-native-redash";

const {width} = Dimensions.get("window");
const origin = -(width / 2 - StyleGuide.spacing * 2);

interface AnimatedCardProps {
    transition: Readonly<SharedValue<AnimatableValue>>;
    index: number;
    card: Cards;
}

export const AnimatedCard = ({card, transition, index}: AnimatedCardProps) => {
    const style = useAnimatedStyle(() => {
        // PI is 180°c, divided by 6 => 30°
        const rotate = (index - 1) * mix(transition.value, 0, Math.PI / 6);

        return {
            transform: [
                {translateX: origin},
                {rotate: `${rotate}rad`},
                {translateX: -origin},
            ],

        };
    });

    return (
        <Animated.View key={card} style={[styles.overlay, style]}>
            <Card {...{card}} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        padding: StyleGuide.spacing * 4,
    },
})
