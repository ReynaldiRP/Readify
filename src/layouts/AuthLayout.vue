<script setup lang="ts">
import { RouterView } from "vue-router";
import { APP_NAME } from "@/config/app";
</script>

<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-header">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/logo.svg"
          width="80"
          height="80"
        />
        <h1>Welcome to {{ APP_NAME }}</h1>
      </div>

      <main class="auth-content">
        <RouterView />
      </main>

      <footer class="auth-footer">
        <p>&copy; 2025 Readify. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.auth-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.auth-header {
  margin-bottom: 2rem;
}

.logo {
  margin-bottom: 1rem;
}

.auth-header h1 {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.auth-content {
  margin-bottom: 2rem;
}

.auth-footer {
  color: #6b7280;
  font-size: 0.875rem;
}

.auth-footer p {
  margin: 0;
}

@media (min-width: 768px) {
  .auth-container {
    padding: 3rem;
    max-width: 500px;
  }

  .auth-header h1 {
    font-size: 2rem;
  }
}
</style>
