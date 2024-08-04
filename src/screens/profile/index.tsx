/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useAuthFacade} from '../../store/auth/useAuthFacade';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SwitchLanguage from '../../components/SwitchLanguage';
import {useTranslation} from 'react-i18next';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const ProfileScreen = () => {
  const {logout, user} = useAuthFacade();
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      showMessage({
        message: 'Success',
        description: 'Logout Success',
        type: 'success',
      });
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <View style={styles.container}>
      <FlashMessage
        hideStatusBar={false}
        statusBarHeight={StatusBar.currentHeight}
        position="top"
      />
      <>
        <Text style={styles.title}>{t('PROFILE')}</Text>
        <View style={{position: 'absolute', right: 12, top: 6}}>
          <SwitchLanguage />
        </View>
      </>
      <View style={styles.viewProfile}>
        <Image
          source={require('../../assets/image/avatar.png')}
          style={{height: 50, width: 50}}
        />
        <View style={{marginLeft: 12}}>
          <Text
            style={{
              fontSize: 18,
              color: '#31507F',
              fontWeight: '600',
            }}>
            {t('FULL_NAME')}
          </Text>
          <Text style={{fontSize: 12, color: '#31507F'}}>{user?.email}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 12,
          marginHorizontal: 12,
          borderRadius: 12,
        }}>
        <Text style={{fontSize: 18, color: '#31507F'}}>{t('LOCATION')}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 12, color: '#31507F'}}>TP.Hồ Chí Minh</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#31507F"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 12,
          marginHorizontal: 12,
          borderRadius: 12,
        }}>
        <Text style={{fontSize: 18, color: '#31507F'}}>
          {t('NOTIFICATION')}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 12, color: '#31507F'}}>ON</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#31507F"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 12,
          marginHorizontal: 12,
          borderRadius: 12,
        }}>
        <Text style={{fontSize: 18, color: '#31507F'}}>{t('TEMPERATURE')}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 12, color: '#31507F'}}>c</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#31507F"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 12,
          marginHorizontal: 12,
          borderRadius: 12,
        }}>
        <Text style={{fontSize: 18, color: '#31507F'}}>{t('HELP')}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={{fontSize: 12, color: '#31507F'}}>c</Text> */}
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#31507F"
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: 24,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 12,
          marginHorizontal: 12,
          borderRadius: 12,
        }}
        onPress={handleLogout}>
        <Text style={{fontSize: 18, color: '#31507F'}}>{t('LOGOUT')}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={{fontSize: 12, color: '#31507F'}}>c</Text> */}
          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color="#31507F"
          />
        </View>
      </TouchableOpacity>
      {/* <View style={{}}>
        <TouchableOpacity onPress={handleLogout}>
          <View
            style={{
              ...styles.button,
              backgroundColor: loading ? '#0000ff' : '#8CACFF',
            }}>
            {loading && <ActivityIndicator size="large" color="white" />}
            <Text style={styles.buttonText}>
              {loading ? ' Loading' : 'Logout'}
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 240,
    height: 50,
    // borderWidth: 1,
    // borderColor: '#666',
    borderRadius: 10,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  viewProfile: {
    flexDirection: 'row',
    marginTop: 60,
    alignContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
  },
  title: {
    color: '#31507F',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
});
