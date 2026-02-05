import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Sparkles, User, Bot, AlertCircle } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { chatWithAI } from '../../services/GeminiAI';

export default function AIChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Sou seu Consultor de IA da SmartCV Elite. Como posso ajudar você a conquistar sua próxima grande oportunidade hoje?', sender: 'ai' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    const history = messages.map(msg => ({
      role: msg.sender === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const aiResponse = await chatWithAI(inputText, history);
    
    const aiMessage = { id: Date.now() + 1, text: aiResponse, sender: 'ai' };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-secondary">
        <View className="flex-row items-center">
          <View className="bg-primary/20 p-2 rounded-full mr-3">
            <Sparkles size={20} color={Colors.primary} />
          </View>
          <View>
            <Text className="text-textMain font-bold text-lg">Consultor Elite IA</Text>
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-success rounded-full mr-1" />
              <Text className="text-success text-xs font-bold uppercase">Online</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-4 py-4"
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            className={`flex-row mb-6 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <View className="w-8 h-8 rounded-full bg-secondary items-center justify-center mr-2 mt-1">
                <Bot size={16} color={Colors.primary} />
              </View>
            )}
            
            <View 
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-primary rounded-tr-none' 
                  : 'bg-surface border border-secondary rounded-tl-none'
              }`}
            >
              <Text className={`${msg.sender === 'user' ? 'text-white' : 'text-textMain'} leading-6`}>
                {msg.text}
              </Text>
            </View>

            {msg.sender === 'user' && (
              <View className="w-8 h-8 rounded-full bg-primary/20 items-center justify-center ml-2 mt-1 border border-primary/30">
                <User size={16} color={Colors.primary} />
              </View>
            )}
          </View>
        ))}
        {isLoading && (
          <View className="flex-row mb-6 justify-start">
            <View className="w-8 h-8 rounded-full bg-secondary items-center justify-center mr-2 mt-1">
              <Bot size={16} color={Colors.primary} />
            </View>
            <View className="bg-surface border border-secondary px-4 py-3 rounded-2xl rounded-tl-none flex-row items-center">
              <ActivityIndicator size="small" color={Colors.primary} />
              <Text className="text-textMuted ml-2 italic">IA está analisando sua carreira...</Text>
            </View>
          </View>
        )}
        <View className="h-4" />
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <View className="p-4 bg-surface border-t border-secondary flex-row items-center space-x-3">
          <TextInput
            className="flex-1 bg-background text-textMain px-5 py-3 rounded-full border border-secondary"
            placeholder="Pergunte algo para sua IA de elite..."
            placeholderTextColor="#6B7280"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity 
            onPress={handleSend}
            disabled={isLoading}
            className={`p-4 rounded-full ${isLoading ? 'bg-secondary' : 'bg-primary'} shadow-lg shadow-primary/30`}
          >
            <Send size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
