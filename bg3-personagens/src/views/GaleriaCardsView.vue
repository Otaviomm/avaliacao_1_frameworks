<template>
  <div>
    <h2 class="mb-4">🎭 Galeria de Personagens</h2>

    <v-alert v-if="personagensFiltrados.length === 0" type="info">
      Nenhum personagem para exibir.
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="p in personagensFiltrados"
        :key="p.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <PersonagemCard
          :personagem="p"
          @editar="editar"
          @remover="confirmarRemover"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import PersonagemCard from '@/components/PersonagemCard.vue'

export default {
  name: 'GaleriaCardsView',
  components: { PersonagemCard },
  setup() {
    const personagens = ref([])

    const carregar = () => {
      const salvos = localStorage.getItem('bg3-personagens')
      if (salvos) personagens.value = JSON.parse(salvos)
    }

    const personagensFiltrados = computed(() => personagens.value)

    const editar = (p) => {
      // Redireciona para a página de CRUD com os dados
      // (opcional: passar via router.push com state)
      alert('Edição disponível na página CRUD')
    }

    const confirmarRemover = (id) => {
      if (confirm('Remover da galeria?')) {
        personagens.value = personagens.value.filter(p => p.id !== id)
        localStorage.setItem('bg3-personagens', JSON.stringify(personagens.value))
      }
    }

    onMounted(() => carregar())

    return {
      personagensFiltrados,
      editar,
      confirmarRemover
    }
  }
}
</script>