import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronRight, ChevronLeft, Save, Sparkles, CheckCircle2 } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { dbService } from '../../services/Database';
import { optimizeContent } from '../../services/GeminiAI';

export default function CreateCVScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loadingAI, setLoadingAI] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    template: 'professional',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleAIImprove = async (field) => {
    if (!formData[field]) return;
    setLoadingAI(true);
    const improved = await optimizeContent(formData[field], field);
    setFormData({ ...formData, [field]: improved });
    setLoadingAI(false);
  };

  const handleSave = async () => {
    try {
      if (!formData.title || !formData.fullName) {
        Alert.alert('Erro', 'Por favor, preencha pelo menos o título e seu nome completo.');
        return;
      }
      await dbService.saveResume(formData);
      Alert.alert('Sucesso', 'Gênio! Seu currículo de elite foi salvo localmente.', [
        { text: 'Ir para Início', onPress: () => router.replace('/(tabs)/dashboard') }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um problema ao salvar seu currículo.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View className="space-y-6">
            <Text className="text-textMain text-2xl font-bold mb-4">Informações Básicas</Text>
            <View>
              <Text className="text-textMuted mb-2">Título do Currículo (ex: Dev Senior)</Text>
              <TextInput
                className="bg-surface text-textMain p-4 rounded-xl border border-secondary"
                value={formData.title}
                onChangeText={(val) => setFormData({ ...formData, title: val })}
                placeholder="Ex: Arquiteto de Software Elite"
                placeholderTextColor="#6B7280"
              />
            </View>
            <View>
              <Text className="text-textMuted mb-2">Nome Completo</Text>
              <TextInput
                className="bg-surface text-textMain p-4 rounded-xl border border-secondary"
                value={formData.fullName}
                onChangeText={(val) => setFormData({ ...formData, fullName: val })}
              />
            </View>
            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <Text className="text-textMuted mb-2">E-mail</Text>
                <TextInput
                  className="bg-surface text-textMain p-4 rounded-xl border border-secondary"
                  value={formData.email}
                  onChangeText={(val) => setFormData({ ...formData, email: val })}
                  keyboardType="email-address"
                />
              </View>
              <View className="flex-1">
                <Text className="text-textMuted mb-2">Telefone</Text>
                <TextInput
                  className="bg-surface text-textMain p-4 rounded-xl border border-secondary"
                  value={formData.phone}
                  onChangeText={(val) => setFormData({ ...formData, phone: val })}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>
        );
      case 2:
        return (
          <View className="space-y-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-textMain text-2xl font-bold">Resumo Profissional</Text>
              <TouchableOpacity 
                onPress={() => handleAIImprove('summary')}
                className="flex-row items-center bg-primary/20 px-3 py-1 rounded-full border border-primary/40"
              >
                <Sparkles size={14} color={Colors.primary} />
                <Text className="text-primary text-xs font-bold ml-1">Otimizar com IA</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              className="bg-surface text-textMain p-4 rounded-xl border border-secondary h-40 text-left"
              multiline
              textAlignVertical="top"
              value={formData.summary}
              onChangeText={(val) => setFormData({ ...formData, summary: val })}
              placeholder="Descreva sua trajetória de elite..."
              placeholderTextColor="#6B7280"
            />
            {loadingAI && <Text className="text-primary animate-pulse text-center">IA trabalhando em progresso...</Text>}
          </View>
        );
      case 3:
        return (
          <View className="space-y-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-textMain text-2xl font-bold">Experiências e Skills</Text>
            </View>
            <View>
              <Text className="text-textMuted mb-2">Histórico Profissional</Text>
              <TextInput
                className="bg-surface text-textMain p-4 rounded-xl border border-secondary h-32"
                multiline
                textAlignVertical="top"
                value={formData.experience}
                onChangeText={(val) => setFormData({ ...formData, experience: val })}
              />
            </View>
            <View>
              <Text className="text-textMuted mb-2">Habilidades (separadas por vírgula)</Text>
              <TextInput
                className="bg-surface text-textMain p-4 rounded-xl border border-secondary"
                value={formData.skills}
                onChangeText={(val) => setFormData({ ...formData, skills: val })}
                placeholder="React, Node.js, AI, Liderança..."
                placeholderTextColor="#6B7280"
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <View className="px-6 py-4 flex-row items-center border-b border-secondary">
          <View className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <View 
              className="h-full bg-primary" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </View>
          <Text className="ml-4 text-textMuted font-bold">{step}/3</Text>
        </View>

        <ScrollView className="flex-1 px-6 py-8">
          {renderStep()}
          <View className="h-20" />
        </ScrollView>

        <View className="p-6 bg-surface border-t border-secondary flex-row gap-x-4">
          {step > 1 && (
            <TouchableOpacity 
              onPress={prevStep}
              className="flex-1 border border-secondary py-4 rounded-2xl items-center flex-row justify-center"
            >
              <ChevronLeft size={20} color={Colors.textMuted} />
              <Text className="text-textMuted font-bold ml-1">Voltar</Text>
            </TouchableOpacity>
          )}
          
          {step < 3 ? (
            <TouchableOpacity 
              onPress={nextStep}
              className="flex-[2] bg-primary py-4 rounded-2xl items-center flex-row justify-center shadow-lg shadow-primary/30"
            >
              <Text className="text-white font-bold mr-1">Próximo Passo</Text>
              <ChevronRight size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              onPress={handleSave}
              className="flex-[2] bg-success py-4 rounded-2xl items-center flex-row justify-center shadow-lg shadow-success/30"
            >
              <Save size={20} color="white" />
              <Text className="text-white font-bold ml-2">Finalizar Masterpiece</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
