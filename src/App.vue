<template>
  <div>
    <nav v-if="userIsLoggedIn" class="navbar navbar-expand-lg navbar-dark bg-info">
      <div class="container-fluid">
        <a class="navbar-brand" href="/dashboard">Gestión académica</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul v-if="tienePermiso(['Admin', 'Student'])" class="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li class="nav-item">
              <router-link to="/dashboard" class="nav-link active" aria-current="page">Inicio</router-link>
            </li>
            
            <li v-if="tienePermiso(['Admin', 'Student'])" class="nav-item">
              <router-link to="/curso-matriculado" class="nav-link">Matriculas</router-link>
            </li>
            <li v-if="tienePermiso('Admin')" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Estudiantes
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link class="dropdown-item" to="/estudiantes">Listar estudiante</router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/create-estudiante">Crear estudiante</router-link>
                </li>
              </ul>
            </li>
            <li v-if="tienePermiso('Admin')" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Cursos
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link class="dropdown-item" to="/cursos">Listar curso</router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/create-curso">Crear curso</router-link>
                </li>
              </ul>
            </li>
          </ul>

          <div class="navbar-text text-light">
            ({{ $store.state.rol }}) : {{ $store.state.usuario.first_name }} {{ $store.state.usuario.last_name }}
          </div>


          <ul class="navbar-nav ml-auto" style="margin: 8px;">
            <li class="nav-item">
              <button class="btn btn-outline-light" @click="cerrarSesion">Cerrar sesión</button>
            </li>
          </ul>

        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export const tienePermiso = function (rolesPermitidos) {
  return this.$store.getters.tienePermiso(rolesPermitidos);
};
export default {

  data() {
    return {
      userIsLoggedIn: false, // Inicialmente, el usuario no ha iniciado sesión
    };
  },

  created() {
    // Verifica si hay información de sesión en sessionStorage
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const rol = sessionStorage.getItem('rol');
    const id = sessionStorage.getItem('id');

    // Restaura el estado de la sesión si la información está presente
    if (usuario && rol && id) {
      this.$store.commit('setUsuario', usuario);
      this.$store.commit('setRol', rol);
      this.$store.commit('setId', id);
    }
  },

  watch: {
    '$store.state.usuario'(newValue) {
      this.userIsLoggedIn = Boolean(newValue); // Convierte el valor a un booleano
    },
  },

  methods: {
    tienePermiso(rolesPermitidos) {

      return this.$store.getters.tienePermiso(rolesPermitidos);
    },
    cerrarSesion() {
      //this.$store.getters.cerrarSesion
      const store = this.$store;
      const router = this.$router;

      store.dispatch('cerrarSesion');
      router.push('/');


    }
  },

};
</script>
