import { StatusBar } from 'expo-status-bar';
import {SafeAreaView} from "react-native";
import {CircularSlider} from "./src/demos/circular-slider";

import 'react-native-gesture-handler';

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

