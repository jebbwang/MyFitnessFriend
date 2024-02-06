import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TipsBanner from './TipsBanner';
import ListItem from './RecommendationListItem';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ItemSeparator = () => <View style={{ height: 5 }} />; // space out the list items

const Recommendations = () => {
  const [items, setItems] = useState([
    { id: '1', text: 'Drink 2L of water', completed: false },
    { id: '2', text: 'Consume 300 more calories', completed: false },
    { id: '3', text: 'Sleep from 10pm - 6am', completed: false },
  ]);

  const handleToggleCheckbox = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <ListItem
      text={item.text}
      isChecked={item.completed}
      onToggleCheckbox={() => handleToggleCheckbox(item.id)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  // Component to display when there are no items
  const NoRecommendationsComponent = () => (
    <View style={styles.noItemsView}>
      <Text style={styles.noItemsText}>No recommendations yet, keep it up!</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <TipsBanner />
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={NoRecommendationsComponent} // Render when the list is empty
          style={styles.list}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#014EAA',
  },
  list: {
    flex: 1,
    backgroundColor: '#014EAA',
  },
  noItemsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, 
  },
  noItemsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Recommendations;
