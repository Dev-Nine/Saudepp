export default function showTime(date){
   date = new Date(date);
   const currentDate = new Date();
   const diff = currentDate.getTime() - date.getTime();
   if(diff < 60000) // less than 1 minute
       return "Publicado agora!"
   if(diff < 3600000){ // less than 1 hour
       var mins = parseInt(diff / 60000);
       if(mins === 1)
           return `Publicado a 1 minuto`
       return `Publicado a ${mins} minutos`
   }
   if(diff < 86400000){ // less than a day
       var hours = parseInt(diff / 3600000);
       if(hours === 1)
           return `Publicado a 1 hora`
       return `Publicado a ${hours} horas`
   }else{
       return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, 
           às ${date.getHours()}:${("0" + String(date.getMinutes())).slice(-2)}`
   }
}
