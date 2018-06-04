/*
 * @Author: zhaoxiaoqi 
 * @Date: 2018-04-12 23:18:09 
 * @Last Modified by: zhaoxiaoqi
 * @Last Modified time: 2018-06-04 17:15:24
 */
import React from 'react';
import {
  AppRegistry,
  NativeModules,
  StyleSheet,
  asset,
  Pano,
  Text,
  View,
  Model,
  Scene,
} from 'react-vr';

  
export default class Room extends React.Component {

  constructor() {
    super();
    this.state = {
      controllers: null,
    }
  }

  render() {
    return (
      <View>
        {/* <Model
          source={{
            mtl: asset('models/tree/sakura.mtl'),
            obj: asset('models/tree/sakura.obj'),
          }}
          style={{
            transform: [
                { translate: [6, 0.3, 15]}, //初始化进入时的高度
                // { rotateY: 0 },         //矫正camera的视角
                { scale: [1.2, 1.2, 1.2]}
            ],
          }}
          lit={true}
        ></Model> */}
        <Model
          source={{
            mtl: asset('models/main_room/newroom002.mtl'),
            obj: asset('models/main_room/newroom002.obj'),
          }}
          style={{
            transform: [
                { translate: [0, 0, 0]}, //初始化进入时的高度
                // { rotateY: 0 },         //矫正camera的视角
                { scale: [0.8, 0.6, 0.8]}
            ],
          }}
          lit={true}
        >
        </Model>
      </View>    
    )
  }
}