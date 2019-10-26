import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { SendData } from "./src/Network/Api";
const { fontScale, height } = Dimensions.get("screen");
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      flag: false,
      url:
        "https://www.modcloth.com/shop/tops/modcloth-my-own-way-sleeveless-blouse-in-ivory/167068.html",
      description: "",
      loading: false,
      clipboardContent: null
    };
  }
  _onMessage = evt => {
    console.log("working");
    console.log(evt.nativeEvent, "onMessage");
  };
  sendMessageToWebView = () => {
    let data = this.state.description;

    let js = `setTimeout(function(){window.postMessage(document.querySelector('${data}').innerText)},200)`;
    console.log(js);

    this.webView.injectJavaScript(
      `setTimeout(function(){window.postMessage(document.querySelector('div.pdp-main h1.product-name').innerText)},200)`
    );
    console.log(this.webView);
  };
  componentDidMount() {
    let url = "selectors/postchina2@gmail.com";
    let data = {
      url: "https://www.modcloth.com/"
    };
    SendData(data, url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json) {
          //   let value = `window.postMessage(document.querySelector(${json.pbreadcrumb}).focus())}`
          //   console.log(value)

          // let value = GetSelectors(data,json)
          this.setState({ flag: true, description: json.pdescription });
          // this.myWebview.injectJavaScript(`window.postMessage(document.querySelector('${this.state.description}').innerText`)
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          style={styles.webview}
          nativeConfig={{
            props: { webContentsDebuggingEnabled: true, useWebKit: true }
          }}
          injectedJavaScript='setTimeout(function(){window.postMessage(console.log("Working"))},1000)'
          source={{
            uri:
              "https://www.modcloth.com/shop/tops/modcloth-my-own-way-sleeveless-blouse-in-ivory/167068.html"
          }}
          javaScriptEnabled={true}
          onMessage={this._onMessage}
          javaScriptEnabledAndroid={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          scalesPageToFit={true}
          ref={el => (this.webView = el)}
          useWebKit={true}
          onLoadStart={() => this.setState({ loading: true })}
          onLoadEnd={() => this.setState({ loading: false })}
        />

        {/* <WebView
         
          injectedJavaScript='setTimeout(function(){window.postMessage(console.log("Working"))},1000)'
          //  injectJavaScript="this.document.addEventListener('document.querySelector('div.pdp-main h1.product-name').innerText')"
         
        /> */}
        <View>
          <TouchableOpacity
            onPress={() => this.sendMessageToWebView()}
            style={{
              backgroundColor: "#3aa0ea",
              width: "80%",
              alignSelf: "center",
              borderRadius: 5,
              height: 40,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: fontScale * 20,
                fontWeight: "bold"
              }}
            >
              Get Size
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between"
  }
});
