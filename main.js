const usernameForm = document.getElementById('username');
const emailForm = document.getElementById('email');
const dateForm = document.getElementById('date');
const buttonSubmit = document.getElementById('submitForm');
const form = document.getElementById('datos-form')
const cardSigno = document.getElementById('card')
//Funciones multitasking(?)

function isEmpty (valorInput) {
    return !valorInput.length;
} 

function isBetween (valorInput, min, max) {
    return valorInput.length > min && valorInput.length < max;
}
function showError (input, mensaje){
    const formField = input.parentElement; //accedo al elemento padre
    formField.classList.add("error");
    formField.classList.remove("success");

    const error = formField.querySelector("small");
    error.textContent = mensaje;
}
function showSuccess (input, mensaje){
    const formField = input.parentElement; //accedo al elemento padre
    formField.classList.add("success");
    formField.classList.remove("error");

    const error = formField.querySelector("small");
    error.textContent = mensaje;
}

function isEmailValid(emailInput){
    //voy a buscar un regex regular para ver que es lo q verifica un email [https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions]

    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //Ejemplo:alguien@algunlugar.es
    console.log(re.test(emailInput))
    return re.test(emailInput)
}

// verificamos el nombre

const checkUsername = () => {
    let valid = false;
    min= 3;
    max= 25;

    const username = usernameForm.value.trim()

    if(isEmpty(username)){
        showError(usernameForm, "Por favor, ingresá tu nombre") 
    }
    else if (!isBetween(username, min, max)){
        showError(usernameForm, "Tu nombre debe abarcar entre los 3 y 25 caractéres.")
    }
    else {
        valid = true;
        showSuccess(usernameForm, "")
    }
    return valid;

    

    //Me estará devolviendo true o false.
}

const checkEmail = () => {
    let valid = false;

    const email = emailForm.value.trim();

    if(isEmpty(email)){
        showError(emailForm, "Ingresa tu correo electrónico");
    }
    else if(!isEmailValid(email)){
        showError(emailForm, "Por favor, ingresa un email existente");
    }
    else {
        showSuccess(emailForm, "");
        valid = true;
    }
    return valid
}



const checkDate = () => {
    let valid = false;
    let date = new Date(dateForm.value+'T00:00:00'); // 16 Dec 1998 16/11/1998
    let signoEncontrado = signos.find(e => {
        let fechaDeInicio = date.getFullYear() + "-" + e.fdI
        let fechaDeFinal = date.getFullYear() + "-" + e.fdF
        if(date >= new Date(fechaDeInicio) && date <=  new Date(fechaDeFinal)){
            valid = true;
            return e;
        } else if(date >= new Date(date.getFullYear() + "-" + e.fdI1) && date <=  new Date(date.getFullYear() + "-" + e.fdF1) || date >= new Date(date.getFullYear() + "-" + e.fdI2) && date <=  new Date(date.getFullYear() + "-" + e.fdF2) ) {
            valid = true;
            return e
        }
        else {
            return null
        }

        
    })
    console.log(signoEncontrado)
    createCard(signoEncontrado);
    return valid;


}

const createCard = (card) => {

    //const {id, sign, imagen, fecha, elemento, estacion, planeta, caracteristicas, famosos} = card;
    
    console.log(card)  
    const cardHtml = `<div class="card" id="${card.id}">
    
    <h3 id="name">${card.sign}</h3>
    <img src="assets/${card.imagen}" alt="${card.sign}">
    <h4 id="fecha">${card.fecha}</h4>
    <div class="text-item">
        <h4>Elemento principal:</h4><p>${card.elemento}</p>
    </div>
    <div class="text-item">
        <h4>Naturaleza estacional:</h4><p>${card.estacion}</p>
    </div>
    <div class="text-item">
        <h4>Planeta regente:</h4><p>${card.planeta}</p>
    </div>
    <div class="text-item exception">
        <h4>Características:</h4>
        <p>${card.caracteristicas}</p>                
    </div>
    <div class="text-item">
        <h4>Famosos con tu signo:</h4>
        <p>${card.famosos}</p>
    </div>
</div>`
console.log(cardHtml)
renderSigno(cardHtml);
}


