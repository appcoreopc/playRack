import React from 'react';
import {
  Image, ImageBackground,
  ScrollView,
  StyleSheet,
  Text,TextInput,
  TouchableOpacity,
  View, RefreshControl
} from 'react-native';

import { ActivitySpinner } from '../shared/ActivitySpinner';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { Icon, List, ListItem } from 'react-native-elements';
import { IconImageDisplay } from '../shared/IconImageDisplay';

export default class LinksScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
  };
    
  constructor(props) {
    
    super(props);
    
    this.state = {            
      loading: false,
      isBusy : false, 
      data: [],         
      error: null,
      refreshing: false
    };
  }
  
  data = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President', 
      icon: 'av-timer'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
      icon: 'flight-takeoff'
      
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
      icon: 'flight-takeoff'
      
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
      icon: 'flight-takeoff'
      
    },
    
  ];  
  
  render() {
    return (
      
      <View style={styles.container}>
      
      <ImageBackground source={require('../assets/images/appbgrd.png')} style={styles.backgroundImage}>

          <View style={{flexDirection: 'column', paddingTop : 46}}> 
           
           <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems : 'center', paddingLeft : 50}}>
               <Ionicons name="md-list" size={20} style={{color :'#ffff'}}/>  
               <TextInput placeholder="search songs" style={{ color :'#fff', paddingLeft : 80, width: 150, borderWidth: 0}}/>
               <AntDesign name="search1" size={18} style={{ paddingLeft : 64, color :'#ffff'}}/>  
           </View> 

            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems : 'center', paddingLeft : 50, paddingTop : 10}}>       
              <Text style={styles.songTitleText}>Sort by Songs</Text>    

              <View style={{flexDirection: 'row'}}>
              <Entypo raised name="shuffle" size={18} style={styles.iconShuffle} />
              <AntDesign name="appstore-o" size={18} style={styles.iconControlRight} />   
              </View>    
          </View>

          </View>

       </ImageBackground>
    

      <ScrollView refreshControl={
        
        <RefreshControl
        refreshing={this.state.loading}
        onRefresh={this.onRefresh}
        />
      }>
      
      <List containerStyle={styles.containerLightBorder}>  
      {
        this.data.map((l, i) => (
          
          <ListItem  containerStyle={styles.listItemStyle}     
          key={i}
          title={              
            <View>
            <Text style={{fontSize:14, color:'#3a4354'}}> {l.name} </Text> 
            </View>    
          }
          subtitle={
            <View style={{paddingTop: 6}}>
            <Text style={{fontSize:11, color:'#787d87'}}> {l.subtitle} </Text> 
            </View>             
          }
          
          rightIcon={
            <View>               
            <IconImageDisplay uriPath={l.avatar_url} />
            <Text style={{fontSize:9, color:'#394DCF', paddingRight : 12}}>See Details</Text> 
            </View>   
          }                
          onPress={()=> { 
            this.props.navigation.navigate('DetailScreen', {
              description : l.name, 
              url : l.avatar_url
            });
          }}
          
          />     
          ))                    
        }
        
        </List>  
        
        </ScrollView>
        </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 0,
        marginTop : 0,
        backgroundColor: '#fff'
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        paddingBottom : 0,
        marginBottom : 0
      },
      containerLightBorder : {
        marginBottom: 0, borderColor : '#ffffff', 
        marginTop : 0, paddingTop : 0, borderWidth : 0, borderBottomColor: 'transparent', borderBottomWidth: 0
      },
      songTitleText : {
       fontSize : 13,
       color : '#fff'
      },
      iconControlRight : {
        paddingRight : 4, 
        color : '#fff',
        paddingLeft : 10
       },
       iconShuffle : {
         paddingLeft : 120,color : '#ffff'
       },
       listItemStyle : {
        borderBottomColor: 'transparent' , borderBottomWidth: 0
       }
    });
  