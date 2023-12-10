<template>
  <div class="login-container">
    <div class="login-content">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="iniciarSesion" class="login-form">
        <div class="form-group">
          <label for="username">Correo Electrónico:</label>
          <input type="text" id="username" v-model="email">
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password">
        </div>
        <button type="submit" class="login-button">Iniciar Sesión</button>
      </form>
      <!--  <div v-if="error" class="error-message">{{ error }}</div> -->
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { mostrarAlert } from '@/funciones';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: false,
      url: 'http://localhost/proyectovue/public/api/v1/usuarios/login',
    };
  },
  methods: {
    async iniciarSesion() {
      // Validación de campos
      if (!this.email || !this.password) {
        this.error = 'Por favor, completa todos los campos.';
        return;
      }
      this.error = '';

      try {
        //console.log('respoentro');
        var parametros = {
          email: this.email,
          password: this.password,
        }
        const response = await axios.post(this.url, parametros);
        if (response.status === 200) {

          this.error = "Sesion iniciada correctamente";
          mostrarAlert(this.error, "success");

          setTimeout(() => {
            this.$router.push('/dashboard');
          }, 4000)

          this.$store.dispatch('iniciarSesion', {
            id: response.data.data.user.id,
            usuario: response.data.data.user,
            rol: response.data.data.role,
          });


        } else {
          // Error en la respuesta del servidor
          this.error = 'Credenciales incorrectas. Inténtalo de nuevo.';
        }

      } catch (error) {
        // Manejar errores, como credenciales incorrectas o error de solicitud
        this.error = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    },
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-content {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-form {
  text-align: left;
}


.form-group {
  margin: 10px 0;
}

label {
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
}

.login-button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>

