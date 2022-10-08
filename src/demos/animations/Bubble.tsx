import * as React from 'react';
import {StyleSheet} from "react-native";
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from "react-native-reanimated";

import {StyleGuide} from "../../components";

const size = 32;


interface BubbleProps {
    progress: Animated.SharedValue<number>;
    start: number;
    end: number;
}

export const Bubble: React.FC<BubbleProps> = ({progress, start, end}) => {
    const style = useAnimatedStyle(() => {
        const opacity = interpolate(
            progress.value,
            [start, end],
            [0.5, 1],
            Extrapolate.CLAMP
        );
        const scale = interpolate(
            progress.value,
            [start, end],
            [1, 1.5],
            Extrapolate.CLAMP
        );
        return {
            opacity,
            transform: [{scale}]
        };
    });

    return <Animated.View style={[style, styles.bubble]}/>;
};

const styles = StyleSheet.create({
    bubble: {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: StyleGuide.palette.primary,
    },
});
