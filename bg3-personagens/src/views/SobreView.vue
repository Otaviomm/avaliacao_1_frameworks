<template>
  <v-container>
    <h2 class="text-h4 mb-4">ℹ️ Sobre o Sistema</h2>
    <v-card class="pa-6">
      <v-card-title>Catálogo de Equipamentos – Reserva de Laboratório</v-card-title>
      <v-card-text>
        <p>
          Este sistema permite gerenciar o empréstimo de equipamentos de laboratório,
          com controle de disponibilidade, categorias e patrimônio.
        </p>
        <v-list density="compact">
          <v-list-item>
            <v-list-item-title>Versão do Sistema:</v-list-item-title>
            <v-list-item-subtitle>1.0</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Regras de Uso:</v-list-item-title>
            <v-list-item-subtitle>
              • Equipamentos só podem ser emprestados a alunos matriculados.<br />
              • Prazo máximo de empréstimo: 48 horas.<br />
              • Danos devem ser reportados imediatamente.
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <p class="mt-4">
          <strong>Desenvolvido com:</strong> Vue 3 + Vuetify 3 + vue-router
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'SobreView'
}
</script>