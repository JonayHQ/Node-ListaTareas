import colors from 'colors';

import { inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirm,
        listadoCheckList } from './helpers/inquirer.js'
//import Tarea from './models/tarea.js';
import Tareas from './models/tareas.js';
import {guardarDB, leerDB} from './helpers/guardarArchivo.js'


//console.clear()

const main = async()=>{

let opt = ""
const tareas = new Tareas()

const tareasDB = leerDB()

if (tareasDB){
    tareas.cargarTareasDB(tareasDB)
}




do {
    //imprimir el menu
   opt = await inquirerMenu()
   console.log({opt})
   console.log('\n')

   switch(opt){
        case '1':
            const desc = await leerInput('¿Que tarea quiere añadir?')
            tareas.crearTarea(desc)
        break;

        case '2':
            tareas.listadoCompleto()
        break;
        case '3':
            tareas.listarCompletasPendiente(true)
        break;
        case '4':
            tareas.listarCompletasPendiente(false)
        break;
        case '5':
            const ids = await listadoCheckList(tareas.listadoArr)
            tareas.cambioEstado(ids)
        break;
        case '6':
            const id = await listadoTareasBorrar(tareas.listadoArr)
            if(id!=="0"){
                const confirmDelete = await confirm('¿Esta seguro?') 
                if(confirmDelete){
                    tareas.borrarTarea(id)
                }
            }
            
        break;
   }


   //con esta funcion hacemos que los datos sean permanentes
   guardarDB(tareas.listadoArr)


 // const tarea = new Tarea("Comprar tomates")
 // console.log(tarea) 
 // console.log(tareas)

  await pausa()

} while (opt!=='0')


}



main()