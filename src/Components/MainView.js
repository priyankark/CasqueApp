import React, {Component} from 'react';
import {Header, Left, Body, Right, Icon, Title,Button,Content, List, ListItem} from 'native-base';
import {View,DrawerLayoutAndroid,Text} from 'react-native';
import HelmetSettings from './HelmetSettings';


export default class MainView extends Component{
state={
  showSettings:false,
}





render()
{
var navigationView=(
<View style={{flex: 1, backgroundColor: '#fff'}}>
<Header>
  <Title style={{paddingTop:10}}>
    Select Option
  </Title>
</Header>
<List>
  <ListItem>
    <Button onPress={()=>this.setState({showSettings:true})}>
    <Icon name="settings" />
    </Button>
    <Text style={{paddingLeft:10}}>
      Helmet Settings
    </Text>
  </ListItem>
  <ListItem>
    <Button>
    <Icon name="map" />
    </Button>
    <Text style={{paddingLeft:10}}>
      Turn by Turn directions
    </Text>
  </ListItem>
  <ListItem>
    <Button>
    <Icon name="film" />
    </Button>
    <Text style={{paddingLeft:10}}>
      Live Stream
    </Text>
  </ListItem>

  <ListItem>
    <Button>
    <Icon name="film" />
    </Button>
    <Text style={{paddingLeft:10}}>
      Calls
    </Text>
  </ListItem>

</List>
</View>
);

  return(
    <DrawerLayoutAndroid ref="myDrawer"
    drawerWidth={300}
    drawerPosition={DrawerLayoutAndroid.positions.Left}
    renderNavigationView={()=>navigationView} >
    <View style={{flex:1}}>
    <Header style={{backgroundColor:"maroon"}}>
    <Left>
    <Button transparent onPress={()=>this.refs['myDrawer'].openDrawer()} >
        <Icon name='menu' style={{fontSize: 20}} />
    </Button>

      </Left>
      <Body>
        <Title>
          CASQUE
        </Title>

      </Body>

    </Header>
    <HelmetSettings visible={this.state.showSettings} onClose={()=>this.setState({showSettings:false})} />

    </View>
    </DrawerLayoutAndroid>
  );
}

}
