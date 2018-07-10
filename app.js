//La firma es el nombre de la función, los parámetros y lo que retorna
function animateElement(element, start, target, duration, axis){ //Retornará promesa con elemento
    element.style[axis] = start; 
    let counter = 0;
    const delta = (target - start) * 40 / duration; //delta es lo que se debe mover por cuadro
    return new Promise((resolve, reject)=>{ // Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject()
        const loop = setInterval(()=>{ // toma una funcion y la repite cada ciertos milisegundos
            const current = start + counter++ * delta; //a acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo
            element.style[axis] = current;
            if((start > target && current < target) || (start < target && current > target)){ // acá indicamos cuando queremos que finalize el moviento que seria alb llegar a target
                clearInterval(loop); // Acá se termina la promesa
                resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
            }
        }, 40);// 40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion
    });                
}

// Somos programadoras de la promise
//===================== Promise ===================
// Somos las usuarias de la promise

//Secuencial

const allLi = document.getElementsByTagName("li");

// animateElement(allLi[0], -200, 200, 4000).then(()=>{ // coordenadas fuera de la pantalla se indican con numeros negativos. Acá se está haciendo uso de la promesa por fuera.
//     console.log("Terminó la animación de doge");
//     return animateElement(allLi[1], -200, 200, 2000); //" cá tenemos una promesa anidada, es como decirle: hiciste esto, y ahora haz esto otro
// }).then(()=>{ 
//     console.log("Terminó de llegar el cate");
// }).catch(()=>{
//     console.log("Falló la animación");
// });

Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
    [
        animateElement(allLi[1], -200, 600, 9000, 'left'),
        animateElement(allLi[0], -200, 600, 8000, 'left')
    ]
).then((results)=>{
    console.log("terminaron de moverse a la derecha");
    return Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
        [
            animateElement(allLi[0], 0, 400, 9000, 'top'),
            animateElement(allLi[1], 150, 550, 8000, 'top')
        ]
    )
}).then(()=>{
    console.log("Terminaron de moverse abajo");
    return Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
        [
            animateElement(allLi[1], 600, 0, 9000, 'left'),
        animateElement(allLi[0], 600, 0, 8000, 'left')
        ]
    )
}).then((results)=>{
    console.log("terminaron de moverse a la izquierda");
    return Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
        [
            animateElement(allLi[0], 400, 0, 9000, 'top'),
            animateElement(allLi[1], 550, 150, 8000, 'top')
        ] 
    )
})

.catch(()=>{
    console.log("Falló la animación");
});
