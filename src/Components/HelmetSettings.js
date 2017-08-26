import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View,Switch} from 'react-native';
import {List,ListItem,Header,Title,Button} from 'native-base';

export default class HelmetSettings extends Component {

state={
  videoRecord:false,
  videoStream:false,
  turnByTurn:false,
  takeCalls:false
}

sync()
{
//const ws = new WebSocket('ws://192.168.1.102:5000//accelerometer');
var ws = new WebSocket('ws://192.168.1.24:5000/settings');
ws.onopen = () => {  // connection opened
ws.send(JSON.stringify(this.state)); // send a message
};

}

render() {

    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.visible}
          onRequestClose={this.props.onClose}
          >
         <View>
          <View>
            <Header>
              <Title>
                Helmet settings
              </Title>


            </Header>

            <List>
            <ListItem>
            <Text>
              Video Record
            </Text>
            <Switch onValueChange={(value) =>this.setState({videoRecord:value})}
            style={{marginBottom: 10}}
            value={this.state.videoRecord}
            style={{flex:0.25,alignItems:'center'}}
            />
            </ListItem>
            <ListItem>
            <Text>
              Video Stream
            </Text>
            <Switch onValueChange={(value) =>this.setState({videoStream:value})}
            style={{marginBottom: 10}}
            value={this.state.videoStream}
            style={{flex:0.25,alignItems:'center'}}
            />
            </ListItem>

            <ListItem>
            <Text>
              Turn By Turn Directions
            </Text>
            <Switch onValueChange={(value) =>this.setState({turnByTurn:value})}
            style={{marginBottom: 10}}
            value={this.state.turnByTurn}
            style={{flex:0.25,alignItems:'center'}}
            />
            </ListItem>

            <ListItem>
            <Text>
              Take Calls
            </Text>
            <Switch onValueChange={(value) =>this.setState({takeCalls:value})}
            style={{marginBottom: 10}}
            value={this.state.takeCalls}
            style={{flex:0.25,alignItems:'center'}}
            />

            </ListItem>

            <ListItem>

            <Button onPress={()=>this.sync()}>
              <Title>
                Sync
              </Title>

            </Button>




            </ListItem>



            </List>

          </View>
         </View>
        </Modal>

      </View>
    );
  }
}
