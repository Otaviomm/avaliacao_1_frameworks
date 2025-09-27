<template>
  <v-dialog v-model="dialogInterno" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ personagemParaEdicao ? 'Editar Personagem' : 'Adicionar Personagem' }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nome*" v-model="personagem.nome" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Raça" v-model="personagem.raca"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                label="Classe*"
                v-model="personagem.classe"
                :items="listaDeClasses"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                label="Subclasse*"
                v-model="personagem.subclasse"
                :items="subclassesDisponiveis"
                :disabled="!personagem.classe"
                required
                no-data-text="Selecione uma classe primeiro"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <small>*Campos obrigatórios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" text @click="dialogInterno = false">Cancelar</v-btn>
        <v-btn color="blue-darken-1" variant="tonal" @click="salvar">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed, onUpdated } from 'vue'

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true
  },
  personagemParaEdicao: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:dialog', 'salvar'])

const classesDoJogo = [
  { nome: 'Bárbaro', subclasses: ['Caminho do Berserker', 'Caminho do Coração Selvagem', 'Caminho da Magia Selvagem'] },
  { nome: 'Bardo', subclasses: ['Colégio do Conhecimento', 'Colégio do Valor', 'Colégio das Espadas'] },
  { nome: 'Clérigo', subclasses: ['Domínio da Vida', 'Domínio da Luz', 'Domínio da Enganação', 'Domínio do Conhecimento', 'Domínio da Natureza', 'Domínio da Tempestade', 'Domínio da Guerra'] },
  { nome: 'Druida', subclasses: ['Círculo da Terra', 'Círculo da Lua', 'Círculo dos Esporos'] },
  { nome: 'Guerreiro', subclasses: ['Mestre de Batalha', 'Campeão', 'Cavaleiro Arcano'] },
  { nome: 'Monge', subclasses: ['Caminho da Mão Aberta', 'Caminho da Sombra', 'Caminho dos Quatro Elementos'] },
  { nome: 'Paladino', subclasses: ['Juramento dos Anciões', 'Juramento da Devoção', 'Juramento da Vingança', 'Quebrador de Juramento'] },
  { nome: 'Ranger', subclasses: ['Mestre das Feras', 'Perseguidor Sombrio', 'Caçador'] },
  { nome: 'Ladino', subclasses: ['Trapaceiro Arcano', 'Assassino', 'Ladrão'] },
  { nome: 'Feiticeiro', subclasses: ['Linhagem Dracônica', 'Feitiçaria da Tempestade', 'Magia Selvagem'] },
  { nome: 'Bruxo', subclasses: ['O Arquifada', 'O Demônio', 'O Grande Antigo'] },
  { nome: 'Mago', subclasses: ['Escola de Abjuração', 'Escola de Conjuração', 'Escola de Adivinhação', 'Escola de Encantamento', 'Escola de Evocação', 'Escola de Ilusão', 'Escola de Necromancia', 'Escola de Transmutação'] }
]

const listaDeClasses = classesDoJogo.map(c => c.nome)

const personagem = ref({
  id: null,
  nome: '',
  raca: '',
  classe: null,
  subclasse: null
})

const subclassesDisponiveis = computed(() => {
  if (!personagem.value.classe) return []
  const classeSelecionada = classesDoJogo.find(c => c.nome === personagem.value.classe)
  return classeSelecionada ? classeSelecionada.subclasses : []
})

watch(() => personagem.value.classe, () => {
  personagem.value.subclasse = null
})

onUpdated(() => {
  if (props.personagemParaEdicao) {
    personagem.value = { ...props.personagemParaEdicao }
  } else {
    personagem.value = { id: null, nome: '', raca: '', classe: null, subclasse: null }
  }
})

const dialogInterno = computed({
  get: () => props.dialog,
  set: (val) => emit('update:dialog', val)
})

function salvar () {
  emit('salvar', { ...personagem.value })
  dialogInterno.value = false
}
</script>