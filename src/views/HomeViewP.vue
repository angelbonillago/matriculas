<template>
    <div class="container">

        <!-- Mostrar tabla solo si el usuario tiene permisos de Admin -->
        <div v-if="tienePermiso('Admin')" class="mt-4">
            <h1 class="form-control text-primary">Listado de Estudiantes</h1>
            <generic-table :columns="studentColumns" :items="students" @delete-item="deleted" :cargando="cargando" />
        </div>
    </div>
</template>
  
<script>
import GenericTable from '../components/table/GenericTable.vue';
import axios from 'axios';
import { confirm } from '../funciones.js'
import router from '@/router'; // Importa el enrutador de Vue (ajusta la ruta de importación según tu estructura)
import { permisosMixin } from '../mixin.js';  // Ajusta la ruta según tu estructura



export default {
    mixins: [permisosMixin],
    components: {
        GenericTable,
    },
    data() {
        return {
            studentColumns: [
                { key: 'id', label: '#' }, // Ancho fijo de 50px
                { key: 'id', label: 'ID' }, // Ancho fijo de 100px
                { key: 'first_name', label: 'Nombre' },
                { key: 'last_name', label: 'Apellido' },
                { key: 'created_at', label: 'Registro' },
                { key: 'photo', label: 'Foto' },
                { key: 'actions', label: 'Acciones', viewAction: this.viewStudent, editAction: this.editStudent },
            ],
            students: [
                // Datos de estudiantes
            ],
            url: 'http://localhost/proyectovue/public/api/v1/estudiantes',
            cargando: true,
            cantidadDeCursos: 10, // Ejemplo de cantidad de cursos
            cantidadDeAlumnos: 150, // Ejemplo de cantidad de alumnos
            cantidadDeAlumnosMatriculados: 80,
        };
    },
    mounted() {
        this.getEstudiantes()
    },
    methods: {
        getEstudiantes() {
            axios.get(this.url)
                .then(
                    respuesta => {
                        this.students = respuesta.data
                        this.cargando = false; //se tiene toda la info, se desaparece el snipper.

                    }
                )
                .catch((error) => {
                    console.error('Error al obtener estudiantes:', error);
                })
        },

        deleted({ id, name }) {
            //console.log('Deleting');
            confirm(this.url + '/', id, 'Eliminar registro', 'Desea eliminar a ' + name + '?');
            this.cargando = false;
        },
        viewStudent(item) {
            // Redirecciona a la vista del estudiante
            router.push({ name: 'viewE', params: { id: item.id } });
        },

        editStudent(item) {
            // Redirecciona a la edición del estudiante
            router.push({ name: 'editE', params: { id: item.id } });
        },
    }
}
</script>
  