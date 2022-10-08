import AsyncStorage from "@react-native-async-storage/async-storage";
import {InitialState, NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Constants.manifest?.sdkVersion}`;

export type FontSource = Parameters<typeof Font.loadAsync>[0];
const usePromiseAll = (
  promises: Promise<void | void[] | Asset[]>[],
  cb: () => void
) =>
  React.useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

const useLoadAssets = (assets: number[], fonts: FontSource): boolean => {
  const [ready, setReady] = React.useState(false);
  usePromiseAll(
    [Font.loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))],
    () => setReady(true)
  );
  return ready;
};

interface LoadAssetsProps {
  fonts?: FontSource;
  assets?: number[];
  children: React.ReactElement | React.ReactElement[];
}

export const LoadAssets = ({ assets, fonts, children }: LoadAssetsProps) => {
  const [isNavigationReady, setIsNavigationReady] = React.useState(!__DEV__);
  const [initialState, setInitialState] = React.useState<InitialState | undefined>();
  const ready = useLoadAssets(assets || [], fonts || {});

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY
        );
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };
    if (!isNavigationReady) {
      void restoreState();
    }
  }, [isNavigationReady]);

  const onStateChange = React.useCallback(
    (state) =>
      AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    []
  );

  const onLayoutRootView = React.useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer {...{ onStateChange, initialState }}>
        <StatusBar style="light" />
        {children}
      </NavigationContainer>
    </View>
  );
};
