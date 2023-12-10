<template>
    <div>
        <h1 class="form-control text-primary">A matricularse</h1>

        <div v-if="cargando">Cargando cursos...</div>
        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>{{ cursosColumns[0].label }}</th>
                        <th>{{ cursosColumns[1].label }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(curso, index) in cursos" :key="index">
                        <td>
                            <input type="checkbox" v-model="curso.checkbox">
                        </td>
                        <td>{{ curso.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="text-center">

            <button class="btn btn-primary" @click="guardarMatriculas">Guardar</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { permisosMixin } from '../mixin.js';
import { mapState } from 'vuex';
import { mostrarAlert, enviarSolicitud } from '../funciones.js'

export default {

    mixins: [permisosMixin],
    data() {
        return {
            cursosColumns: [
                { key: 'checkbox', label: 'Seleccionar' },
                { key: 'name', label: 'Curso' },
            ],
            cursos: [],
            urlcursos: 'http://localhost/proyectovue/public/api/v1/cursos/cursonomatriculado/',
            url: 'http://localhost/proyectovue/public/api/v1/cursos',
            cargando: true,

        };
    },
    computed: {
        ...mapState(['id'])
    },
    mounted() {
        this.getCursos()
    },
    methods: {
        getCursos() {
            axios.get(this.urlcursos+21)
                .then(respuesta => {
                    this.cursos = respuesta.data.map(curso => ({ name: curso.name, checkbox: false, id: curso.id }));
                    this.cargando = false;
                })
                .catch(error => {
                    console.error('Error al obtener cursos:', error);
                });
        },

        guardarMatriculas() {
            const cursosSeleccionados = this.cursos.filter(curso => curso.checkbox);
            // Obtener solo los IDs de los cursos seleccionados
            const cursosIds = cursosSeleccionados.map(curso => curso.id);
            const idUsuarioLogueado = this.id
            console.log('idUsuarioLogueado->',idUsuarioLogueado);
            var parametros = {
                curso_id: cursosIds, //esto es un array, que puede tener 1 a mas cursos a matricular
                estudiante_id: idUsuarioLogueado,
            }
            enviarSolicitud('POST', parametros,this.url+'/matricularse', 'Insert Successful');

        },


    }

}
</script>

<style scoped>
.table {
    width: 50%;
    margin: auto;
}

th,
td {
    text-align: center;
}

.text-center {
    text-align: center;
    margin-top: 20px;
    /* Ajusta según sea necesario */
}
</style>
  