import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setEditScreenNo, setFooterItem, setInEditingMode } from '../../Actions/navigationActions';
import { RootState } from '../../States/types';
import Leaderboard from '../Leaderboard';
import RulesScreen from '../RulesScreen ';
import AddCashFeed from './AddCashFeed';
import Footer from './Footer';
import HomeFeed from './HomeFeed';
import MyRewards from './MyRewardsFeed';
import MyWallet from './MyWalletFeed';
import ProfileInformation from './ProfileInfo';
const ruleTopImage = require('../../Assets/Images/Main/newEvent.png');

const MainFeed = () => {
  const dispatch = useDispatch();
  const footerItem = useSelector((state: RootState) => state.navigationReducer.footerItem);
  const inEditingMode = useSelector((state: RootState) => state.navigationReducer.inEditingMode);
  const editScreenNo = useSelector((state: RootState) => state.navigationReducer.editScreenNo);

  function moveToWalletFeed() {
    console.log("asfaas");
    dispatch(setInEditingMode(true));
    dispatch(setEditScreenNo(1));
  }

  function moveToHomePage() {
    console.log("asfdsaasfaas");
    dispatch(setInEditingMode(false));
    dispatch(setFooterItem(1));
  }

  if (inEditingMode) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {
            editScreenNo == 1 ? (
              <View style={styles.editHeaderOut}>
                <View style={styles.editHeaderIn}>
                  <Text style={styles.headerTitle}>My Wallet</Text>
                </View>
                <TouchableOpacity style={styles.editBackBtn} onPress={moveToHomePage} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                  <Image source={require('../../Assets/Images/Main/backArrow.png')} style={styles.editBackBtnImg} />
                </TouchableOpacity>
              </View>
            ) : editScreenNo == 2 ? (
              <View style={styles.editHeaderOut}>
                <View style={styles.editHeaderIn}>
                  <Text style={styles.headerTitle}>Add Cash</Text>
                </View>
                <TouchableOpacity style={styles.editBackBtn} onPress={moveToWalletFeed} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                  <Image source={require('../../Assets/Images/Main/backArrow.png')} style={styles.editBackBtnImg} />
                </TouchableOpacity>
              </View>

            ) : editScreenNo == 3 ? (
              <TouchableOpacity style={styles.editBackBtn} onPress={moveToHomePage} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                <Image source={require('../../Assets/Images/Main/backArrow.png')} style={styles.editBackBtnImg} />
              </TouchableOpacity>
            ) : editScreenNo == 4 ? (
              <Text style={styles.headerTitle}>Leaderboard</Text>
            ) : editScreenNo == 5 ? (
              <Text style={styles.headerTitle}>Leaderboard</Text>
            ) : (
              <></>
            )
          }

        </View>

        {
          editScreenNo == 1 ? (
            <MyWallet />
          ) : editScreenNo == 2 ? (
            <AddCashFeed />
          ) : editScreenNo == 3 ? (
            <MyRewards />
          ) : editScreenNo == 4 ? (
            <Leaderboard />
          ) : editScreenNo == 5 ? (
            <ProfileInformation />
          ) : (
            <></>
          )
        }
      </View>
    );
  } else {
    return (
      <View style={styles.container}>

        {
          footerItem == 1 ? (
            <View style={styles.header}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'column', flex: 2 }}>
                  <Text style={styles.headerTitleUp}>Hello, Jeet</Text>
                  <Text style={styles.headerTitle}>Welcome Back</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 1 }}>
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      backgroundColor: '#404049',
                      borderRadius: 50,
                      width: 50,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => moveToWalletFeed()}
                  >
                    <Image
                      source={require('../../Assets/Images/Main/walletIcon.png')}
                      style={{ width: '75%', height: '75%', resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      backgroundColor: '#404049',
                      borderRadius: 50,
                      width: 50,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={require('../../Assets/Images/Main/notificationIcon.png')}
                      style={{ width: '75%', height: '75%', resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          ) : footerItem == 2 ? (
            <Text style={styles.headerTitle}></Text>
          ) : footerItem == 3 ? (
            <></>
          ) : footerItem == 4 ? (
            <></>
          ) : footerItem == 5 ? (
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Profile</Text>
              {/* <TouchableOpacity style={{position:'absolute', right:10, flexDirection:'row'}}>
                <Text style={{color:'white',fontSize:10}}><Image style={{width:10, resizeMode: 'contain'}} source={require('../../Assets/Images/Main/footer/home.png')}/>Edit</Text>
              </TouchableOpacity> */}
            </View>
          ) : (
            <></>
          )
        }

        {
          footerItem == 1 ? (
            <HomeFeed />
          ) : footerItem == 2 ? (
            <MyWallet />
          ) : footerItem == 3 ? (
            <RulesScreen topImg={ruleTopImage} />
          ) : footerItem == 4 ? (
            <Leaderboard />
          ) : footerItem == 5 ? (
            <ProfileInformation />
          ) : (
            <></>
          )
        }
        <Footer />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12121b',
  },
  header: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    height: '7.5%',
  },
  headerTitle: {
    color: '#dadadb',
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerTitleUp: {
    color: '#dadadb',
    fontSize: 12.5,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: 'black',
  },
  icon: {
    color: 'white',
  },
  editBackBtn: {
    height: 40,
    width: 40,
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#36363d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBackBtnImg:
  {
    height: '100%',
    resizeMode: 'contain'
  },
  editHeaderOut: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  editHeaderIn: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MainFeed;