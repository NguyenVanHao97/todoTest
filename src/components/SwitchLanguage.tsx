/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Switch} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import i18next from 'i18next';
import {ToggleButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SwitchLanguage = () => {
  const [selectedLang, setSelectedLanguage] = useState('vi');
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);
  const toggleDropdown = () => {
    setVisible(!visible);
  };
  const lang = [
    {id: 'vi', label: t('VIETNAMESE')},
    {id: 'en', label: t('ENGLISH')},
  ];

  useEffect(() => {
    const getLanguage = async () => {
      try {
        const getLanguageValue = await AsyncStorage.getItem('language');
        if (getLanguageValue !== null) {
          setSelectedLanguage(getLanguageValue);
          i18next.changeLanguage(getLanguageValue);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLanguage();
  }, []);

  const onPressItemLang = (language: string) => {
    AsyncStorage.setItem('language', language);
    setSelectedLanguage(language);
    setVisible(false);
    i18next.changeLanguage(language);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            top: 24,
            right: 0,
          }}>
          {lang.map((item, index) => {
            const lastItem = lang[lang.length - 1];
            return (
              <TouchableOpacity
                key={item.label}
                style={{
                  borderBottomWidth: item === lastItem ? 0 : 1,
                  borderColor: 'gray',
                }}
                onPress={() => {
                  onPressItemLang(item.id);
                }}>
                <Text
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {renderDropdown()}
      <Text>{t('LANGUAGE')}</Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 6,
        }}
        onPress={() => {
          toggleDropdown();
        }}>
        <Text style={{fontSize: 18, color: '#31507F'}}>{selectedLang}</Text>
        <MaterialCommunityIcons name="chevron-down" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default SwitchLanguage;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
