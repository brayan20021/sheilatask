//Contect the database
const pool = require('../database');

//global bar 
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

const currentdate = `${year}-${month}-${day}`;



class tasksController {

    async signature(req, res) {

        try {

            const { idUser } = req.body

            const signature = await pool.query(`select subjects.id, subjects.name, count(*) as total_task, currentdate, subjects.user_id from tasks
            right join subjects on subjects.id = tasks.subject_id
            where subjects.user_id = ${idUser} and removed = 0 group by name;
            `);

            return res.status(200).json(signature);

        } catch (error) {

            console.log(error)

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
            const signatueData = await pool.query("SELECT * from subjects where user_id = ? ORDER BY id DESC LIMIT 1", [idUser])
            const confirmationCode = [signatueData, 1048];
            res.status(200).json(confirmationCode)

        } catch (error) {

            console.log(error)

        }

    }

    async post_updatesignature(req, res) {

        try {

            const { id, newName } = req.body;
            const signature = await pool.query('update subjects set name = ? where id = ?', [newName, id]);
            const confirmationCode = 1048;
            res.status(200).json(confirmationCode)

        } catch (error) {

            console.log(error)

        }

    }

    async editsignature(req, res) {

        try {

            const { idSnote } = req.body

            const signature = await pool.query('select * from tasks where id = ?', [idSnote])
            res.status(200).json(signature)


        } catch (error) {

            console.log(error)

        }

    }

    async updatesignature(req, res) {

        try {

            const { idSnote, description, title } = req.body;
            const signature = pool.query('update tasks SET description = ?, title = ? where id = ?', [description, title, idSnote])

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

    async showNotesignature(req, res) {

        try {

            const { idsignature, idUser } = req.body
            const signature = await pool.query('Select * from tasks where eliminado = 0 and subject_id = ? and user_id = ? order by complete', [idsignature, idUser]);

            return res.status(200).json(signature);

        } catch (error) {

            console.log(error)

        }

    }

    async deleteNotesignature(req, res) {

        try {

            const { id } = req.body;
            const note = await pool.query("update tasks set eliminado = 1 where id = ?", [id])

            const confirmationCode = 1048
            res.status(200).json(confirmationCode);

        } catch (error) {

            console.log(error)

        }

    }

    async showTextsignature(req, res) {

        try {

            const { idsignature } = req.body
            const text_signature = await pool.query('Select id, description, title from tasks where id = ?', [idsignature]);

            return res.status(200).json(text_signature)

        } catch (error) {

            console.log(error)

        }

    }

    async post_signatureNote(req, res) {

        try {

            const { idUser, title, description, idsignature } = req.body;
            const data = {
                user_id: idUser,
                title,
                description,
                subject_id: idsignature
            }
            const signature_note = await pool.query('insert into tasks set ?', [data]);
            const note = await pool.query("select * from tasks where subject_id = ? order by id desc limit 1 ", [idsignature])
            const confirmationCode = [note, 1048];
            res.status(200).json(confirmationCode);

        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = tasksController;