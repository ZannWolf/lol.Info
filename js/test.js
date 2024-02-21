const riotKey = "RGAPI-427d0ce6-e128-41b9-a1b4-4f6fbddf8e83";

const serverLocale = document.querySelector('.locale');
const serverStatus = document.querySelector('.status');
const incidents = document.querySelector('.incidents');
const notificationBox = document.querySelector('.notification_box');
const notification = document.querySelector('.notification');
const incident = document.querySelector('.incidents');
const incidentBox = document.querySelector('.incidents_box');

let notification_text = "";
let incidents_text = "";

function fetchServerstat() {
    fetch(`https://ru.api.riotgames.com/lol/status/v4/platform-data?api_key=${riotKey}`,{
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((resServer) => resServer.json())
    .then((dataServer) => {console.log(dataServer);
        serverLocale.textContent = `Сервер: ${dataServer.name}`;
        serverStatus.textContent = 'Статус: Онлайн';
        
        function errorPoster() {
            let n = 0;
            if (dataServer.incidents.length == 0) {
                const incident = document.createTextNode(`Ошибок пока нет!`);
                incidentBox.appendChild(incident);
            } else {
                while (n < dataServer.incidents.length){
                    console.log(n);
                    let t = 0;
                    while (t < dataServer.incidents[n].titles.length) {
                        if (dataServer.incidents[n].titles[t].locale == 'ru_RU') {
                            incidents_text = incidents_text + `${n+1}) ${dataServer.incidents[n].titles[t].content} : ${dataServer.incidents[n].updates[0].translations[t].content} `;
                        }
                        t++;
                    }
                    n++;
                }
            }
            console.log(incidents_text)
            incident.textContent = incidents_text;
        }


        function notificationPoster() {
            let n = 0;
            if (dataServer.maintenances.length == 0) {
                const notification = document.createTextNode(`Оповещений пока нет!`);
                notificationBox.appendChild(notification);
            } else {
                while (n < dataServer.maintenances.length){
                    console.log(n);
                    let t = 0;
                    while (t < dataServer.maintenances[n].titles.length) {
                        if (dataServer.maintenances[n].titles[t].locale == 'ru_RU') {
                            notification_text = notification_text + `${n+1}) ${dataServer.maintenances[n].titles[t].content} : ${dataServer.maintenances[n].updates[0].translations[t].content} `;
                        }
                        t++;
                    }
                    n++;
                }
            }
            console.log(notification_text)
            notification.textContent = notification_text;
        }
        notificationPoster()
        errorPoster() 
    })
    .catch((error) => {
        serverLocale.textContent = 'Сервер: Неизвестно'
        serverStatus.textContent = 'Статус: Оффлайн';
        serverStatus.style.color = '#ff0000';
        notification.textContent = 'Ошибка';
        incident.textContent = 'Ошибка';
    })
  } 
   
function main() {
    try{
        fetchServerstat();
    } catch (error) {
        console.log(error)
    }
}

main()