$(document).ready( function() { //aqui se encuentran las funciones que serán llamadas por algún elemento de la interfaz
  clickUpdateAula();
  clickCloseModModal();
  clickCloseCatModal();
  clickCloseEquipoModal();
  clickSaveAula();
  clickSaveCategoria();
  clickSaveEquipo();
  clickCloseModal();
  clickAddAula();
  clickAddEquipo();
  clickAddCategoria();
  getHTMLAulas();
  guardarEquipo();
});

function guardarEquipo(){
$("#btnAddEquipoAula").click( function() { 
      var equipo = $("[name='equipo[]']").map(function() {
        if(this.checked){
          return this.value;
        }
      }).get();

      var cantidad = $("[name='cantidad[]']").map(function() {
        if(this.value!=""){
          return this.value;
        }
      }).get();

      $.post("src/model/aulas/saveAsignarEquipo.php", 
      { 
        aula: $("input[name='aula']").val(), 
        cantidad, 
        equipo 
      },
      function(data, status) {
        if (status =='success' && data == 'SUCCESS')
        {
          $("form[name='frmAsignarEquipo1']").trigger("reset");
          getHTMLAulas();
        } 
        else {
          $("#msnAlert").html(status + " " + data);
        }
      });
 });
}

//esta función se ejecuta cuando el botón Guardar que se encuentra en el formulario de modificar aula es presionado
function clickUpdateAula()
{
 $("#btnModGuardar").click( function() { //el evento click se asocia al nombre del botón
  $("form[name='frmAulaModificar']").validate({ //lo que contengan los elementos del formulario serán validados
    rules: { //campos que son estrictamente requeridos para hacer el update
        m_nombre: "required",
        m_capacidad: "required"
    },
    messages: { //en caso de que alguno de los campos esté vacío aparecen estos mensajes en el modal
      m_nombre: "Por favor ingresa el nombre del aula",
      m_capacidad: "Por favor ingresa la capacidad del aula"
    },
    submitHandler: function() {
      $.post("src/model/aulas/updateAula.php", //ruta del archivo encargado de recibir el contenido (controlador)
      { // por el método POST y luego enviarlo al método que se encarga de hacer el update en la base de datos (modelo)
        nombre: $("input[name='m_nombre']").val(), //nombre: es el nombre de como el POST enviará el valor
        capacidad: $("input[name='m_capacidad']").val(), //después va de que tipo es el elemento (input, select, textarea, etc.)
        tipoa: $("select[name='m_tipoa']").val(), //el nombre con el cual se identifica el campo
        clave: $("input[name='m_clave']").val() //la función val() se encarga de extraer lo que contiene el campo
      },
      function(data, status) {
        //si el update es exitoso, el modal se cierra, se limpian los campos del modal y se actualiza la tabla para
        //que se refleje el cambio
        if (status =='success' && data == 'SUCCESS')
        {
          $("#modificar").modal('hide');
          $("form[name='frmAulaModificar']").trigger("reset");
          getHTMLAulas();
        } //en caso de que status o data contenga un valor distinto a success se mostrá un mensaje de error
        else {
          $("#msnAlert").html(status + " " + data);
        }
      });
    }
  });
 });
}

//cerrar el modal de modificar aula
function clickCloseModModal()
{
  $("#btnModCancel").click(function() { //el evento click se asocia al botón de cancel del modal
    $("#modificar").modal('hide'); //el modal se oculta o se cierra
    $("form[name='frmAulaModificar']").trigger("reset"); //lo que tenían los campos del formulario se limpian
  });
}

//cerrar el modal de agregar categoría
function clickCloseCatModal()
{
  $("#btnCloseCat").click(function() { //el evento click se asocia al botón de Cancel del modal
    $("#agregarCategoria").modal('hide'); //el modal se cierra
    $("form[name='frmAddCategoria']").trigger("reset"); //los campos del modal se limpian
  });
}

