import * as React from 'react';
import {Platform, StyleSheet, Text, View} from "react-native";
import Animated, {runOnJS, runOnUI, useSharedValue} from "react-native-reanimated";
import {ReText} from "react-native-redash";

import {Button} from '../components';


const formatDateTime = (datetime: Date) => {
    "worklet";
    return `${datetime.getFullYear()}-${
        datetime.getMonth() + 1
    }-${datetime.getDate()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;
};

const sayHello = (text: Animated.SharedValue<string>, location: string, cb: () => void) => {
    "worklet";
    text.value = `Hello from ${location}(${Platform.OS}) at ${formatDateTime(new Date())}`;
    runOnJS(cb)();
}

export const Worklets = () => {
    const [jsMsg, setJsMsg] = React.useState('');
    const text = useSharedValue('');

    const sayHelloOnJSThread = () => setJsMsg(`Hello, it's ${formatDateTime(new Date())}`)

    return (
        <View style={styles.container}>
            <Text>JS Thread says:</Text>
            <Text>{jsMsg}</Text>
            <Text>UI Thread says:</Text>
            <ReText {...{text}} />
            <Button label="Say Hello"
                    onPress={() => runOnUI(sayHello)(text, 'Nivelles in Belgium', sayHelloOnJSThread)}
                    primary
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
});
