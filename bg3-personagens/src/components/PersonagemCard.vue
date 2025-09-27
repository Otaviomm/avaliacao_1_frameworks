<template>
  <v-card
    :class="{
      'border-success': personagem.status === 'ativo',
      'border-gray': personagem.status === 'inativo'
    }"
    class="ma-2"
    outlined
  >
    <v-card-title>{{ personagem.nome }}</v-card-title>
    <v-card-subtitle>
      {{ personagem.raca }} • Nível {{ personagem.nivel }}
    </v-card-subtitle>
    <v-card-text>
      Classe: {{ personagem.classe }}
      <v-chip
        :color="personagem.status === 'ativo' ? 'green' : 'gray'"
        size="small"
        class="ml-2"
      >
        {{ personagem.status === 'ativo' ? 'Ativo' : 'Inativo' }}
      </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-btn size="small" color="warning" @click="$emit('editar', personagem)">
        ✏️ Editar
      </v-btn>
      <v-btn size="small" color="error" @click="$emit('remover', personagem.id)">
        🗑️ Remover
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PersonagemCard',
  props: {
    personagem: {
      type: Object,
      required: true
    }
  },
  emits: ['editar', 'remover']
}
</script>

<style scoped>
.border-success { border-left: 4px solid #4CAF50 !important; }
.border-gray { border-left: 4px solid #9E9E9E !important; }
</style>