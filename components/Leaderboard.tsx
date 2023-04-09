import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const players = [
  {
    id: 1,
    name: "John",
    score: 300,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rank: 1
  },
  {
    id: 2,
    name: "Jane",
    score: 250,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rank: 2
  },
  {
    id: 3,
    name: "Bob",
    score: 200,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rank: 3
  },
  {
    id: 4,
    name: "Alice",
    score: 150,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rank: 4
  },
  {
    id: 5,
    name: "Tom",
    score: 100,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rank: 5
  },
  {
    id: 6,
    name: "Lisa",
    score: 50,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rank: 6
  },
  {
    id: 7,
    name: "Lisa",
    score: 50,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rank: 7
  },
  {
    id: 8,
    name: "Lisa",
    score: 50,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rank: 8
  },
  {
    id: 9,
    name: "Lisa",
    score: 50,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rank: 9
  },
  {
    id: 10,
    name: "Lisa",
    score: 50,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rank: 10
  },
  {
    id: 11,
    name: "Lisa",
    score: 50,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rank: 11
  },
  {
    id: 12,
    name: "Lisa",
    score: 50,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rank: 12
  },

];

const Leaderboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require('../Assets/Images/jashnLogoWBG.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.ranksContainer}>
        <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'space-around', alignItems:'center' }}>
          <View style={styles.rankItemTop}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: players[1].avatar }}
                style={styles.avatar}
              />
              <View style={styles.rank}>
                <Text style={styles.rankText}>{players[1].rank}</Text>
              </View>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{players[1].name}</Text>
              <Text style={styles.score}>{players[1].score}</Text>
            </View>
          </View>
          <View style={styles.rankItemTop}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: players[0].avatar }}
                style={styles.avatar}
              />
              <View style={styles.rank}>
                <Text style={styles.rankText}>{players[0].rank}</Text>
              </View>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{players[0].name}</Text>
              <Text style={styles.score}>{players[0].score}</Text>
            </View>
          </View>
          <View style={styles.rankItemTop}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: players[2].avatar }}
                style={styles.avatar}
              />
              <View style={styles.rank}>
                <Text style={styles.rankText}>{players[2].rank}</Text>
              </View>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{players[2].name}</Text>
              <Text style={styles.score}>{players[2].score}</Text>
            </View>
          </View>
        </View>
        <ScrollView style={{ flex: 9 }}>
          {players.slice(3).map((player) => (
            <View key={player.id} style={styles.rankItem}>
              <View style={{ flex: 3, flexDirection: 'row' }}>
                <Text style={styles.rankTextTop}>{player.rank}</Text>
                <View style={styles.avatarContainerTop}>
                  <Image
                    source={{ uri: player.avatar }}
                    style={styles.avatar}
                  />
                </View>
                <Text style={styles.nameTop}>{player.name}</Text>
              </View>

              <Text style={styles.scoreTop}>{player.score}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        {/* <MaterialIcons name="home" size={28} style={styles.icon} />
        <MaterialIcons name="search" size={28} style={styles.icon} />
        <MaterialIcons name="add" size={28} style={styles.icon} />
        <MaterialIcons name="favorite" size={28} style={styles.icon} />
        <MaterialIcons name="person" size={28} style={styles.icon} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12121b',
  },
  header: {
    backgroundColor: '#201d28',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  headerTitle: {
    color: '#dadadb',
    fontSize: 28,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  ranksContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',

    paddingHorizontal: 20,
  },
  rankItem: {
    borderTopWidth: 1,
    borderColor: '#1c1c24',
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  rankItemTop: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'space-around',
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 10,
    flex:1,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainerTop: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  rank: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'gold',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankTop: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center'
  },
  rankTextTop: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  },
  userInfo: {
    marginLeft: 20,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  nameTop: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    flex:1,
  },
  score: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#36363d',
    borderRadius: 15,
    textAlign: 'center',
  },
  scoreTop: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#36363d',
    borderRadius: 15,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
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
});

export default Leaderboard;