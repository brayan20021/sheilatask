const pool = require('../database');

class fastnoteController {


    async showfastnote(req, res){

        try {

            task = await pool.query(`select tasks.id, tasks.title, tasks.description, tasks.dueDate, tasks.createdAt, tasks.updatedAt, status.nombre as statusnombre from tasks
            inner join status on tasks.status_id = status.id where eliminado = 0;`);
            console.log(task);
            res.render('./admin/list', { datos: task });
    
        } catch (error) {
            res.render('./partials/errorserver');
        }

    }



}


module.exports = fastnoteController;