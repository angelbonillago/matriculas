import { createStore } from 'vuex'

export default createStore({
  state: {
    usuario: null,
    rol: null,
    id:null
  },
  getters: {
  },
  mutations: {
    setId(state, id) {
      state.id = id;
      sessionStorage.setItem('id', id);

    },
    setUsuario(state, usuario) {
      state.usuario = usuario;
      sessionStorage.setItem('usuario', JSON.stringify(usuario));

    },
    setRol(state, rol) {
      state.rol = rol;
      sessionStorage.setItem('rol', rol);

    },
    limpiarEstado(state) {
      state.usuario = null;
      state.rol = null;
      state.id = null;
      
      sessionStorage.removeItem('usuario');
      sessionStorage.removeItem('rol');
      sessionStorage.removeItem('id');
    },
  },
  actions: {

    iniciarSesion({ commit }, { id,usuario, rol }) {

      commit('setId', id);
      commit('setUsuario', usuario);
      commit('setRol', rol);
    },
    cerrarSesion({ commit }) {
      commit('limpiarEstado');
    },
  },
  modules: {
  },
  getters: {
    tienePermiso: (state) => (rolesPermitidos) => {
      // Verifica si el rol del usuario está en la lista de roles permitidos
      //console.log('state-rol',state.rol);
      return rolesPermitidos.includes(state.rol);
    }
  }
})
