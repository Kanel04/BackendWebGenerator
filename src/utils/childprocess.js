const {exec} = require('child_process');
module.exports = {
exectute (commande){
    return new Promise((resolve , reject) =>{
        exec(commande,(error, stdout,stderr) =>{
            if (error){
                return reject(error);
            }
            if (stderr){
                return reject(stderr);
            }
            return resolve(stdout);
        });
    })
}
}
;
