const pool = require('../database');

class fastnoteController {

    async dashboard(req, res) {

        try {

            const { idUser } = req.body;
            const notes = await pool.query('select * from fastnotes where user_id = ? and removed = 0 order by id desc limit 4;', [idUser])

            const allnote = await pool.query('select count(*) as total from fastnotes where user_id = ? and removed = 0', [idUser]);

            const recycle = await pool.query('SELECT COUNT(*) AS totalrecycle FROM fastnotes WHERE removed = 1 AND removed_com = 0 and user_id = ?', [idUser]);

            const signature = await pool.query('SELECT COUNT(*) AS totalsignature FROM subjects where user_id = ? and removed = 0', [idUser])


            res.status(200).json([notes, allnote[0], recycle[0], signature[0]])

        } catch (error) {
            res.status(200).json("Lo sentimos, ha ocurrido un error, contacte con el administrador del sistema")
        }
    }


    async showfastnote(req, res) {

        try {

            const { idUser } = req.body;

            const notes = await pool.query(`select * from fastnotes where user_id = ? and removed = 0 group by id desc;`, [idUser]);

            const userdesign = await pool.query('select design_note from users where id = ?', [idUser])
            return res.status(200).json([notes, userdesign]);

        } catch (error) {
            console.log(error)
            res.render('./partials/errorserver');
        }

    }

    async show_description(req, res) {

        const { idnote } = req.body
        const text_signature = await pool.query('Select id, description, title from fastnotes where id = ?', [idnote]);

        return res.status(200).json(text_signature)

    }


    async post_addfastnote(req, res) {

        try {

            const { idUser, title, description } = req.body
            const user_id = idUser
            const data = {

                title,
                description,
                user_id,
                create_at: Date

            }

            await pool.query('insert into fastnotes set ?', [data]);

            const confirmationCode = 1048;
            res.status(200).json(confirmationCode)


        } catch (error) {

            console.log(error)

            const confirmationCode = 0;
            res.status(200).json(confirmationCode)

        }

    }

    async editfastnote(req, res) {

        try {

            const { idNote } = req.body;
            const note = await pool.query('select id, description, title from fastnotes where id = ?', [idNote])
            return res.status(200).json(note);

        } catch (error) {
            console.log(error)
        }

    }

    async updatefastnote(req, res) {


        try {

            const { idNote, title, description } = req.body;
            const note = await pool.query('update fastnotes SET title = ?, description = ? where id = ?', [title, description, idNote])

            const confirmationCode = 1048;
            res.status(200).json(confirmationCode)

        } catch (error) {

            console.log(error)
            const confirmationCode = 0;
            res.status(200).json(confirmationCode)

        }

    }

    async deletefastnote(req, res) {

        try {

            const { idnote } = req.body;
            const note = await pool.query('update fastnotes set removed = 1 where id = ?', [idnote])
            const confirmationCode = 1048;
            return res.status(200).json(confirmationCode)

        } catch (error) {

            console.log(error)

        }

    }

    async deleted_notes(req, res) {

        try {

            const { idUser } = req.body;
            const deleted_note = await pool.query("select * from fastnotes where user_id = ? and removed = 1 and removed_com = 0", [idUser]);
            return res.status(200).json(deleted_note);

        } catch (error) {

            console.log(error)

        }

    }

    async change_theme(req, res) {

        try {

            const { idUser, themecode } = req.body;
            const change_theme = await pool.query('UPDATE users SET design_note = ? WHERE id = ?', [themecode, idUser]);

        } catch (error) {

            console.log(error)

        }
    }

    async restore_note(req, res) {

        try {

            const { idNote } = req.body;

            const restore = await pool.query('update fastnotes set removed = 0 where id = ?', [idNote]);
            const confirm = 1048;
            res.status(200).json(confirm);

        } catch (error) {

            console.log(error)

        }


    }

    async removed_complete(req, res) {

        try {

            const { idUser } = req.body;
            console.log(idUser)

            const removed_comp = await pool.query('UPDATE fastnotes SET removed_com = 1 WHERE user_id = ? and removed = 1', [idUser]);
            const confirm = 1048;
            res.status(200).json(confirm);

        } catch (error) {

            console.log(error);

        }


    }

}


module.exports = fastnoteController;