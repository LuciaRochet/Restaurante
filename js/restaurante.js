class Restaurante {
  constructor(IdRes, rNombre, rMesas) {
    this.idRes = IdRes;
    this.nombreRes = rNombre;
    this.mesasRes = rMesas;
  }
}

class GestionarRestaurante {
  constructor() {
    //metodo que se ejecuta cuando se crea una nueva instacia en la clase
    this.restaurantes = [];
    this.idResSeleccionado = 0;
  }
  cargarRestaurante() {
    this.restaurantes = [
      new Restaurante(1, "La Casa de Comidas", 20),
      new Restaurante(2, "Sabor Latino", 15),
      new Restaurante(3, "Pizzería Bella Italia", 30), //cargo los datos al array
    ];
    this.listarRestaurante();
  }

  agregarRestaurante(restaurante) {
    let success = false;
    if (this.idResSeleccionado != 0) {
      const index = this.restaurantes.findIndex((restaurante) => {
        return restaurante.idRes == this.idResSeleccionado;
      });
      restaurante.idRes = this.idResSeleccionado;
      success = this.restaurantes[index] = restaurante;
      this.idResSeleccionado = 0;
    } else {
      restaurante.idRes = gestionarRestaurante.devuelvoidRes(); //devuelve el valor de id.
      success = this.restaurantes.push(restaurante); //el metodo push agrega a la restaurante al final de el array
    }
    this.limpiar();
    this.listarRestaurante(); //llama al metodo de listarRestaurante para actualizarlo
    return success;
  }

  listarRestaurante() {
    const listarRestaurante = document.getElementById("listaRestaurantes");
    listaRestaurantes.innerHTML = ""; //se limpia contenedor de listarplatos
    this.restaurantes.forEach((restaurante) => {
      //recoerre el objeto restaurante en el array
      const optionResto = document.createElement("li"); //por cada restaurante crea  un nuevo elemento en la lista
      const eliminar = document.createElement("button");
      const seleccionar = document.createElement("button");
      eliminar.textContent = "Eliminar";
      eliminar.className = "btn btn-danger float-end";
      eliminar.onclick = () => {
        this.eliminarRestaurante(restaurante.idRes);
      };
      seleccionar.textContent = "Seleccionar";
      seleccionar.className = "btn btn-info float-end me-1";
      seleccionar.addEventListener("click", () => {
        this.seleccionar(restaurante.idRes);
      });

      optionResto.className = "list-group-item";
      optionResto.textContent = `Nombre: ${restaurante.nombreRes} Mesas: ${restaurante.mesasRes}      `; //se ultiliza un template string
      optionResto.appendChild(eliminar);
      optionResto.appendChild(seleccionar);
      listarRestaurante.appendChild(optionResto); //el elemento se agrega al al lista restaurante
    });
  }

  eliminarRestaurante(idRes) {
    // console.log(id);
    const index = this.restaurantes.findIndex((restaurante) => {
      return restaurante.idRes == idRes;
    });
    //console.log(restaurante[index])
    let validar = confirm("Desea eliminar la restaurante?");
    if (validar) {
      this.restaurantes.splice(index, 1);
      alert("Restaurante eliminado.");
      this.listarRestaurante();
    } else {
      alert("El Restaurante no se pudo eliminar.");
    }
  }

  limpiar() {
    document.getElementById("rNombre").value = "";
    document.getElementById("rMesas").value = "";
  }

  seleccionar(idRes) {
    this.idResSeleccionado = idRes;
    const restaurante = this.restaurantes.find((restaurante) => {
      return restaurante.idRes == idRes;
    });
    document.getElementById("rNombre").value = restaurante.nombreRes;
    document.getElementById("rMesas").value = restaurante.mesasRes;
  }

  devuelvoidRes() {
    let idRes = -1; //inicia con el valor mas pequeño
    let i = 0;
    while (i < this.restaurantes.length) {
      //recooro los elementos del array con el whilie
      //si es
      if (idRes < this.restaurantes[i].idRes) {
        //se compara el valor actual de id con el id del objeto i en restaurantes
        idRes = this.restaurantes[i].idRes; //si el id actual es menor, se actualiza id con el id de la restaurantes
      }
      i++;
    }
    return idRes + 1; // deveulve el id y le suma uno
  }
}

let gestionarRestaurante = new GestionarRestaurante();
gestionarRestaurante.cargarRestaurante();

document.getElementById("formResto").addEventListener("submit", (element) => {
  element.preventDefault(); // para que no se recarge la pagina
  let nombre = document.getElementById("rNombre").value; //levantamos el valor de la caja de texto del nombre.
  let mesas = document.getElementById("rMesas").value; //levantamos el valor de la caja de texto del apellido.
  let restaurante = new Restaurante(
    gestionarRestaurante.devuelvoidRes(),
    nombre,
    mesas
  ); //agrega la nueva persona con los datos previamnte cargados.
  let success = gestionarRestaurante.agregarRestaurante(restaurante);
  if (success) {
    //si el proceso es factible tira da el resultado de exito.
    alert("Consulta realizada con exito!");
  } else {
    // si no es factible dara el mensaje de error.
    alert("Ha ocurrido un error");
  }
});
