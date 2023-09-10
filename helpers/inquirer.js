import inquirer from 'inquirer';
import colors from 'colors'
export { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirm,
    listadoCheckList }


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: '1.'.green+ 'Crear tarea'
            },
            {
                value: '2',
                name: '2.'.green+ 'Listar tarea'
            },
            {
                value: '3',
                name: '3.'.green+ 'Listar tareas completadas'
            },
            {
                value: '4',
                name: '4.'.green+ 'Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5.'.green+ 'Completar tarea(s)'
            },
            {
                value: '6',
                name: '6.'.green+ 'borrar tarea'
            },
            {
                value: '0',
                name: '0.'.green+ 'Salir'
            }
        ]

    }
]


const inquirerMenu = async() => {

    //console.clear()
    console.log('======================='.green)
    console.log('Seleccione una opcion'.white)
    console.log('=======================\n'.green)

const {opcion} = await inquirer.prompt(preguntas)

return opcion
}  

const pauseMensaje = [
    {
        type: 'input',
        name: 'mensajeEnter',
        message: `\nPresione ${'ENTER'.green} para continuar\n`
    }
    ]

const pausa = async() => {

    //console.clear()
   
const {mensajeEnter} = await inquirer.prompt(pauseMensaje)

return mensajeEnter

}

const leerInput = async(mensaje)=>{

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            
            validate( value ){
                if(value.length === 0){
                    return "Por favor ingrese un valor"
                }
                return true;
            }
        }
    ];

const {desc} = await inquirer.prompt(question);

return desc

}


const listadoTareasBorrar = async(tareas = [])=>{

let choices = []
tareas.forEach((tarea,i) => {
let idx = i+1
let linea = `${idx}.`.green + ` ${tarea.desc}`

let obj = {
    value: tarea.id,
    name: linea
}

choices.push(obj)

});
choices.unshift({value: "0", name: "0. Cancelar"})

    const listaEliminar = [
        {
            type: 'list',
            name: 'id',
            message: '¿Mueve arriba abajo para selecionar la tarea a eliminar y pulsa enter?\n',
            choices: choices,//[{..1},{...2}]
        }   
            ]
    
    const {id} = await inquirer.prompt(listaEliminar)
            return id
}


const confirm = async (mensaje)=> {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje,
        }   
            ]

            const {ok} = await inquirer.prompt(pregunta)
        return ok
}


const listadoCheckList = async(tareas = [])=>{

    let choices = []
    tareas.forEach((tarea,i) => {
    let idx = i+1
    let linea = `${idx}.`.green + ` ${tarea.desc}`
    
    let obj = {
        value: tarea.id,
        name: linea,
        checked: (tarea.completadoEn)?true:false
    }
    
    choices.push(obj)
    console.log(choices)
    
    });
        const lista = [
            {
                type: 'checkbox',
                name: 'ids',
                message: 'Seleccione',
                choices,//[{..1},{...2}]
            }   
                ]
        
    const {ids} = await inquirer.prompt(lista)
     return ids
    }