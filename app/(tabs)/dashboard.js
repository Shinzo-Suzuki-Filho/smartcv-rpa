import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Plus, Zap, TrendingUp, Clock } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [resumes, setResumes] = useState([
    { id: 1, title: 'Desenvolvedor Full Stack', date: 'Hoje', status: 'Finalizado' },
    { id: 2, title: 'Gerente de Projetos', date: '2 dias atrás', status: 'Rascunho' },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="px-6 py-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
        }
      >
        <View className="flex-row justify-between items-center mb-10">
          <View>
            <Text className="text-textMuted text-lg">Olá, Shinzo!</Text>
            <Text className="text-textMain text-4xl font-bold tracking-tight">Elite SmartCV</Text>
          </View>
          <TouchableOpacity className="bg-surface p-3 rounded-full border border-secondary shadow-sm">
            <Zap size={24} color={Colors.primary} fill={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View className="bg-surface p-6 rounded-3xl border border-secondary mb-8 shadow-xl">
          <View className="flex-row items-center mb-4">
            <TrendingUp size={20} color={Colors.success} strokeWidth={3} />
            <Text className="text-success font-bold ml-2 uppercase tracking-widest text-xs">Dica de Elite</Text>
          </View>
          <Text className="text-textMain text-xl font-bold mb-2">Potencialize seu Perfil</Text>
          <Text className="text-textMuted leading-6">
            Use nossa IA sofisticada para otimizar suas palavras-chave e bater o sistema de triagem (ATS).
          </Text>
          <TouchableOpacity className="mt-6 bg-primary/20 py-3 rounded-xl border border-primary/30 items-center">
            <Text className="text-primary font-bold">Otimizar com IA</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-textMain text-xl font-bold mb-6 flex-row items-center">
          Currículos Recentes
        </Text>

        {resumes.map((resume) => (
          <TouchableOpacity
            key={resume.id}
            className="bg-surface p-5 rounded-2xl border border-secondary mb-4 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="bg-secondary/40 p-3 rounded-xl">
                <FileText size={24} color={Colors.textMain} />
              </View>
              <View className="ml-4">
                <Text className="text-textMain font-bold text-lg">{resume.title}</Text>
                <View className="flex-row items-center mt-1">
                  <Clock size={12} color={Colors.textMuted} />
                  <Text className="text-textMuted text-sm ml-1">{resume.date}</Text>
                </View>
              </View>
            </View>
            <View className={`px-3 py-1 rounded-full ${resume.status === 'Finalizado' ? 'bg-success/20' : 'bg-gray-500/20'}`}>
              <Text className={`${resume.status === 'Finalizado' ? 'text-success' : 'text-gray-400'} text-xs font-bold`}>
                {resume.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity className="border-2 border-dashed border-secondary p-8 rounded-2xl items-center justify-center mt-4">
          <Plus size={32} color={Colors.secondary} strokeWidth={1} />
          <Text className="text-secondary font-bold mt-2">Criar Novo Masterpiece</Text>
        </TouchableOpacity>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
