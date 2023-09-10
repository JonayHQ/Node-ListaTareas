import { v4 as uuidv4 } from 'uuid';
import Tarea from './tarea.js';


class Tareas {

    _listado = {};
    
    get listadoArr(){

        const listado = []
        Object.values(this._listado).forEach(value =>{
            listado.push(value)

        })
        return listado
    }

    constructor() {
        this._listado = {};
    }

    cambioEstado(ids=[]){

        ids.forEach(id => {
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
            
        });

        this.listadoArr.forEach(tarea => {
            
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn=null
            }

        });
    }

    borrarTarea(id=""){

        if(this._listado[id]){
            delete this._listado[id]
            console.log("Tarea borrada")
        }

    }

    cargarTareasDB (tareas = []){

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        });

    }

    crearTarea(desc = ""){

        const tarea = new Tarea(desc)
        // guarda el objeto de _listado, con el nombre de tarea id. algo asi:
                // _listado = { asdASASdFa111-11a--asd(idTarea): {infoTarea},
            //                  ñalsdkfñlsdkfañls----asdf: {infoTarea2}, .... }
        this._listado[tarea.id] = tarea

    }

    listadoCompleto(){

        console.log()
        this.listadoArr.forEach((tarea,i) => {
            const idx = `${i+1}`.green
            const {desc, completadoEn} = tarea
            const estado = (completadoEn)
                                ? "Completada".green
                                : "Pendiente".red

            console.log(`${idx} ${desc} :: ${estado}`)
           
        });
    }

    listarCompletasPendiente(completadas = true){
        console.log()
        let contador = 1
        this.listadoArr.forEach((tarea,i) => {
            const {desc, completadoEn} = tarea
            const estado = (completadoEn)
                                    ? "Completada".green
                                    : "Pendiente".red

            if(completadas && completadoEn){
                const idx = `${contador}`.green
                contador += 1
                
                console.log(`${idx} ${desc} :: ${completadoEn}`)
            }

            if(!completadas && !completadoEn){
                const idx = `${contador}`.green
                contador += 1
                
                console.log(`${idx} ${desc} :: ${estado}`)
            }
            
        });
    }

}

export default Tareas