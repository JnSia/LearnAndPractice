import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { Fontisto } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Vibration,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const API_KEY = 'a85b8df7b31fc1e71ed3e2d844c378da';

const icons = {
  Clouds: 'cloudy',
  'clear sky': 'day-sunny',
};

export default function App() {
  const [region, setRegion] = useState('Loading...');
  const [street, setStreet] = useState();
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    setRegion(location[0].region);
    setStreet(location[0].street);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=6&units=metric&appid=${API_KEY}`
    );
    const json = await response.json();
    setDays(json.list);
    console.log(json.list[0]);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.city}>
        <Text style={{ fontSize: 36, fontWeight: 'bold', color: 'white' }}>{region}</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{street}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="green" size="large" />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={{ ...styles.day, alignItems: 'flex-start' }}>
              <Text style={styles.desc}>{day.dt_txt}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
                <Fontisto name={icons[day.weather[0].description]} size={54} color="white" />
              </View>
              <Text style={styles.desc}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
      {/* <TouchableOpacity
        style={styles.glgl}
        onPress={() => Vibration.vibrate(500)}
      ></TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  glgl: {
    backgroundColor: 'green',
    padding: 40,
  },
  city: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weather: {},
  day: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    padding: 40,
    // justifyContent: 'center',
    // backgroundColor: 'green',
  },
  temp: { fontSize: 75, fontWeight: 'bold', color: 'white' },
  desc: { fontSize: 25, fontWeight: 'bold', color: 'white' },
});
