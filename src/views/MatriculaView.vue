<template>
    <div>
        <h1 class="form-control text-primary">Cursos matriculados</h1>
        <button class="btn btn-success" @click="matricularse"><i class="fas fa-plus"></i>Matricularse</button>

        <generic-table v-if="tienePermiso('Student')" :columns="cursosColumns" :items="cursos" @delete-item="deleted"
            :cargando="cargando" />

    </div>
</template>
  
<script>
import GenericTable from '../components/table/GenericTable.vue';
import axios from 'axios';
import { confirm } from '../funciones.js'
import { permisosMixin } from '../mixin.js';
import router from '@/router'; // Importa el enrutador de Vue
import { mapState } from 'vuex';

export default {
    components: {
        GenericTable,
    },
    mixins: [permisosMixin],
    data() {
        return {
            cursosColumns: [
                { key: 'id', label: '#' },
                { key: 'name', label: 'Curso' },
                { key: 'number_of_hours', label: 'Creditos' },
                //{ key: 'actions', label: 'Acciones', editAction: this.editCurso },
            ],
            cursos: [
                // Datos de estudiantes
            ],
            url: 'http://localhost/proyectovue/public/api/v1/cursos/cursomatriculado/',
            cargando: true,

        };
    },
    mounted() {
        this.getCursosMatriculados()
    },
    computed: {
        ...mapState(['id'])
    },
    methods: {
        getCursosMatriculados() {
            axios.get(this.url+21)
                .then(
                    respuesta => {
                        this.cursos = respuesta.data
                        this.cargando = false; //se tiene toda la info, se desaparece el snipper.
                    }
                )
                .catch((error) => {
                    console.error('Error al obtener cursos:', error);
                })
        },

        matricularse() {
            if (this.tienePermiso(['Student'])) {
                // Redirige al formulario para estudiantes
                router.push({ name: 'formularioEstudiante' });
                
            } else if (this.tienePermiso(['Admin'])) {
                // Redirige al formulario para administradores
                router.push({ name: 'formularioAdmin' });
            } else {
                // Otro caso o manejo de error si es necesario
            }
        },


        deleted({ id, name }) {
            //console.log('Deleting');
            confirm(this.url + '/', id, 'Eliminar registro', 'Desea eliminar a ' + name + '?');
            this.cargando = false;
        },

        editCurso(item) {
            // Redirecciona a la edición del estudiante
            router.push({ name: 'editC', params: { id: item.id } });
        },
    }
}
</script>
  