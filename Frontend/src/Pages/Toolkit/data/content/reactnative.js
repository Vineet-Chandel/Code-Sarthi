export default {
  topics: [
    {
      id: "core-components",
      title: "Core Components",
      sections: [
        {
          heading: "Basic components",
          description: "React Native maps JSX to native UI — no HTML elements. View, Text, Image are the building blocks.",
          language: "jsx",
          code: `import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function ProfileCard({ user }) {
  return (
    <View style={{ padding: 16, backgroundColor: '#fff' }}>
      <Image
        source={{ uri: user.avatar }}
        style={{ width: 80, height: 80, borderRadius: 40 }}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.name}</Text>
      <Text style={{ color: '#666' }}>{user.bio}</Text>

      <TouchableOpacity
        onPress={() => console.log('Follow!')}
        style={{ backgroundColor: '#3b82f6', padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
}`,
        },
        {
          heading: "FlatList — performant lists",
          description: "FlatList virtualises long lists — only renders items visible on screen.",
          language: "jsx",
          code: `import { FlatList, View, Text } from 'react-native';

const DATA = Array.from({ length: 100 }, (_, i) => ({ id: String(i), title: \`Item \${i}\` }));

export default function MyList() {
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#eee' }}>
          <Text>{item.title}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#f0f0f0' }} />}
      ListEmptyComponent={<Text>No items</Text>}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
}`,
        },
        {
          heading: "TextInput",
          description: "React Native's TextInput is controlled — always pair value + onChangeText.",
          language: "jsx",
          code: `import { useState } from 'react';
import { TextInput, View, Text } from 'react-native';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search..."
        placeholderTextColor="#999"
        autoCapitalize="none"
        returnKeyType="search"
        onSubmitEditing={() => console.log('Search:', query)}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 12,
          fontSize: 16,
        }}
      />
      {query.length > 0 && <Text>Results for: {query}</Text>}
    </View>
  );
}`,
        },
      ],
    },
    {
      id: "stylesheet",
      title: "StyleSheet",
      sections: [
        {
          heading: "StyleSheet.create",
          description: "StyleSheet.create validates styles at dev time and optimises them at runtime.",
          language: "jsx",
          code: `import { StyleSheet, View, Text } from 'react-native';

export default function Card({ title, subtitle }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,  // Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});`,
        },
        {
          heading: "Flexbox in React Native",
          description: "React Native uses Flexbox by default — but flexDirection defaults to column (not row).",
          language: "jsx",
          code: `const styles = StyleSheet.create({
  container: {
    flex: 1,                     // take all available space
    flexDirection: 'column',     // default (unlike CSS!)
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  card: {
    flex: 1,                     // equal width siblings
    aspectRatio: 1,              // square
  },
});`,
        },
      ],
    },
    {
      id: "navigation",
      title: "Navigation",
      sections: [
        {
          heading: "React Navigation — stack",
          description: "React Navigation is the standard library. Stack Navigator manages a push/pop history.",
          language: "jsx",
          code: `import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home"   component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen}
          options={{ title: 'Post Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Navigate from a screen
function HomeScreen({ navigation }) {
  return (
    <Button title="Go to detail"
      onPress={() => navigation.navigate('Detail', { id: 42 })} />
  );
}

// Receive params
function DetailScreen({ route }) {
  const { id } = route.params;
  return <Text>Post {id}</Text>;
}`,
        },
      ],
    },
    {
      id: "platform-apis",
      title: "Platform APIs",
      sections: [
        {
          heading: "Platform-specific code",
          description: "Platform.OS lets you branch between iOS and Android. .ios.js / .android.js extensions auto-select.",
          language: "jsx",
          code: `import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 44 : 24,  // status bar height
    ...Platform.select({
      ios:     { shadowColor: '#000', shadowOpacity: 0.1 },
      android: { elevation: 4 },
    }),
  },
});

// Platform.Version
if (Platform.OS === 'android' && Platform.Version < 28) {
  // Workaround for older Android
}`,
        },
        {
          heading: "AsyncStorage — persistent storage",
          description: "AsyncStorage is a simple key-value store that persists across app restarts.",
          language: "jsx",
          code: `import AsyncStorage from '@react-native-async-storage/async-storage';

// Store
await AsyncStorage.setItem('user', JSON.stringify({ id: 1, name: 'Vineet' }));

// Retrieve
const raw  = await AsyncStorage.getItem('user');
const user = raw ? JSON.parse(raw) : null;

// Remove
await AsyncStorage.removeItem('user');

// Multiple keys
await AsyncStorage.multiSet([
  ['theme', 'dark'],
  ['lang',  'en'],
]);`,
        },
      ],
    },
  ],
};
