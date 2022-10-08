import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, cards, StyleGuide} from "../../components";
import {AnimatedCard} from "./AnimatedCard";
import {useDerivedValue, useSharedValue, withSpring, withTiming} from "react-native-reanimated";
import {useSpring} from "react-native-redash";


// Own implementations of Redash useSpring() and useTiming() hooks

// const useSpring = (state, config) => {
//     const value = useSharedValue(0);
//
//     React.useEffect(() => {
//         value.value = typeof state === 'number' ? state : (state ? 1 : 0);
//     }, [state, value])
//
//     return useDerivedValue(() => {
//         return withSpring(value.value, config);
//     })
// }

// const useTiming = (state, config) => {
//     const value = useSharedValue(0);
//
//     React.useEffect(() => {
//         value.value = typeof state === 'number' ? state : (state ? 1 : 0);
//     }, [state, value])
//
//     return useDerivedValue(() => {
//         return withTiming(value.value, config);
//     })
// }


export const Transitions: React.FC = () => {
    // 1)  using React state (JS thread)
    // const [toggled, setToggled] = React.useState<boolean>(false);
    // const transition = useSpring(toggled);

    // 2) using UI thread (see 'reset' button doesn't change
    const toggled = useSharedValue(false);
    const transition = useDerivedValue(() => {
        return withSpring(toggled.value);
    })


    return (
        <View style={styles.container}>
            {cards.slice(0, 3).map((card, index) => (
                <AnimatedCard key={card} {...{index, card, transition}} />
            ))}
            <Button
                label={toggled ? "Reset" : "Start"}
                primary
                // 1) JS Thread
                // onPress={() => setToggled((prev) => !prev)}

                // 2) UI Thread
                onPress={() => (toggled.value = !toggled.value)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StyleGuide.palette.background,
        justifyContent: 'flex-end',
    }
})
