import { firebaseConfig } from './credentials.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// iniciar la base de datos
const app = initializeApp(firebaseConfig);
var database = getFirestore(app);

console.info(app);
console.info(database);
console.info("Conexión realizada con éxito a ",app.name);


// referenciar mi base de datos
var coleccion_retos = collection(database,"retos");

document.getElementById("contactForm").addEventListener("submit", (ev)=>{
    ev.preventDefault();
    var nombreReto = document.querySelector("#nombreReto").value;
    var descripcionReto = document.querySelector("#descripcionReto").value;
    var Normas = document.querySelector("#Normas").value;
    enviarReto(nombreReto,descripcionReto,Normas);
});


async function enviarReto(nombreReto, descripcionReto, Normas){
  try {
      const reto = {
          nombreReto: nombreReto,
          descripcionReto: descripcionReto,
          Normas: Normas,
      };
      console.info("Intentando enviar "+ JSON.stringify(reto)+" ...");
      await addDoc(coleccion_retos, reto);
      console.info("Datos enviados!")
  } catch (error) {
      console.error("Error al agregar datos", error);
  }
};