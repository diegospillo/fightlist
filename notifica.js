var message = {from:{}};

function notifica(fn,us,txt,res,date,id){
    message.from.first_name = fn;
    message.from.username = us;
    message.text = txt;
    message.res = res;
    message.date = date;
    message.id = id;
    console.log(message);
  }

module.exports = notifica;
  