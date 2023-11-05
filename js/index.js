const cardsProperties = [
    [ 
        {"line1":"h3","line2":"h2","line3":"p","line4":"h2","line5":"p","line6":"p"},
        { "line1":"¡ACOMPAÑANOS!",
        "line2":"¡ES UNA SORPRESA!",
        "line3":"Estamos organizando una fiesta sorpresa para",
        "line4":"custom-name",
        "line5":"custom-datetime",
        "line6":"custom-address"
        },
        {"style":"card1"}

    ],
    [
        {"line1":"h2","line2":"h2","line3":"p","line4":"p","line5":"h2","line6":"h3"},
        { "line1":"TE INVITO A",
        "line2":"MI FIESTA DE CUMPLEAÑOS",
        "line3":"custom-datetime",
        "line4":"custom-address",
        "line5":"¡NO FALTES!",
        "line6":"custom-name"
        },
        {"style":"card2"}
    ],
    [
        {"line1":"p","line2":"p","line3":"p","line4":"p","line5":"p"},
        { "line1":"TE INVITO A MI FIESTA DE",
        "line2":"Cumpleaños",
        "line3":"custom-datetime",
        "line4":"custom-address",
        "line5":"custom-name",
        },
        {"style":"card3"}
    ]
];
let cardId;
const cardBody = document.getElementById('card-body');


const cardStyles = (styleID) =>{

    cardId = styleID;
 
    killChildren();

    const styleFileNameNew = cardsProperties[styleID][2].style
    const styleFileNameOld = document.getElementById('styles-card');
    styleFileNameOld.href = "./css/"+styleFileNameNew+".css" 
    cardBody.className === "default" && (cardBody.className = "card-body");

    createTags();
}

const createCard = () =>{

    if(typeof(cardId) === "undefined"){
        alert("Primero debe elegir un Diseño.")
        return
    }
    
    killChildren();
    createTags(true);

}


const killChildren = () =>{
    
    while (cardBody.firstChild) {
    cardBody.removeChild(cardBody.firstChild);
  }
}

const createTags = (custom = false) =>{
    
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const address = document.getElementById('address').value;

    if(custom === true && (name ==="" || date ==="" || time ==="" || address ==="")){
        alert("Todos los campos son obligatorios, no pueden quedar en blanco.");
        
    }
    
    const datetimeFormated = formatDate(date,time)
    
    const arrayTagsValues = Object.values(cardsProperties[cardId][0])
    const arrayTagsKeys = Object.keys(cardsProperties[cardId][0])
    const arrayTextValues = Object.values(cardsProperties[cardId][1])
    
    for (let index = 0; index < arrayTagsValues.length; index++) {
    
        let tag = document.createElement(arrayTagsValues[index]);
        tag.id = arrayTagsKeys[index];
        let tagContent;
        
        switch (arrayTextValues[index]) {
            case "custom-name":
                tagContent = (name !== "" && custom === true) ? document.createTextNode(name) : document.createTextNode(arrayTextValues[index]); 
                break;
            case "custom-datetime":
                tagContent = (datetimeFormated !== "" && custom === true) ? document.createTextNode(datetimeFormated) : document.createTextNode(arrayTextValues[index]); 
                break;
            case "custom-address":
                tagContent = (address !== "" && custom === true) ? document.createTextNode(address) : document.createTextNode(arrayTextValues[index]); 
                break;
            default:
                tagContent = document.createTextNode(arrayTextValues[index]); 
                break;
        }
     
        tag.appendChild(tagContent);
        cardBody.appendChild(tag);
    }
}

const formatDate = (date,time) =>{

    const datetimeFusion = date+"T"+time
    const datatime = new Date(datetimeFusion);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return date === "" ? "custom-datetime" : datatime.toLocaleString('es-AR', options) + " | " + time + " Horas";

}
