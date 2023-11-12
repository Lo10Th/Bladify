import React, { memo, useCallback, useRef, useState } from 'react';
import { Button, Dimensions, Text, View, Platform } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

export const Searchbar = memo(() => {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownController = useRef(null);

  const searchRef = useRef(null);

  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase();
    console.log('getSuggestions', q);
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.178.90:5000/search/${q}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const suggestions = data.map(item => ({
        id: item.id,
        title: item.title,
      }));
      setSuggestionsList(suggestions);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  const onOpenSuggestionsList = useCallback(isOpened => {}, []);

  return (
    <>
      <View
        style={[
          { flex: 1, flexDirection: 'row', alignItems: 'center' },
          Platform.select({ ios: { zIndex: 1 } }),
        ]}>
        <AutocompleteDropdown
          ref={searchRef}
          controller={controller => {
            dropdownController.current = controller;
          }}
          direction={Platform.select({ ios: 'down' })}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={item => {
            item && setSelectedItem(item.id);
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          onClear={onClearPress}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false}
          textInputProps={{
            placeholder: 'Type 3+ letters (dolo...)',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
              backgroundColor: '#383b42',
              color: '#fff',
              paddingLeft: 18,
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,
            alignSelf: 'center',
          }}
          inputContainerStyle={{
            backgroundColor: '#383b42',
            borderRadius: 25,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: '#383b42',
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => <Text style={{ color: '#fff', padding: 15 }}>{item.title}</Text>}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
        />
        <View style={{ width: 10 }} />
        <Button style={{ flexGrow: 0 }} title="Toggle" onPress={() => dropdownController.current.toggle()} />
      </View>
      <Text style={{ color: '#668', fontSize: 13 }}>Selected item id: {JSON.stringify(selectedItem)}</Text>
    </>
  );
});
