<template>
    <div class="row mt-3">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            Edit Course
          </div>
          <div class="card-body">
            <form v-on:submit="updateCurso">
  
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="text" class="form-control" v-model="name" id="name" placeholder="Nombre de curso"
                  maxlength="50">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="number" class="form-control" v-model="number_of_hours" id="number_of_hours"
                  placeholder="Numero de horas" maxlength="50">
              </div>
  
  
              <div class="d-grid col-6 mx-auto mb-3">
                <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  import { mostrarAlert, enviarSolicitud } from '../funciones.js';
  import { useRoute } from 'vue-router';
  
  export default {
    data() {
      return {
        id:0,
        name: '',
        number_of_hours: '',
        url: 'http://localhost/proyectovue/public/api/v1/cursos',  
      }
    },
    mounted(){
      //traer el ID a editar.
      const route = useRoute(); //obtengo la route
      this.id=route.params.id;
      this.url+="/"+this.id; //localhost/api/v1/estudiantes/id
      this.getCursoId();
  
    },
    methods: {
  
      getCursoId(){
  
        axios.get(this.url).then(
          respuesta=>{
            this.name= respuesta.data.data.name;
            this.number_of_hours= respuesta.data.data.number_of_hours;
          }
        );
      },
      updateCurso() {
        event.preventDefault();
        if (this.name.trim() === "") {
          mostrarAlert('Ingrese nombre de curso', 'warning', 'name');
        } else if (this.number_of_hours === "") {
          mostrarAlert('Ingrese numero de horas.', 'warning', 'number_of_hours');
        } else {
  
          var parametros ={
            name: this.name.trim(),
            number_of_hours: this.number_of_hours,
          }
          enviarSolicitud('PUT', parametros,this.url,'Course updated');
        }
      },

    }
  }
  
  </script>
  