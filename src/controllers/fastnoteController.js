const pool = require('../database');

class fastnoteController {

    async dashboard(req, res) {

        try {

            const {idUser} = req.body;
            const notes = await pool.query('select * from fastnotes where user_id = ? and removed = 0 order by id desc limit 5;', [idUser])

            const allnote = await pool.query('select count(*) as total from fastnotes where user_id = ?', [idUser]);

            res.status(200).json([notes, allnote[0]])

        } catch (error) {
            res.status(200).json("Lo sentimos, ha ocurrido un error, contacte con el administrador del sistema")
        }
    }


    async showfastnote(req, res) {

        try {

            const { idUser } = req.body;

            const notes = await pool.query(`select * from fastnotes where user_id = ? and removed = 0 group by id desc;`, [idUser]);

            return res.status(200).json(notes)

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

        }

    }

    async editfastnote(req, res){

        try {

            const { idSignature } = req.body;
            const signature = await pool.query('select id, description, title from fastnotes where id = ?', [idSignature])
            return res.status(200).json(signature);
            
        } catch (error) {

            console.log(error)
            
        }



    }

}


module.exports = fastnoteController;