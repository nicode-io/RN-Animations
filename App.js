import {StatusBar} from 'expo-status-bar';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';

import {Worklets} from "./src/demos/Worklets";
import {PanGestureComponent} from "./src/demos/PanGesture";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function App() {
    return (
        <SafeAreaView>
            <StatusBar style="auto"/>
            <PanGestureComponent height={height} width={width}/>
            {/*<Worklets/>*/}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
