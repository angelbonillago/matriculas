<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="cargando">
                            <td :colspan="columns.length">
                                <div class="spinner-border text-warning" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </td>
                        </tr>

                        <tr v-for="(item, index) in items" :key="index">
                            <td v-for="column in columns" :key="column.key">
                                <!-- Si la columna es 'photo', muestra la imagen -->
                                <template v-if="column.key === 'photo'">
                                    <img :src="item[column.key]" alt="Foto" style="max-width: 100px; max-height: 100px;">
                                </template>

                                <!-- Si la columna es 'acciones' -->
                                <template v-else-if="column.key === 'actions'">

                                    <!-- <button class="btn btn-info" @click="column.viewAction(item)">
                                        <i class="fa-solid fa-eye"></i>
                                    </button> -->
                                    &nbsp;
                                    <button class="btn btn-warning" @click="column.editAction(item)">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    &nbsp;

                                    <button class="btn btn-danger" @click="deleteItem(item)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </template>

                                <!-- Si no, muestra el valor de la columna -->
                                <template v-else>
                                    {{ item[column.key] }}
                                </template>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        columns: Array, // Configuración de columnas [{ key: 'id', label: 'ID' }, ...]
        items: Array,   // Datos a mostrar
        cargando: Boolean // Estado de carga
    },
    methods: {
        deleteItem(item) {
            // Emitir un evento para pasar los parámetros a la función `deleted` en el componente padre
            this.$emit('delete-item', { id: item.id, name: item.last_name });
        }

    },
};
</script>
  