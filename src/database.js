const mysql = require('mysql'); 
const {promisify} = require('util')

const {database} = require('./keys') //Require the access of database

const pool = mysql.createPool(database); //Create connection

pool.getConnection((err, connection) => {
    
    if(err){

        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED')

        } else if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MAY CONNECTIONS')

        } else if(err.code === 'ECONNREFUSED'){
            console.error('THE CONNECTION WAS REFUSED')
        }

    }
    
    if(connection){ connection.release();
    console.log('DB is connected');
    return;
    }
}); //Always Run connection to the database

//Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;  