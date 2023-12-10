<template>
    <div>
        <h1 class="form-control text-primary">Listado de Curos</h1>
        <button class="btn btn-success" @click="agregarCurso"><i class="fas fa-plus"></i>Agregar curso</button>
        <generic-table :columns="cursosColumns" :items="cursos" @delete-item="deleted" :cargando="cargando" />
    </div>
    
</template>
  
<script>
import GenericTable from '../components/table/GenericTable.vue';
import axios from 'axios';
import { confirm } from '../funciones.js'
import { permisosMixin } from '../mixin.js';
import router from '@/router'; // Importa el enrutador de Vue

export default {
    components: {
        GenericTable,
    },
    mixins: [permisosMixin],
    data() {
        return {
            cursosColumns: [
                { key: 'id', label: '#' }, 
                { key: 'name', label: 'Nombre' }, 
                { key: 'number_of_hours', label: 'Cant. horas' },
                { key: 'actions', label: 'Acciones', editAction: this.editCurso },
            ],
            cursos: [
                // Datos de estudiantes
            ],
            url: 'http://localhost/proyectovue/public/api/v1/cursos',
            cargando: true,
        };
    },
    mounted() {
        this.getCursos()
    },
    methods: {
        getCursos() {
            axios.get(this.url)
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

        agregarCurso() {
            if (this.tienePermiso(['Student'])) {
                // Redirige al formulario para estudiantes
                //router.push({ name: 'formularioEstudiante' });
                
            } else if (this.tienePermiso(['Admin'])) {
                // Redirige al formulario para administradores
                router.push({ name: 'createC' });
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
  