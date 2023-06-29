
function deletesignature(id) {

  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.value == true) {
      $.ajax({
        url: '/delete-signature/',
        type: 'POST',
        data: { data: id },
        success: function (response) {
          console.log(response)
          // Procesar la respuesta exitosa
          Swal.fire({
            title: "Eliminado!",
            text: "El registro sido eliminado.",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = window.location.href
            }
          })
        },
        error: function () {
          // Procesar el error
          Swal.fire({
            title: "Cancelado",
            text: "No se ha podido eliminar, si persiste contacte con el administrador del sistema.",
            icon: "error",
          });
        }
      })
    }
  })
}

function deletenote(id) {

  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.value == true) {
      $.ajax({
        url: '/signaturelist/task/delete/' + id,
        type: 'POST',
        data: { data: id },
        success: function (response) {
          console.log(response)
          // Procesar la respuesta exitosa
          Swal.fire({
            title: "Eliminado!",
            text: "El registro sido eliminado.",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = window.location.href
            }
          })
        },
        error: function () {
          // Procesar el error
          Swal.fire({
            title: "Cancelado",
            text: "No se ha podido eliminar, si persiste contacte con el administrador del sistema.",
            icon: "error",
          });
        }
      })
    }
  })
}

function modifysignature(id) {

  Swal.fire({
    title: 'Ingresa el nuevo nombre que deseas agregar',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (name) => {

      if (name.length > 0) {
        $.ajax({
          url: '/update-signature/',
          type: 'POST',
          data: { data: id, name },
          success: function (response) {
            console.log(response)
          }
        })
      } else {

        Swal.fire({
          title: `¡Lo siento!`,
          text: 'Debes guardar mas de una letra',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        })
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `¡Tu nueva asignatura es, ${result.value}!`,
        text: 'Has ingresado exitosamente.',
        icon: 'success',
        showConfirmButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = window.location.href;
        }
      })
    }
  });

}


/* Swal.fire({
  title: `No puedes dejarlo vacio`,
  text: 'Debes escribir al menos una letra',
  icon: 'danger'
}); */