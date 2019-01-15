import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Animated
} from 'react-native';
import { WebBrowser } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import { Asset, Audio, Font, Video } from 'expo';

export default class HomeScreen extends React.Component {
  
  static soundObject; 
  isAudioPlaying = false; 
  isLoaded = false;
  
  constructor(props) {
    
    super(props);    
    this.soundObject = new Expo.Audio.Sound();     
    this.spinValue = new Animated.Value(0);

    this.runAnimation(); 
    
  }
   
  static navigationOptions = {
    header: null,
  };
  
  runAnimation = () => {

    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue, 
      {
        toValue : 3, 
        duration : 8000       
      }
    ).start()
  }
 

  render() {
    return (
      <View style={styles.container}>
      
      <Image source={require('../assets/images/appbgrd.png')} style={styles.backgroundImage} />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      <View style={styles.helpContainer}>
      <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
      <Text style={styles.songTitleText}>Thunder</Text>
      <Text style={styles.songBandText}>Imagine Dragons</Text>              
      </TouchableOpacity>
      

      <Animated.View View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems : 'center',
       opacity : this.spinValue }}>    
      <TouchableOpacity onPress={this._controlPlayPrevious} style={styles.helpLink}>          
      <MaterialIcons name="skip-previous" size={30} style={styles.iconControlLeft} />
      </TouchableOpacity>

      
      <TouchableOpacity onPress={this._controlPlayOrPause} style={styles.helpLink}>
      <MaterialIcons name="play-circle-filled" size={80} color="#7AEEBA" style={styles.outerCircle} />
      </TouchableOpacity>
      

      <TouchableOpacity onPress={this._controlPlayPNext} style={styles.helpLink}>
      <MaterialIcons name="skip-next" size={30} color="#a3b4fd" style={styles.iconControlRight} />
      </TouchableOpacity>    

      </Animated.View>
      </View>
      </ScrollView>
      </View>
      );
    }
    
    _maybeRenderDevelopmentModeWarning() {
      if (__DEV__) {
        const learnMoreButton = (
          <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
          </Text>
          );
          
          return (
            <Text style={styles.developmentModeText}>
            Development mode is enabled, your app will be slower but you can use useful development
            tools. {learnMoreButton}
            </Text>
            );
          } else {
            return (
              <Text style={styles.developmentModeText}>
              You are not in development mode, your app will run at full speed.
              </Text>
              );
            }
            
          }
          
          _handleLearnMorePress = () => {
            WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
          };
          
          _controlPlayPrevious = () => {
            
          }          
          
          _controlPlayPNext = async () => {  
            
            console.log('next');
            const source =  new PlaylistItem(
              'Comfort Fit - “Sorry”',
              'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              false
              );  
              await this.soundObject.unloadAsync();
              await this.soundObject.loadAsync(source, {}, true);
              await this.soundObject.playAsync();
            }
            
            _controlPlayOrPause = async () => {
              
              if (this.isAudioPlaying)
              {
                console.log('pause');
                await this.soundObject.pauseAsync();
                this.isAudioPlaying = false;
                return;
              }
              
              try {
                
                console.log('play');
                
                const source =  new PlaylistItem(
                  'Comfort Fit - “Sorry”',
                  'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
                  false
                  );
                  
                  
                  this.isAudioPlaying = true;                                 
                  this.soundObject = new Expo.Audio.Sound();   
                  
                  console.log(this.soundObject.getStatusAsync());
                  
                  await this.soundObject.loadAsync(source, {}, true);
                  await this.soundObject.playAsync();      
                  
                  
                  // Your sound is playing!
                } catch (error) {
                  // An error occurred!
                }
              }
              
              _handleHelpPress = () => {
                WebBrowser.openBrowserAsync(
                  'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
                  );
                };
                
                PLAYLIST = [
                  new PlaylistItem(
                    'Comfort Fit - “Sorry”',
                    'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
                    false
                    ),
                    new PlaylistItem(
                      'Big Buck Bunny',
                      'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                      true
                      ),
                      new PlaylistItem(
                        'Mildred Bailey – “All Of Me”',
                        'https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3',
                        false
                        ),
                        new PlaylistItem(
                          "Popeye - I don't scare",
                          'https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4',
                          true
                          ),
                          new PlaylistItem(
                            'Podington Bear - “Rubber Robot”',
                            'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3',
                            false
                            ),
                          ];
                          
                        }
                        
                        
                        const styles = StyleSheet.create({
                          backgroundImage: {
                            flex: 1,
                            resizeMode: 'cover', // or 'stretch'
                          },
                          playCtrl: {
                            height : 60, width : 90
                          },
                          iconControlLeft : {
                            paddingRight : 20, 
                            color : '#a3b4fd'
                          },
                          iconControlRight : {
                            paddingLeft : 20, 
                            color : '#a3b4fd'
                          },
                          container: {
                            flex: 1,
                            backgroundColor: '#fff',
                          },
                          developmentModeText: {
                            marginBottom: 20,
                            color: 'rgba(0,0,0,0.4)',
                            fontSize: 14,
                            lineHeight: 19,
                            textAlign: 'center',
                          },
                          contentContainer: {
                            paddingTop: 30,
                          },
                          welcomeContainer: {
                            alignItems: 'center',
                            marginTop: 10,
                            marginBottom: 20,
                          },
                          welcomeImage: {
                            width: 100,
                            height: 80,
                            resizeMode: 'contain',
                            marginTop: 3,
                            marginLeft: -10,
                          },
                          getStartedContainer: {
                            alignItems: 'center',
                            marginHorizontal: 50,
                          },
                          homeScreenFilename: {
                            marginVertical: 7,
                          },
                          codeHighlightText: {
                            color: 'rgba(96,100,109, 0.8)',
                          },
                          codeHighlightContainer: {
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            borderRadius: 3,
                            paddingHorizontal: 4,
                          },
                          getStartedText: {
                            fontSize: 17,
                            color: 'rgba(96,100,109, 1)',
                            lineHeight: 24,
                            textAlign: 'center',
                          },
                          tabBarInfoContainer: {
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            ...Platform.select({
                              ios: {
                                shadowColor: 'black',
                                shadowOffset: { height: -3 },
                                shadowOpacity: 0.1,
                                shadowRadius: 3,
                              },
                              android: {
                                elevation: 20,
                              },
                            }),
                            alignItems: 'center',
                            backgroundColor: '#fbfbfb',
                            paddingVertical: 20,
                          },
                          songTitleText: {
                            fontSize: 20,
                            color: 'rgba(96,100,109, 1)',
                            textAlign: 'center', fontWeight : "bold",    
                          },
                          songBandText: {
                            fontSize: 15,
                            fontStyle : "italic",    
                            color: 'rgba(96,100,109, 1)',
                            textAlign: 'center',
                          },
                          navigationFilename: {
                            marginTop: 5,
                          },
                          helpContainer: {
                            marginTop: 8,
                            alignItems: 'center',
                          },
                          helpLink: {
                            paddingVertical: 15,
                          },
                          helpLinkText: {
                            fontSize: 14,
                            color: '#2e78b7',
                          },
                          outerCircle: {
                            borderRadius: 40,
                            width: 80,
                            height: 80,
                            backgroundColor: 'white',
                            borderColor : '#efefef',
                            borderWidth : 2
                          }
                        });
                        
                        
                        class PlaylistItem {
                          constructor(name, uri, isVideo) {
                            this.name = name;
                            this.uri = uri;
                            this.isVideo = isVideo;
                          }
                        }