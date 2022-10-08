import {Button, Platform, View} from "react-native";
import {runOnJS, runOnUI} from "react-native-reanimated";

const sayHello = (who: string, cb: (msg: string) => void) => {
    // "worklet" specify that we execute the function on UI thread
    "worklet"
    console.log(`Hello from UI thread ${who} on ${Platform.OS} !`)

    // Execute the callback function on JS thread
    runOnJS(cb("Nikoden"))
}

export const Worklets = () => {
    return (
        <View>
            <Button title="Say Hello" onPress={() => runOnUI(sayHello("Nicode", (msg: string) => console.log(`We call back to the JS thread ${'Nikoden'}`)))} />
         </View>
    )
}
