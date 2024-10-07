class Pedido {
  constructor(pedId, pMesa, pFecha) {
    this.idPedido = pedId;
    this.mesa = pMesa;
    this.fecha = pFecha;
  }
}

class GestionarPedido {
  constructor() {
    this.pedidos = [];
    this.pedIdSeleccionado = 0;
  }
  cargarPedido() {
    this.pedidos = [
      new Pedido(1, 1, "2024-09-25 18:45:00"), //cargo los datos al array
      new Pedido(2, 2, "2024-09-24 12:30:00"),
    ];
    this.listarPedido();
  }

  agregarPedido(pedido) {
    let success = false;
    if (this.pedIdSeleccionado != 0) {
      const index = this.pedidos.findIndex((pedido) => {
        return pedido.idPedido == this.pedIdSeleccionado;
      });
      pedido.idPedido = this.pedIdSeleccionado;
      success = this.pedidos[index] = pedido;
      this.pedIdSeleccionado = 0;
    } else {
      pedido.idPedido = gestionarPedido.devuelvoIdPed(); //devuelve el valor de id.
      success = this.pedidos.push(pedido); //el metodo push agrega a la plato al final de el array
    }
    this.limpiar();
    this.listarPedido(); //llama al metodo de listarPedido para actualizarlo
    return success;
  }

  listarPedido() {
    const listaPedidos = document.getElementById("listaPedidos");
    listaPedidos.innerHTML = ""; //se limpia contenedor de listarplatos
    this.pedidos.forEach((pedido) => {
      //recoerre el objeto plato en el array
      const optionPedido = document.createElement("li"); //por cada plato crea  un nuevo elemento en la lista
      const eliminar = document.createElement("button");
      const seleccionar = document.createElement("button");
      eliminar.textContent = "Eliminar";
      eliminar.className = "btn btn-danger float-end";
      eliminar.onclick = () => {
        this.eliminarPedidos(pedido.idPedido);
      };
      seleccionar.textContent = "Seleccionar";
      seleccionar.className = "btn btn-info float-end me-1";
      seleccionar.addEventListener("click", () => {
        this.seleccionar(pedido.idPedido);
      });

      optionPedido.className = "list-group-item";
      optionPedido.textContent = `Mesa: ${pedido.mesa} Fecha: ${pedido.fecha}     `; //se ultiliza un template string
      optionPedido.appendChild(eliminar);
      optionPedido.appendChild(seleccionar);
      listaPedidos.appendChild(optionPedido); //el elemento se agrega al al lista plato
    });
  }

  eliminarPedidos(idPedido) {
    // console.log(id);
    const index = this.pedidos.findIndex((pedido) => {
      return pedido.idPedido == idPedido;
    });
    //console.log(plato[index])
    let validar = confirm("Desea eliminar la Pedido?");
    if (validar) {
      this.pedidos.splice(index, 1);
      alert("Pedido eliminado.");
      this.listarPedido();
    } else {
      alert("El Pedido no se pudo eliminar.");
    }
  }

  limpiar() {
    document.getElementById("pMesa").value = "";
    document.getElementById("pFecha").value = "";
  }

  seleccionar(idPedido) {
    this.pedIdSeleccionado = idPedido;
    const pedido = this.pedidos.find((pedido) => {
      return pedido.idPedido == idPedido;
    });

    // Asignar los valores del pedido seleccionado a los campos
    document.getElementById("pMesa").value = pedido.mesa;
    document.getElementById("pFecha").value = pedido.fecha;
  }

  devuelvoIdPed() {
    let idPedido = -1; //inicia con el valor mas pequeño
    let i = 0;
    while (i < this.pedidos.length) {
      //recooro los elementos del array con el whilie
      //si es
      if (idPedido < this.pedidos[i].idPedido) {
        //se compara el valor actual de id con el id del objeto i en platos
        idPedido = this.pedidos[i].idPedido; //si el id actual es menor, se actualiza id con el id de la platos
      }
      i++;
    }
    return idPedido + 1; // deveulve el id y le suma uno
  }
}

let gestionarPedido = new GestionarPedido();
gestionarPedido.cargarPedido();

document.getElementById("formPedido").addEventListener("submit", (element) => {
  element.preventDefault(); // para que no se recarge la pagina
  let mesa = document.getElementById("pMesa").value; //levantamos el valor de la caja de texto del nombre.
  let fecha = document.getElementById("pFecha").value; //levantamos el valor de la caja de texto del apellido.
  let pedido = new Pedido(gestionarPedido.devuelvoIdPed(), mesa, fecha); //agrega la nueva persona con los datos previamnte cargados.
  let success = gestionarPedido.agregarPedido(pedido);
  if (success) {
    //si el proceso es factible tira da el resultado de exito.
    alert("Consulta realizada con exito!");
  } else {
    // si no es factible dara el mensaje de error.
    alert("Ha ocurrido un error");
  }
});
