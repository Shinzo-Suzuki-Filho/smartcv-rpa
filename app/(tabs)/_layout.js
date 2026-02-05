import { Tabs } from 'expo-router';
import { LayoutDashboard, FilePlus, Sparkles, User, Settings } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.secondary,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 15,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="create-cv"
        options={{
          title: 'Criar CV',
          tabBarIcon: ({ color, size }) => (
            <View className="bg-primary p-3 rounded-full -mt-10 shadow-lg shadow-primary/40">
              <FilePlus size={size} color="white" strokeWidth={2.5} />
            </View>
          ),
          tabBarLabel: () => null, // Floating action button style
        }}
      />
      <Tabs.Screen
        name="ai-chat"
        options={{
          title: 'Elite IA',
          tabBarIcon: ({ color, size }) => <Sparkles size={size} color={color} strokeWidth={2.5} />,
        }}
      />
    </Tabs>
  );
}
