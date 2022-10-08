import * as React from "react";
import {StyleSheet, View} from "react-native";
import {
    withTiming,
    withRepeat,
    useSharedValue,
    Easing,
} from "react-native-reanimated";
import {withPause} from "react-native-redash";

import {Button, StyleGuide} from "../../components";

import {ChatBubble} from "./ChatBubble";

const easing = Easing.inOut(Easing.ease);

export const Timing = () => {
    const [play, setPlay] = React.useState(true);

    const paused = useSharedValue(!play);
    const progress = useSharedValue<number>(0);

    React.useEffect(() => {
        progress.value = withPause(
            withRepeat(withTiming(1, {duration: 1000, easing}), -1, true),
            paused
        );
    }, [paused, progress]);

    return (
        <View style={styles.container}>
            <ChatBubble progress={progress}/>
            <Button
                label={play ? "Pause" : "Play"}
                primary
                onPress={() => {
                    setPlay((prev) => !prev);
                    paused.value = !paused.value;
                    if (progress.value === null) {
                        progress.value = withPause(
                            withRepeat(
                                withTiming(1, {
                                    duration: 1000,
                                    easing: Easing.inOut(Easing.ease),
                                }),
                                -1,
                                true
                            ),
                            paused
                        );
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: StyleGuide.palette.background,
    },
});
