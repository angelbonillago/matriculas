<template>
    <div class="container">
        <h1 class="form-control text-primary">Bienvenido usuario</h1>

        <div v-if="tienePermiso('Admin')" class="row">
            <!-- Tarjeta de Cursos -->
            <div class="col-md-3 mb-4">
                <router-link to="/cursos" class="text-decoration-none">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body bg-primary text-white">
                            <h5 class="card-title">Cursos</h5>
                            <p class="card-text">{{ cantidadDeCursos }}</p>
                        </div>
                    </div>
                </router-link>
            </div>


            <!-- Tarjeta de Alumnos -->
            <div class="col-md-3 mb-4">
                <router-link to="/estudiantes" class="text-decoration-none">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body bg-success text-white">
                            <h5 class="card-title">Estudiantes</h5>
                            <p class="card-text">{{ cantidadDeAlumnos }}</p>
                        </div>
                    </div>
                </router-link>
            </div>

            <!-- Tarjeta de Alumnos Matriculados -->
            <div class="col-md-3 mb-4">
                <div class="card" style="width: 18rem;">
                    <div class="card-body bg-info text-white">
                        <h5 class="card-title">Alumnos Matriculados</h5>
                        <p class="card-text">{{ cantidadDeAlumnosMatriculados }}</p>
                    </div>
                </div>
            </div>

        </div>


    </div>
</template>
  

<script>
import axios from 'axios';
import { confirm } from '../funciones.js'
import router from '@/router'; // Importa el enrutador de Vue (ajusta la ruta de importación según tu estructura)
import { permisosMixin } from '../mixin.js';  // Ajusta la ruta según tu estructura



export default {
    mixins: [permisosMixin],

    data() {
        return {

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
        }

    }
}
</script>