//cerrar el modal de agregar equipo
function clickCloseEquipoModal()
{
  $("#btnCloseEquipo").click(function() { //el evento click se asocia al botón Cancel del modal
    $("#agregarEquipo").modal('hide'); //el modal se cierra
    $("form[name='frmAddEquipo']").trigger("reset"); //los campos del modal se limpian
  });
}

//esta función se encarga de mostrar las aulas que se encuentren registradas en la base de datos
function getHTMLAulas()
{
  $.post("src/model/aulas/getAulasShow.php", //con el método post manda ejecutar la función que contiene la consulta
  function(data, status) { //para traer todos los registros de la tabla aulas
    if (status == 'success')
    {
      $("#tableAulas").html(data); //si la consulta se realizó correctamente se muestran los resultados en la tabla
    }
    else {
      $("#msnAlert").html("Algo va mal"); //si no muestra un mensaje de error
    }
  });
}

//abre el modal para poder agregar una nueva aula
function clickAddAula()
{
  $("#btnAddAula").click(function() { //el evento se asocia al botón que tiene un id btnAddAula 
    $("#agregar").modal({keyboard: true}); //por medio del id del modal este manda llamar una función para abrirlo
  });
}

//abre el modal para agregar un nuevo equipo
function clickAddEquipo()
{
  $("#btnAddEquipo").click(function() { //el evento click se asocia al botón de agregar equipo
    $("#agregarEquipo").modal({keyboard: true}); //el modal se cambia a true que significa visible
  });
}

//abre el modal para agregar una nueva categoría
function clickAddCategoria()
{
  $("#btnAddCategoria").click(function() { //el evento click se asocia al botón de agregar categoría
    $("#agregarCategoria").modal({keyboard: true}); //el modal se abre
  });
}

//cerrar el modal de agregar una nueva aula
function clickCloseModal()
{
  $("#btnClose").click(function() { //el evento click se asocia al botón btnClose que se encuentra en el modal
    $("#agregar").modal('hide'); //el modal se cierra
    $("form[name='frmAddAula']").trigger("reset"); //los campos del modal se limpian
  });
}

//función para guardar una nueva categoría
function clickSaveCategoria()
{
  $("#btnSaveCategoria").click( function() { //se ejecuta cuando se da click al botón btnSaveCategoría que se encuentra en el modal
    $("form[name='frmAddCategoria']").validate({ //se valida el formulario por medio de su nombre
      rules: { //campos que son estrictamente necesario para realizar el INSERT
        c_nombre: "required",
        c_descripcion: "required"
      },
      messages: { //mensajes que se mostrarán en caso de que uno de ellos no haya sido llenado
        c_nombre: "Por favor ingresa el nombre de la categoria",
        c_descripcion: "Por favor ingresa la descripcion de la categoria"
      },
      submitHandler: function() {
        $.post("src/model/aulas/saveCategoria.php", //por medio del método POST se envía el nombre y la descripción
        { //de la categoría al controlador que se encuentra en la ruta descrita en la línea de arriba
          c_nombre: $("input[name='c_nombre']").val(),
          c_descripcion: $("textarea[name='c_descripcion']").val()
        },
        function(data,status) {
          if (status =='success' && data == 'SUCCESS')
          { //si la insercción fue exitosa
            $("#agregarCategoria").modal('hide'); //el modal se cierra
            $("form[name='frmAddCategoria']").trigger("reset"); //los campos se limpian
	    location.reload();
            getHTMLAulas();
          }
          else { //si hubo un error en el proceso se muestra un mensaje de error
            $("#msnAlert").html("status=" + status + " data=" + data);
          }
        });
      }
    });
  });
}

