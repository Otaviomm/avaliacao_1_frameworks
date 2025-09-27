<template>
  <div>
    <h2 class="mb-4">🧙‍♀️ CRUD de Personagens</h2>

    <v-form @submit.prevent="salvar">
      <v-text-field
        v-model="form.nome"
        label="Nome *"
        :error="erroNome"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.raca"
        label="Raça *"
        :error="erroRaca"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.classe"
        label="Classe *"
        :error="erroClasse"
        required
      ></v-text-field>

      <v-text-field
        v-model.number="form.nivel"
        label="Nível *"
        type="number"
        min="1"
        max="12"
        :error="erroNivel"
        required
      ></v-text-field>

      <v-select
        v-model="form.status"
        label="Status *"
        :items="[
          { title: 'Ativo', value: 'ativo' },
          { title: 'Inativo', value: 'inativo' }
        ]"
        item-title="title"
        item-value="value"
        required
      ></v-select>

      <v-btn
        type="submit"
        color="primary"
        :disabled="!formularioValido"
        class="mr-2"
      >
        {{ editando ? '💾 Salvar Alterações' : '➕ Adicionar' }}
      </v-btn>
      <v-btn v-if="editando" color="secondary" @click="cancelar">
        ❌ Cancelar
      </v-btn>
    </v-form>

    <v-divider class="my-6"></v-divider>

    <h3>📋 Lista de Personagens</h3>
    <v-alert v-if="personagensFiltrados.length === 0" type="info" class="mt-4">
      Nenhum personagem cadastrado. Adicione o primeiro!
    </v-alert>

    <v-table v-else class="mt-4">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Raça</th>
          <th>Classe</th>
          <th>Nível</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in personagensFiltrados" :key="p.id">
          <td>{{ p.nome }}</td>
          <td>{{ p.raca }}</td>
          <td>{{ p.classe }}</td>
          <td>{{ p.nivel }}</td>
          <td>
            <v-chip :color="p.status === 'ativo' ? 'green' : 'gray'" size="small">
              {{ p.status === 'ativo' ? 'Ativo' : 'Inativo' }}
            </v-chip>
          </td>
          <td>
            <v-btn size="small" color="warning" @click="editar(p)">✏️</v-btn>
            <v-btn size="small" color="error" @click="confirmarRemover(p.id)">🗑️</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Snackbar de feedback -->
    <v-snackbar v-model="snackbar" :color="snackbarCor" timeout="3000">
      {{ snackbarTexto }}
    </v-snackbar>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'CatalogoView',
  setup() {
    const personagens = ref([])
    const form = ref({
      id: '',
      nome: '',
      raca: '',
      classe: '',
      nivel: 1,
      status: 'ativo'
    })
    const editando = ref(false)
    const snackbar = ref(false)
    const snackbarTexto = ref('')
    const snackbarCor = ref('success')

    const erroNome = ref(false)
    const erroRaca = ref(false)
    const erroClasse = ref(false)
    const erroNivel = ref(false)

    const gerarId = () => `bg3-${Date.now()}`

    const carregar = () => {
      const salvos = localStorage.getItem('bg3-personagens')
      if (salvos) personagens.value = JSON.parse(salvos)
    }

    const salvarNoStorage = () => {
      localStorage.setItem('bg3-personagens', JSON.stringify(personagens.value))
    }

    const validar = () => {
      erroNome.value = !form.value.nome.trim()
      erroRaca.value = !form.value.raca.trim()
      erroClasse.value = !form.value.classe.trim()
      erroNivel.value = !form.value.nivel || form.value.nivel < 1 || form.value.nivel > 12
      return !(erroNome.value || erroRaca.value || erroClasse.value || erroNivel.value)
    }

    const formularioValido = computed(() => {
      return form.value.nome && form.value.raca && form.value.classe && form.value.nivel
    })

    const personagensFiltrados = computed(() => personagens.value)

    const mostrarSnackbar = (texto, cor = 'success') => {
      snackbarTexto.value = texto
      snackbarCor.value = cor
      snackbar.value = true
    }

    const salvar = () => {
      if (!validar()) return

      if (editando.value) {
        const idx = personagens.value.findIndex(p => p.id === form.value.id)
        if (idx !== -1) {
          personagens.value[idx] = { ...form.value }
          mostrarSnackbar('Personagem atualizado!')
        }
      } else {
        personagens.value.push({ ...form.value, id: gerarId() })
        mostrarSnackbar('Personagem adicionado!')
      }

      salvarNoStorage()
      resetarForm()
    }

    const editar = (p) => {
      form.value = { ...p }
      editando.value = true
    }

    const cancelar = () => {
      editando.value = false
      resetarForm()
    }

    const resetarForm = () => {
      form.value = { id: '', nome: '', raca: '', classe: '', nivel: 1, status: 'ativo' }
      erroNome.value = false
      erroRaca.value = false
      erroClasse.value = false
      erroNivel.value = false
    }

    const confirmarRemover = (id) => {
      if (confirm('Tem certeza que deseja remover este personagem?')) {
        personagens.value = personagens.value.filter(p => p.id !== id)
        salvarNoStorage()
        mostrarSnackbar('Personagem removido!', 'error')
      }
    }

    onMounted(() => carregar())

    return {
      form,
      editando,
      personagensFiltrados,
      formularioValido,
      erroNome,
      erroRaca,
      erroClasse,
      erroNivel,
      snackbar,
      snackbarTexto,
      snackbarCor,
      salvar,
      editar,
      cancelar,
      confirmarRemover
    }
  }
}
</script>