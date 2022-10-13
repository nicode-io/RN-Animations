import {StatusBar} from 'expo-status-bar';
import {Dimensions, SafeAreaView} from 'react-native';

import {Worklets} from "./src/demos/Worklets";
import {PanGestureComponent} from "./src/demos/PanGesture";
import {Transitions} from "./src/demos/transitions/Transitions";
import {Timing} from "./src/demos/animations/Animations";
import {CircularSlider} from "./src/demos/circular-slider";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function App() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar style="auto"/>
            {/*<Worklets/>*/}
            {/*<PanGestureComponent height={height} width={width}/>*/}
            {/*<Transitions/>*/}
            {/*<Timing/>*/}
            <CircularSlider/>
        </SafeAreaView>
    );
}
