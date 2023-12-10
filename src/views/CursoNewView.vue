<template>
    <div class="row mt-3">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header bg-dark text-white text-center">
            Register Course
          </div>
          <div class="card-body">
            <form v-on:submit="saveCourses">
  
              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="text" class="form-control" v-model="name" id="name" placeholder="Nombre del curso"
                  maxlength="50">
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                <input type="number" class="form-control" v-model="number_of_hours" id="number_of_hours"
                  placeholder="Numero de horas" maxlength="50">
              </div>
  
              <div class="d-grid col-6 mx-auto mb-3">
                <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i>Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  //import axios from 'axios';
  import { mostrarAlert, enviarSolicitud } from '../funciones.js'
  
  export default {
    data() {
      return {
        number_of_hours: '',
        name: '',
        url: 'http://localhost/proyectovue/public/api/v1/cursos',  
      }
    },
    methods: {
      saveCourses() {
        event.preventDefault();
  
        if (this.number_of_hours === "") {
          mostrarAlert('Ingrese las horas', 'warning', 'number_of_hours');
        } else if (this.name.trim() === "") {
          mostrarAlert('Ingrese el nombre', 'warning', 'name');
        } else {
  
          var parametros ={
            number_of_hours: this.number_of_hours,
            name: this.name.trim(),
          }
          enviarSolicitud('POST', parametros,this.url,'Insert Successful');
        }
  
  
      },
    }
  }
  
  
  </script>
  