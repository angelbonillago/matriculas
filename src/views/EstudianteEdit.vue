<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Edit Student
        </div>
        <div class="card-body">
          <form v-on:submit="updateEstudiante">
            <div class="d-grid col-6 mx-auto mb-3">
              <img v-if="this.photo" :src="this.photo" id="photoimg" height="100" class="img-thumbnail">
              <img v-else height="100" id="photoimg"
                src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/supportmale-2-512.png" alt=""
                class="img-thumbnail">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
              <input type="text" class="form-control" v-model="first_name" id="first_name" placeholder="Ingrese su nombre"
                maxlength="50">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
              <input type="text" class="form-control" v-model="last_name" id="last_name"
                placeholder="Ingrese su Apellido" maxlength="50">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
              <input type="file" v-on:change="previewPhoto" class="form-control" maxlength="50"
                accept="image/png, image/jpeg, image/gif">
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
      last_name: '',
      first_name: '',
      photo: '',
      url: 'http://localhost/proyectovue/public/api/v1/estudiantes',
      cargando: false,

    }
  },
  mounted(){
    //traer el ID a editar.
    const route = useRoute(); //obtengo la route
    this.id=route.params.id;
    this.url+="/"+this.id; //localhost/api/v1/estudiantes/id
    this.getEstudianteId();

  },
  methods: {

    getEstudianteId(){

      axios.get(this.url).then(
        respuesta=>{
          this.last_name= respuesta.data.data.last_name;
          this.first_name= respuesta.data.data.first_name;
          this.photo= respuesta.data.data.photo;
          this.cargando=false; //se tiene toda la info, se desaparece el snipper.
        }
      );
    },
    updateEstudiante() {
      event.preventDefault();
      var mifoto = document.getElementById("photoimg").src;
      this.photo = mifoto;

      if (this.last_name.trim() === "") {
        mostrarAlert('Ingrese su nombre', 'warning', 'last_name');
      } else if (this.first_name.trim() === "") {
        mostrarAlert('Ingrese su Apellido', 'warning', 'first_name');
      } else {

        var parametros ={
          last_name: this.last_name.trim(),
          first_name: this.first_name.trim(),
          photo:this.photo,
        }
        enviarSolicitud('PUT', parametros,this.url,'Student updated');
      }
    },

    previewPhoto(event) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function () { //cuando cargue la foto.
        var miFoto = document.getElementById("photoimg");
        miFoto.src = reader.result;
        this.photo = miFoto.src;
      }
      //
    }
  }
}


</script>
