import { ConfigProvider, AppRoot, SplitLayout, SplitCol, View, Panel, PanelHeader, Div, Text } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

export default function App() {
  return (
    <ConfigProvider colorScheme="dark">
      <AppRoot>
        <SplitLayout>
          <SplitCol>
            <View activePanel="main">
              <Panel id="main">
                <PanelHeader>Твой тотемный зверь</PanelHeader>
                <Div>
                  <Text>Hello World! Если видишь это — React работает.</Text>
                </Div>
              </Panel>
            </View>
          </SplitCol>
        </SplitLayout>
      </AppRoot>
    </ConfigProvider>
  );
}