//función para guardar un nuevo equipo
function clickSaveEquipo()
{
  $("#btnSaveEquipo").click( function() { //el evento click se asocia al id del botón que se encuentra en el modal
    $("form[name='frmAddEquipo']").validate({ //el forumlario se valida por medio de su nombre
      rules: { //campos que son estrictamente necesarios para llevar a cabo el INSERT
        e_nombre: "required",
        e_descripcion: "required"
      },
      messages: { //mensajes que se mostrarán en caso de que no hayan sido completados
        e_nombre: "Por favor ingresa el nombre del equipo",
        e_descripcion: "Por favor ingresa la descripcion del equipo"
      },
      submitHandler: function() {
        $.post("src/model/aulas/saveEquipo.php", //por medio del método POST se envía el nombre, descripción y categoría
        {
          e_nombre: $("input[name='e_nombre']").val(),
          e_descripcion: $("textarea[name='e_descripcion']").val(),
          e_categoria: $("select[name='e_categoria']").val()     
        },
        function(data,status) {
          if (status=='success' && data == 'SUCCESS')
          { //si la insercción fue exitosa 
            $("#agregarEquipo").modal('hide'); //el modal se cierra
            $("form[name='frmAddEquipo']").trigger("reset"); //los campos se limpian
            getHTMLAulas(); //la tabla de aulas se recarga para mostrar los cambios
          }
          else { //en caso contrario se muestra un mensaje de error
            $("#msnAlert").html("status=" + status + " data=" + data);
          }
        });
      }
    });
  });
}

//función para guardar una nueva aula
function clickSaveAula()
{
  $("#btnSaveAula").click( function() { //el evento click se asocia al botón que tiene como id btnSaveAula que se encuentra en el modal
    $("form[name='frmAddAula']").validate({ //se valida el formulario por medio de su nombre
      rules: { //campos que son estrictamente requeridos para realizar el INSERT
        clave: "required",
        nombre: "required",
        capacidad: "required"
      },
      messages: { //mensajes que se mostrarán en caso de que alguno de los campos no haya sido completado
        clave: "Por favor ingresa la clave del aula",
        nombre: "Por favor ingresa el nombre del aula",
        capacidad: "Por favor ingresa la capacidad del aula"
      },
      submitHandler: function() {
        $.post("src/model/aulas/saveAula.php", //por el método POST se envían los valores de clave, nombre, tipo y capacidad
        {
          clave: $("input[name='clave']").val(),
          nombre: $("input[name='nombre']").val(),
          tipoa : $("select[name='tipoa']").val(),
          capacidad : $("input[name='capacidad']").val()
        },
        function(data,status) {
          if (status=='success' && data == 'SUCCESS')
          { //si la insercción resultó exitosa
            $("#agregar").modal('hide'); //el modal se cierra
            $("form[name='frmAddAula']").trigger("reset"); //los campos se limpian
            getHTMLAulas(); //se ejecuta la función para que se reflejen los cambios en la tabla que se muestra en la interfaz
          }
          else { //en caso contrario se mostrará un mensaje de error
            $("#msnAlert").html("status=" + status + " data=" + data);
          }
        });
      }
    });
  });
}

//esta función se ejecuta cuando se desee modificar una aula
function agregaFormulario(clave) //se obtiene el id del aula que se quiere modificar
{
  getDataAula(clave); //la clave se envía a esta función
}

function getDataAula(clave)
{
  $.post("src/model/aulas/dataAulaMod.php", //por medio del método POST se envía la clave del aula y esto ejecutará
  { //una consulta que traerá los campos de ese registro
    aula: clave
  },
  function(data, status) {
    if (status == 'success')
    { //los campos del modal de modificar se llenarán con lo que haya traído la consulta
      $("input[name='m_nombre']").val(data.nombre);
      $("input[name='m_clave']").val(clave);
      $("select[name='m_tipoa']").val(data.tipo);
      $("input[name='m_capacidad']").val(data.capacidad);
      $("#modificar").modal({keyboard: true}); //se muestra el modal
    }
    else { //en caso de que haya ocurrido un problema en el proceso se muestra un alert con el mensaje error
      alert("Error");
    }
  });
}

