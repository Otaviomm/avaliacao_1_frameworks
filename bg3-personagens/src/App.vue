<template>
  <v-app>
    <v-app-bar color="primary" title="🧙‍♂️ Catálogo BG3" density="compact">
      <v-btn to="/" variant="text">CRUD</v-btn>
      <v-btn to="/galeria" variant="text">Galeria</v-btn>
      <v-btn to="/sobre" variant="text">Sobre</v-btn>
    </v-app-bar>

    <v-main class="pa-4">
      <router-view />
    </v-main>
  </v-app>
</template>