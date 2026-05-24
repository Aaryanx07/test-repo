const { exec } =
require("child_process");

module.exports =
(reviews)=>{

    return new Promise(

        (resolve,reject)=>{

            const command =

            `python backend/ml/predict.py '${JSON.stringify(reviews)}'`;

            exec(

                command,

                (error,stdout,stderr)=>{

                    if(error){

                        console.log(stderr);

                        reject(error);

                        return;
                    }

                    try{

                        resolve(
                            JSON.parse(stdout)
                        );
                    }

                    catch(err){

                        reject(err);
                    }
                }
            );
        }
    );
};