//Contect the database
const pool = require('../database');

//global bar 
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
const day = String(currentDate.getDate()).padStart(2, '0');

const currentdate = `${year}-${month}-${day}`;



class tasksController {

    async dashboard(req, res) {

        res.render('./admin/dashboard');

    }

    async signature(req, res) {

        try {
            const { idUser } = req.body

            const signature = await pool.query(`select subjects.id, subjects.name, count(*) as total_task, currentdate, subjects.user_id from tasks
            right join subjects on subjects.id = tasks.subject_id
            where subjects.user_id = ${idUser} and removed = 0 group by name;
            `);

            return res.status(200).json(signature);
            //res.render('./admin/subject', { signature: signature });

        } catch (error) {

            res.render('./partials/errorserver');
        }

    }

    async post_addsignature(req, res) {

        try {

            const { name, idUser } = req.body
            
            const save = {
                name,
                currentdate,
                user_id: idUser
            }
            
            const signature = await pool.query("insert into subjects set ?", [save]);
            const confirmationCode = 1048;
            res.status(200).json(confirmationCode)

        } catch (error) {
            console.log(error)
        }

    }

    async post_updatesignature(req, res) {

        try {

            const { id, newName } = req.body;
            console.log(req.body)
            const signature = await pool.query('update subjects set name = ? where id = ?', [newName, id]);
            const confirmationCode = 1048;
            res.status(200).json(confirmationCode)

        } catch (error) {
            console.log(error)
        }


    }

    async post_deletesignature(req, res) {

        try {

            const { id } = req.body;
            const subject = await pool.query('update subjects set removed = 1 where id = ?', [id]);
            const confdata = 1048;
            res.status(200).json(confdata)

        } catch (error) {
            console.log(error)
        }

    }

    async showsignature(req, res) {

        try {

            const { idsignature } = req.body
            const signature = await pool.query('Select * from tasks where eliminado = 0 and subject_id = ? order by complete', [idsignature]);

            return res.status(200).json(signature);

            //res.render('./admin/signaturelist', { signature: signature, idsignature });

        } catch (error) {

            res.render('./partials/errorserver');
            console.log(error)

        }

    }

    async showTextsignature(req, res) {

        const { idsignature } = req.body
        const text_signature = await pool.query('Select description, title from tasks where id = ?', [idsignature]);

        return res.status(200).json(text_signature)
    }

    async addnote(req, res) {

        const { signatureid } = req.params;
        res.render('./admin/add', { signatureid });

    }

    async editnote(req, res) {

        try {

            const { id } = req.params;
            const task = await pool.query('SELECT * FROM tasks WHERE ID = ?', [id]);
            res.render('./admin/edit', { task: task[0] });

        } catch (error) {

            res.render('./partials/errorserver');

        }

    }



    async post_editnote(req, res) {

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

    async post_deletenote(req, res) {

        try {

            const id = req.body.data
            const signatureid = await pool.query('SELECT * from tasks where id = ?', [id])
            await pool.query('UPDATE tasks SET eliminado = 1 where id = ?', [id]);
            req.flash('success', 'Tarea removida correctamente');
            res.redirect(`/signaturelist/${signatureid[0].subject_id}`);

        } catch (error) {

            res.render('./partials/errorserver');
            console.log(error)

        }

    }


    async post_addnote(req, res) {

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

    async finishtask(req, res) {

        const { id } = req.params;

        const task = await pool.query('select * from tasks where id = ?', [id]);
        console.log(task)
        const signature = task[0].subject_id;

        await pool.query('update tasks set complete = 1 where id = ?', [id]);

        res.redirect(`/signaturelist/${signature}`)

    }

}

module.exports = tasksController;