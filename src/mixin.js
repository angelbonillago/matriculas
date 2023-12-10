
export const permisosMixin = {
    methods: {
      tienePermiso(rolesPermitidos) {
        return this.$store.getters.tienePermiso(rolesPermitidos);
      },
    },
  };