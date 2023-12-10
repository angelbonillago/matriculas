<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>             
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Registro</th>
              <th>Foto</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">

            <tr v-if="this.cargando">
              <td colspan="6">
                <div class="spinner-border text-warning" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
            <tr v-else v-for="est, i in this.estudiantes" :key="est.id">
              <td v-text="(i+1)"></td>
              <td v-text="est.id"></td>
              <td v-text="est.first_name"></td>
              <td v-text="est.last_name"></td>
              <!-- <td v-text="new Date(est.created_at).toLocaleDateString('en-US')"></td> -->
              <td v-text="new Date(est.created_at).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })"></td>

              <td>
                <img v-if="est.photo" height="30" :src="est.photo" alt="" class="img-thumbnail" style="width: 150px !important;">
                <img v-else height="30" src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/supportmale-2-512.png" alt="" class="img-thumbnail" style="width: 150px !important;">

              </td>
              <td>
                <router-link :to="{path:'view/'+est.id}" class="btn btn-info">
                  <i class="fa-solid fa-eye"></i>
                </router-link>
                &nbsp;
                <router-link :to="{path:'edit-estudiante/'+est.id}" class="btn btn-warning">
                  <i class="fa-solid fa-edit"></i>
                </router-link>
                &nbsp;
                <button class="btn btn-danger" v-on:click="deleted(est.id,est.first_name)">
                  <i class="fa-solid fa-trash"></i>
                </button>

              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {confirm} from '../funciones.js'
export default {
  data() {
    return {
      estudiantes: null,
      cargando: true,
      url:'http://localhost/proyectovue/public/api/v1/estudiantes'

    }
  },
  mounted(){//metodo que se ejecuta cuando la pagina esta completa.
    this.getEstudiantes()
  },
  methods:{
    getEstudiantes(){
      this.cargando=true;
      //armo la peticion
      axios.get(this.url).then(
        respuesta=>{
          this.estudiantes=respuesta.data//guardamos los estudiantes en el objeto estudiantes.
          this.cargando=false; //se tiene toda la info, se desaparece el snipper.
        }
      );
    },
    deleted(id,name){
      confirm(this.url+'/',id,'Eliminar registro','Desea eliminar a '+name+'?');
      this.cargando=false;
    }
  }
}


</script>
