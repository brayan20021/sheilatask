//Contect the database
const pool = require('../database');

class tasksController  {

   async dashboard(req, res){
    
    res.render('./admin/dashboard');

    }

    async signature (req, res){

        try {

            const user = req.user.id;
            const signature = await pool.query(`select subjects.id, subjects.name, count(*) as total_task,  subjects.user_id from tasks
                right join subjects on subjects.id = tasks.subject_id
                where subjects.user_id = ${user} group by name;
                `);
            res.render('./admin/subject', { signature: signature });
    
        } catch (error) {
    
            res.render('./partials/errorserver');
        }

    }

    async post_addsignature (req, res){

        try {

            const { name } = req.body;
            const user = req.user.id
            const save = {
                name,
                'user_id': user,
            }
            await pool.query("insert into subjects set ?", [save]);
            req.flash('success', 'Asignatura guardado correctamente');
            res.redirect('/signature');
    
        } catch (error) {
            res.render('./partials/errorserver');
        }

    }

     async showsignature(req, res){

        try {

            const { idsignature } = req.params
            const signature = await pool.query('Select * from tasks where eliminado = 0 and subject_id = ?', [idsignature]);
    
            res.render('./admin/signaturelist', { signature: signature, idsignature });
    
        } catch (error) {
    
            res.render('./partials/errorserver');
            console.log(error)
    
        }

    }

    async addnote(req, res){
        
        const { signatureid } = req.params;
        res.render('./admin/add', { signatureid });

    }

    async editnote(req, res){

        try {

            const { id } = req.params;
            const task = await pool.query('SELECT * FROM tasks WHERE ID = ?', [id]);
            res.render('./admin/edit', { task: task[0] });
    
        } catch (error) {
    
            res.render('./partials/errorserver');
    
        }

    }

    async post_editnote(req, res){
        
        try {

            const { id } = req.params;
            const { title, description, dueDate, signature } = req.body;
            const newtask = {
                title,
                description,
                dueDate
            }
    
            await pool.query('UPDATE tasks SET ? where id = ?', [newtask, id]);
    
            req.flash('success', "Tarea actualizado correctamente")
            res.redirect(`/signaturelist/${signature}`);
    
        } catch (error) {
    
            res.render('./partials/errorserver');
    
        }
        
    }

    async deletenote(req, res){
        
        try {

            const { id } = req.params
            const signatureid = await pool.query('SELECT * from tasks where id = ?', [id])
            await pool.query('UPDATE tasks SET eliminado = 1 where id = ?', [id]);
            req.flash('success', 'Tarea removida correctamente');
            res.redirect(`/signaturelist/${signatureid[0].subject_id}`);
           

        } catch (error) {

            res.render('./partials/errorserver');
            console.log(error)

        }

    }


    async post_addnote(req, res){
        
        try {

            const { title, url, description } = req.body;
            const { signatureid } = req.params
            const newlink = ({
                title,
                description,
                'subject_id': signatureid,
            });
    
            await pool.query("insert into tasks set ?", [newlink]);
            req.flash('success', 'Tarea guardado correctamente');
            res.redirect(`/signaturelist/${signatureid}`);
    
        } catch (error) {
            res.render('./partials/errorserver');
        }

    }


}

module.exports = tasksController;