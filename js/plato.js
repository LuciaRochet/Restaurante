class Plato {
  constructor(pId, pNombre, pDescripcion, pPrecio, pDisponibilidad) {
    this.id = pId;
    this.nombre = pNombre;
    this.descripcion = pDescripcion;
    this.precio = pPrecio;
    this.disponibilidad = pDisponibilidad;
  }
}

class GestionarPlato {
  constructor() {
    //metodo que se ejecuta cuando se crea una nueva instacia en la clase
    this.platos = []; //se inicia el array vacio para almacenar plato
    this.idSeleccionado = 0;
  }
  cargarPlato() {
    this.platos = [
      new Plato(
        1,
        "Pizza Caprese",
        "Pizza con salsa de tomate, mozzarella y albahaca.",
        300.5,
        1
      ),
      new Plato(
        2,
        "Ensalada rusa",
        "Ensalada con papas, arvejas, zanahoria y mayonesa.",
        230.0,
        1
      ), //cargo los datos al array
    ];
    this.listarPlatos();
  }

  agregarPlato(plato) {
    let success = false;
    if (this.idSeleccionado != 0) {
      const index = this.platos.findIndex((plato) => {
        return plato.id == this.idSeleccionado;
      });
      plato.id = this.idSeleccionado;
      success = this.platos[index] = plato;
      this.idSeleccionado = 0;
    } else {
      plato.id = gestionarPlato.devuelvoId(); //devuelve el valor de id.
      success = this.platos.push(plato); //el metodo push agrega a la plato al final de el array
    }
    this.limpiar();
    this.listarPlatos(); //llama al metodo de listarPlatos para actualizarlo
    return success;
  }

  listarPlatos() {
    const listaPlatos = document.getElementById("listaPlatos");
    listaPlatos.innerHTML = ""; //se limpia contenedor de listarplatos
    this.platos.forEach((plato) => {
      //recoerre el objeto plato en el array
      const optionPlato = document.createElement("li"); //por cada plato crea  un nuevo elemento en la lista
      const eliminar = document.createElement("button");
      const seleccionar = document.createElement("button");
      eliminar.textContent = "Eliminar";
      eliminar.className = "btn btn-danger float-end";
      eliminar.onclick = () => {
        this.eliminarPlato(plato.id);
      };
      seleccionar.textContent = "Seleccionar";
      seleccionar.className = "btn btn-info float-end me-1";
      seleccionar.addEventListener("click", () => {
        this.seleccionar(plato.id);
      });

      optionPlato.className = "list-group-item";
      optionPlato.textContent = `Nombre: ${plato.nombre} Descripcion: ${plato.descripcion} Precio: ${plato.precio} Disponibilidad: ${plato.disponibilidad}     `; //se ultiliza un template string
      optionPlato.appendChild(eliminar);
      optionPlato.appendChild(seleccionar);
      listaPlatos.appendChild(optionPlato); //el elemento se agrega al al lista plato
    });
  }

  eliminarPlato(id) {
    // console.log(id);
    const index = this.platos.findIndex((plato) => {
      return plato.id == id;
    });
    //console.log(plato[index])
    let validar = confirm("Desea eliminar la plato?");
    if (validar) {
      this.platos.splice(index, 1);
      alert("Plato eliminado.");
      this.listarPlatos();
    } else {
      alert("El Plato no se pudo eliminar.");
    }
  }

  limpiar() {
    document.getElementById("pNombre").value = "";
    document.getElementById("pDescripcion").value = "";
    document.getElementById("pPrecio").value = "";
    document.getElementById("pDisponibilidad").value = "";
  }

  seleccionar(id) {
    this.idSeleccionado = id;
    const plato = this.platos.find((plato) => {
      return plato.id == id;
    });
    document.getElementById("pNombre").value = plato.nombre;
    document.getElementById("pDescripcion").value = plato.descripcion;
    document.getElementById("pPrecio").value = plato.precio;
    document.getElementById("pDisponibilidad").value = plato.disponibilidad;
  }

  devuelvoId() {
    let id = -1; //inicia con el valor mas pequeño
    let i = 0;
    while (i < this.platos.length) {
      //recooro los elementos del array con el whilie
      //si es
      if (id < this.platos[i].id) {
        //se compara el valor actual de id con el id del objeto i en platos
        id = this.platos[i].id; //si el id actual es menor, se actualiza id con el id de la platos
      }
      i++;
    }
    return id + 1; // deveulve el id y le suma uno
  }
}

let gestionarPlato = new GestionarPlato();
gestionarPlato.cargarPlato();

document.getElementById("formPlato").addEventListener("submit", (element) => {
  element.preventDefault(); // para que no se recarge la pagina
  let nombre = document.getElementById("pNombre").value; //levantamos el valor de la caja de texto del nombre.
  let descripcion = document.getElementById("pDescripcion").value; //levantamos el valor de la caja de texto del apellido.
  let precio = document.getElementById("pPrecio").value; //levantamos el valor de la caja de texto del edad.
  let disponibildad = document.getElementById("pDisponibilidad").value;
  let plato = new Plato(
    gestionarPlato.devuelvoId(),
    nombre,
    descripcion,
    precio,
    disponibildad
  ); //agrega la nueva persona con los datos previamnte cargados.
  let success = gestionarPlato.agregarPlato(plato);
  if (success) {
    //si el proceso es factible tira da el resultado de exito.
    alert("Consulta realizada con exito!");
  } else {
    // si no es factible dara el mensaje de error.
    alert("Ha ocurrido un error");
  }
});
