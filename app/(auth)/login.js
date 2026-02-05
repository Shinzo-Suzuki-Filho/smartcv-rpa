import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login logic
    router.replace('/(tabs)/dashboard');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-8">
          <View className="flex-1 items-center justify-center py-12">
            <View className="mb-8 items-center">
              <Image
                source={require('../../assets/logo.png')}
                className="w-32 h-32 mb-4"
                resizeMode="contain"
              />
              <Text className="text-4xl font-bold text-textMain tracking-tighter">
                Smart<Text className="text-primary italic">CV</Text>
              </Text>
              <Text className="text-textMuted mt-2 text-center text-lg">
                Elite RPA & AI Resume Builder
              </Text>
            </View>

            <View className="w-full space-y-4">
              <View className="relative">
                <View className="absolute left-4 top-4 z-10">
                  <Mail size={20} color="#9CA3AF" />
                </View>
                <TextInput
                  placeholder="Seu melhor e-mail"
                  placeholderTextColor="#6B7280"
                  className="bg-surface text-textMain px-12 py-4 rounded-2xl border border-secondary"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View className="relative mt-4">
                <View className="absolute left-4 top-4 z-10">
                  <Lock size={20} color="#9CA3AF" />
                </View>
                <TextInput
                  placeholder="Sua senha secreta"
                  placeholderTextColor="#6B7280"
                  className="bg-surface text-textMain px-12 py-4 rounded-2xl border border-secondary"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                onPress={handleLogin}
                className="bg-primary py-5 rounded-2xl flex-row items-center justify-center shadow-lg shadow-primary/50 mt-6"
              >
                <Text className="text-white font-bold text-lg mr-2">Entrar no Elite</Text>
                <ArrowRight size={20} color="white" />
              </TouchableOpacity>
            </View>

            <View className="w-full mt-10">
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-[1px] bg-secondary" />
                <Text className="mx-4 text-textMuted text-xs uppercase tracking-widest">ou continue com</Text>
                <View className="flex-1 h-[1px] bg-secondary" />
              </View>

              <View className="flex-row space-x-4">
                <TouchableOpacity className="flex-1 flex-row bg-surface py-4 rounded-2xl border border-secondary items-center justify-center">
                  <Github size={20} color="#F9FAFB" className="mr-2" />
                  <Text className="text-textMain font-semibold">GitHub</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-12 flex-row">
              <Text className="text-textMuted">Não tem uma conta elite? </Text>
              <TouchableOpacity>
                <Text className="text-primary font-bold">Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