const renderSigno = (textoHtml) => {
    cardSigno.innerHTML= textoHtml;

    console.log(textoHtml)
}


//Del 22 de Noviembre(10) al 21 de Diciembre(11)
const aries = {
    id: 1, 
    fdI: "03-21T00:00:00",
    fdF: "04-19T00:00:00",
    sign: "Aries", 
    imagen: "aries.png",
    fecha: "Del 21 de Marzo al 19 de Abril",
    elemento: "Fuego",
    estacion: "Otoño",
    planeta: "Marte",
    caracteristicas: "Los Aries son personas llenas de energía y entusiasmo por la vida. Aventureros por naturaleza, les encantan los retos, la libertad y las nuevas ideas, por lo que nunca tienen miedo a los comienzos o nuevas etapas. Son líderes y prefieren dar órdenes a recibirlas. La energía que emana de ellos les lleva a ser algo agresivos, tercos e inquietos. Si te cruzas con alguno de ellos ten cuidado de no ofenderlos, ya que pueden sentirse así de forma muy fácil. Es complicado hacer las paces con ellos. Aries es el primer signo del Zodiaco, de ahí que sean líderes y les guste empezar nuevos retos. Siempre lucharán si creen que la causa merece la pena.",
    famosos: "Reese Witherspoon",
}
const tauro = {
    id: 2, 
    fdI: "04-20T00:00:00",
    fdF: "05-21T00:00:00",
    sign: "Tauro", 
    imagen: "tauro.png",
    fecha: "Del 20 de Abril al 21 de Mayo",
    elemento: "Tierra",
    estacion: "Otoño",
    planeta: "Venus",
    caracteristicas: "Un Tauro es una persona que tiene una gran fuerza de voluntad, es práctico y decidido en la toma de decisiones. Suelen ser personas estables y conservadoras y no dudan en seguir a un líder si les despierta confianza. Son gente de paz, por lo que lo normal es que respeten las leyes y normas. El hecho de que tengan entusiasmo por la rutina y la continuidad hace que sean algo tozudos y de ideas fijas. No suelen hundirse en las dificultades y siempre salen adelante. Amantes de la buena comida, bebida y distintos placeres de la vida deben tener cuidado con los excesos.",
    famosos: "Robert Pattinson",
}
const geminis = {
    id: 3, 
    fdI: "05-22T00:00:00",
    fdF: "06-20T00:00:00",
    sign: "Géminis", 
    imagen: "geminis.png",
    fecha: "Del 22 de Mayo al 20 de Junio",
    elemento: "Aire",
    estacion: "Otoño",
    planeta: "Mercurio",
    caracteristicas: "Carácter doble, complejo y contradictorio es lo que mejor define a un Géminis . Al contrario que los Aries, los Géminis empiezan con entusiasmo nuevas aventuras, pero tienden a aburrirse rápido por la falta de constancia. Son personas cariñosas, amables y generosas , aunque tienen algo de mentirosos si quieren obtener algo. Eso sí, sin perder el encanto. Suelen ser personas que se desaniman con facilidad ante las dificultades, por lo que necesitan escuchar halagos y recibir atención. Inteligencia y capacidad para aprender la tienen, aunque suelen aburrirse en el proceso de aprendizaje.",
    famosos: "Angelina Jolie",
}
const cancer = {
    id: 4, 
    fdI: "06-21T00:00:00",
    fdF: "07-22T00:00:00",
    sign: "Cáncer", 
    imagen: "cancer.png",
    fecha: "Del 21 de Junio al 22 de Julio",
    elemento: "Agua",
    estacion: "Invierno",
    planeta: "Luna",
    caracteristicas: "Los Cáncer son personas complicadas de clasificar, si se atiende a su carácter. Los hay tímidos y aburridos , pero también brillantes y famosos . De hecho, algunos presentan una alta capacidad literaria y artística, gracias a su capacidad imaginativa. Les encanta ser extrovertidos, pero también tienen tendencia a retraerse. El hogar es lo más importante para ellos, por la seguridad y el calor que encuentran en él.",
    famosos: "Meryl Streep",
}
const leo  = {
    id: 5, 
    fdI: "07-23T00:00:00",
    fdF: "08-22T00:00:00",
    sign: "Leo", 
    imagen: "leo.png",
    fecha: "Del 23 de Julio al 22 de Agosto",
    elemento: "Fuego",
    estacion: "Otoño",
    planeta: "Sol",
    caracteristicas: "Es el signo más dominante del Zodiaco. Es creativo y extrovertido. Tienen ambición, fuerza, valentía y seguridad en sus capacidades. No temen a los obstáculos y suelen ser buenos, idealistas e inteligentes. Para los Leo , el lujo y el poder están entre sus gustos. Asimismo, son capaces de utilizar trucos y mentiras para desacreditar a sus enemigos. A veces, también pueden caer en la superioridad y la prepotencia.",
    famosos: "Kylie Jenner",
}
const virgo  = {
    id: 6, 
    fdI: "08-23T00:00:00",
    fdF: "09-22T00:00:00",
    sign: "Virgo", 
    imagen: "virgo.png",
    fecha: "Del 23 de Agosto al 22 de Septiembre",
    elemento: "Tierra",
    estacion: "Invierno",
    planeta: "Ceres",
    caracteristicas: "Único signo zodiacal representado por una mujer . Los Virgo son observadores, pacientes y les cuesta hacer amigos por su carácter frío que muestran a veces. A pesar de ello tienen encanto y suelen ayudar a los demás cuando se presenta un problema. El método, el estudio y la lógica predominan en ellos, por eso les gusta aprender siempre, así como tener un análisis de la situación. Tanto se paran a pensar que a veces pueden retrasar la conclusión de los proyectos más complicados que llevan a cabo. Son intuitivos y capaces de ver todos los lados de un argumento.",
    famosos: "Zendaya",
}
const libra  = {
    id: 7, 
    fdI: "09-23T00:00:00",
    fdF: "10-22T00:00:00",
    sign: "Libra", 
    imagen: "libra.png",
    fecha: "Del 23 de Septiembre al 22 de Octubre",
    elemento: "Aire",
    estacion: "Primavera",
    planeta: "Eris",
    caracteristicas: "El signo del Zodiaco más civilizado . Tienen encanto, elegancia, buen gusto y son amables y pacíficos, por lo que no es raro que ante conflictos sean imparciales y muestren su rechazo a ellos. Valoran el esfuerzo de los demás y les gusta trabajar en equipo. El lado negativo de Libra es que de lo curiosos que son a veces se entrometen en la vida de los demás . Están en contra de la rutina, y una vez que tengan una opinión de algo no les gusta que se les contradiga.",
    famosos: "Zac Efron",
}
const escorpio  = {
    id: 8, 
    fdI: "10-23T00:00:00",
    fdF: "11-21T00:00:00",
    sign: "Escorpio", 
    imagen: "escorpio.png",
    fecha: "Del 23 de Octubre al 21 de Noviembre",
    elemento: "Agua",
    estacion: "Primavera",
    planeta: "Plutón",
    caracteristicas: "Un Escorpio es una persona tranquila que parece alejada de la realidad, aunque nunca dejan de observar todo a su alrededor con el ojo crítico. Tienen mucha fuerza de voluntad y muestran tenacidad , pero también les afecta al estado de ánimo las circunstancias que les rodean. Suelen ser críticos y esto les lleva, a veces, a ser algo resentidos con los demás. Sin embargo son excelentes amigos de aquellos a los que consideran que merecen su respeto.",
    famosos: "Emilia Clarke",
}
const sagitario = {
    id: 9, 
    fdI: "11-22T00:00:00",
    fdF: "12-21T00:00:00",
    sign: "Sagitario", 
    imagen: "sagitario.png",
    fecha: "Del 22 de Noviembre al 21 de Diciembre",
    elemento: "Fuego",
    estacion: "Primavera",
    planeta: "Júpiter",
    caracteristicas: "Sagitario es el signo más positivo de todo el Zodiaco. Cuando las cosas se ponen complicadas un Sagitario siempre sacará la mejor versión y se olvidará de la negatividad. Entre sus mejores características están las de ser buenos organizadores y abarcar nuevos proyectos y aprender cosas nuevas. El lado negativo es el genio que pueden mostrar a veces, sobre todo cuando detectan que alguien no va a su ritmo. Muchas veces también son exigentes con los demás , porque cuando un objetivo se les pone enfrente no dudan en sacrificarse.",
    famosos: "Taylor Swift",
}
const capricornio = {
    id: 10, 
    fdI1: "12-22T00:00:00",
    fdF1: "12-31T00:00:00",
    fdI2: "01-01T00:00:00",
    fdF2: "01-19T00:00:00",
    sign: "Capricornio",
    imagen: "capricornio.png",
    fecha: "Del 22 de Diciembre al 21 de Enero",
    elemento: "Tierra",
    estacion: "Verano",
    planeta: "Saturno",
    caracteristicas: "Estabilidad, seguridad y tranquilidad es lo que mejor define a un Capricornio . Son personas justas y exigentes con los demás, porque también lo son con ellos mismos. Suelen perder el control de sus emociones, por lo que es fácil que sean pesimistas y melancólicos, pero siempre tratan de buscar ayuda. Por eso es recomendable que mantengan la estabilidad emocional a través de la meditación, respiración o actividades que les ayuden a relajarse.",
    famosos: "Carolina Herrera",
}
const acuario = {
    id: 11, 
    fdI: "01-20T00:00:00",
    fdF: "02-18T00:00:00",
    sign: "Acuario", 
    imagen: "acuario.png",
    fecha: "Del 20 de Enero al 18 de Febrero",
    elemento: "Aire",
    estacion: "Verano",
    planeta: "Urano",
    caracteristicas: "Los Acuario tienen una personalidad fuerte y atractiva, pero hay dos tipos : los que son tímidos, sensibles y pacientes; y los que son exuberantes, vivos y frívolos. Eso sí, ambos son honestos y no dudarán en cambiar su opinión si estaban equivocados. Es el signo más tolerante de los doce, pero tampoco les gusta pertenecer a la multitud. Muchas veces sienten la necesidad de retirarse para meditar. No hacen amigos con facilidad, a pesar de la personalidad abierta que tienen.",
    famosos: "Harry Styles",
}
const piscis = {
    id: 12, 
    fdI: "02-19T00:00:00",
    fdF: "03-20T00:00:00",
    sign: "Piscis", 
    imagen: "piscis.png",
    fecha: "Del 20 de Enero al 18 de Febrero",
    elemento: "Agua",
    estacion: "Verano",
    planeta: "Neptuno",
    caracteristicas: "Son tranquilos, amables y pacientes. Los Piscis son sensibles a los sentimientos de los demás y responden con simpatía al tacto y al sufrimiento. Son queridos por el resto de los signos, debido al carácter afable, cariñoso y amable. Les preocupan más los problemas de los demás que los suyos propios. Eso sí, les cuesta mucho luchar por el poder establecido. Son creativos y artísticos.",
    famosos: "Rihanna",
}

const signos = [aries, tauro, geminis, cancer, leo, virgo, libra, escorpio, sagitario, capricornio, acuario, piscis]


//renderizar
const isValidForm = () => {
    const isValidName = checkUsername(usernameForm);
    const isValidEmail = checkEmail(emailForm);
    const isValidDate = checkDate(dateForm);
    
    return isValidDate && isValidDate && isValidEmail
}

const init = () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault(); //hacerlo siempre
        checkUsername();
        checkEmail();
        checkDate();
    })

}

init();





