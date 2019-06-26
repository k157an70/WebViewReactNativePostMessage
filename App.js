import React, { useState } from 'react'
import { View, TextInput, Button, ActivityIndicator, ToastAndroid } from 'react-native'
import { WebView } from 'react-native-webview';

const App = () => {
  let myWebView;
  const [color, setColor] = useState('green');

  const renderLoading = () => <ActivityIndicator style={{ flex: 1 }} animating color="red" size="large" />

  const changeBgWebviewhtml = () => {
    myWebView.postMessage(color)
  }
  return (
    <View style={{ flex: 1 }}>
      <TextInput placeholder="Insert Color for setting body webview" onChangeText={setColor} />
      <Button onPress={changeBgWebviewhtml} title="SET BACKGROUND BODY WEBVIEW" />
      <WebView
        ref={el => myWebView = el}
        startInLoadingState={true}
        renderLoading={renderLoading}
        onLoadEnd={() => myWebView.postMessage('red')}
        onMessage={event => {
          let data = JSON.parse(event.nativeEvent.data);
          let msg  = data['msg'] + ' = ' + data['time'];
          ToastAndroid.show(msg, ToastAndroid.SHORT);
        }}
        source={{ uri: 'http://192.168.43.251/react_native_services/webview.html' }}
      />
    </View>
  )
}

export default App
