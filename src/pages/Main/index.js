import React, { PureComponent } from "react";
import { startNFC, stopNFC } from "../../helpers/NFCHelper";

import { Text, FlatList, View, StyleSheet } from "react-native";

class Main extends PureComponent {
  state = {
    tag: false,
    list: [
      {
        key: "Item"
      }
    ]
  };

  componentWillMount() {
    startNFC(this.handleNFCTagReading);
  }

  componentWillUnmount() {
    stopNFC();
  }

  handleNFCTagReading = nfcResult => {
    let item = "Mais um item";
    if (nfcResult) {
      this.setState({
        ...this.state,
        tag: !this.state.tag
      });
      console.log(this.state.tag);
    }
    if (this.state.tag) {
      this.setState({
        ...this.state,
        tag: !this.state.tag,
        list: [...this.state.list, { key: "Mais um item" }]
      });
    }
  };

  render() {
    const { list } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={list}
          renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

export default Main;
