import Swal from "sweetalert2";
import axios from "axios";

export function mostrarAlert(title,icon,foco=''){
    if (foco !=''){
        document.getElementById(foco).focus(); // capturaremos el campo que puede llegar vacio
    }
    Swal.fire({
        title:title,
        icon:icon,
        customClass:{confirmButton:'btn btn-primary',popup:'animated zoonIn'},
        buttonsStyling:false,

    });

}

export function confirm(url,id,title,message){
    var url = url+id
    const swalWithBoopstrap = Swal.mixin({
        customClass:{confirmButton:'btn btn-success me-3',cancelButton:'btn btn-danger'},
    });

    swalWithBoopstrap.fire({

        title:title,
        icon:'question',
        text:message,
        showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i>Yes, deleted',
        cancelButtonText:'<i class="fa-solid fa-ban"></i>Cancel'
    }).then((resp)=>{
        //validar si confirma o deniega el eliminar
        if(resp.isConfirmed){

            enviarSolicitud('DELETE',{id:id},url,'Deleted successfully');
        }else{
            //alerta de cancelar Eliminacion
            mostrarAlert('Operation cancelled','info');
        }
    })


}

export function enviarSolicitud(method,parametros, url, message){

    var segmentos = url.split('/');
    // El segmento que te interesa se encuentra en la posición deseada
    var modelo = segmentos[7]; 

    axios({
        method:method,
        url:url,
        data:parametros,
    }).then(function(response){
        if(response.status==200){
            mostrarAlert(message,'success');
            window.setTimeout(function(){
                window.location.href = '/'+modelo;
            },1000)
        }else{
            mostrarAlert('No se recuperó la respuesta','error');
        }
    }).catch(function(error){
        console.error(error);
        mostrarAlert('Servidor no disponible','error');
    })

}