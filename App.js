import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { Appbar } from 'react-native-paper';
import InternshipScreen from './screens/InternshipScreen';




export default function App() {
  return (
    <>    
      <Appbar.Header large style={{backgroundColor:'#1a237e'}}>       
        <Appbar.Content title="SIAP" />     
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>
      <InternshipScreen/>
    </> 

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

 {/* <View style={styles.container}>
    <AppBar title="SIAP" />
      <Text>Open up App.js to start working on your app!</Text>
      <ListItem
      leadingMode="avatar"
      leading={
        <Avatar label="Kent Dodds" autoColor />
      }
      title="Brunch this weekend?"
      secondaryText="I'll be in your neighborhood doing errands this…"
    />
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar label="Kent Dodds" autoColor />
      }
      title="Summer BBQ"
      secondaryText="Wish I could come, but I'm out of town this…"
    />
    <ListItem
      leadingMode="avatar"
      leading={
        <Avatar label="Kent Dodds" autoColor />
      }
      title="Oui Oui"
      secondaryText="Do you have Paris recommendations? Have you ever…"
    />
      <StatusBar style="auto" />
    </View> */}
