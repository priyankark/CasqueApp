import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';





import { Button, Card } from 'react-native-material-design';

import MapView from 'react-native-maps';

const {width,height}=Dimensions.get('window');
const LATITUDE_DELTA=0.0922;
const ASPECT_RATIO=width/height;
const LONGITUDE_DELTA=LATITUDE_DELTA*ASPECT_RATIO;


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class ShowMap extends Component {

   state = {

            initialPosition:{
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0,
              longitudeDelta: 0
            },
            markerPosition:{
              latitude:0,
              longitude:0
            },
            text:'',
            coords:[

            ]
  };




  watchID: ?number=null;

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position)=>{
      var lat=parseFloat(position.coords.latitude);
      var long=parseFloat(position.coords.longitude);

      var initialRegion={
        latitude:lat,
        longitude:long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA

      }

      this.setState({initialPosition:initialRegion,markerPosition:initialRegion});

    },(error)=>alert(JSON.stringify(error)),{enableHighAccuracy:true,timeout:20000,maximumAge:1000});


    this.watchID=navigator.geolocation.watchPosition((position)=>{
      var lat=position.coords.latitude;
      var long=position.coords.longitude;

      var lastRegion={
        latitude:lat,
        longitude:long,
        longitudeDelta:LONGITUDE_DELTA,
        latitudeDelta:LATITUDE_DELTA
      }

      this.setState({initialPosition:lastRegion,markerPosition:lastRegion});

    });
  }

  componentWillUnmount()
  {
    navigator.geolocation.clearWatch(this.watchID);
  }


  decode(t,e)
  {for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}
  // transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates




 fetchData(obj,text)
  {
    var API_KEY='';

    var url='https://maps.googleapis.com/maps/api/directions/json?origin='+obj.latitude+','+obj.longitude+'&destination='+text+'&key='+API_KEY;
    fetch(url,{method:'GET'}).then((response)=>response.json()) .catch((error)=>alert("There was an error. ")).then((responseData)=>{
          var cordinates=[];

          if (responseData.routes.length) {
          this.setState({
              coords: this.decode(responseData.routes[0].overview_polyline.points) // definition below
          });
      }


    alert(JSON.stringify(responseData));


});
  }




  render() {
    const { region } = this.props;
    console.log(region);


    return (


      <View style={{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between'}}>

      <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.initialPosition }
         >
         <MapView.Polyline
         coordinates={[

             ...this.state.coords

         ]}
         strokeWidth={4}
     />
        </MapView>



      </View>

      <View style={{padding: 10}}>
      <TextInput
    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
    onChangeText={(text) => this.setState({text})}
    value={this.state.text}/>

    <View style={{padding:20}}>
      <Button value="NORMAL FLAT" onPress={()=>this.fetchData(this.state.initialPosition,this.state.text)} text='Submit'/>

    </View>



      </View>


      </View>






    );
  }
}
