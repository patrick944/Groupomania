const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE, 
});

exports.login = async(req,res) =>{
    try{
        const{email,password} = req.body 
        if(!email || !password){
            return res.status(400).render('login',{
                message:'please provide an email and password'
            })
        } 
        db.query('SELECT* FROM USERS WHERE email =?',[email],async(error,results) =>{
            if(!results || !(await bcrypt.compare(password,results[0].password))){
                res.status(401).render('login',{
                    message:'Email or password is incorrect'
                })
            }else{
                const id = results[0].id;
                const token = jwt.sign({id},process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_SECRET_IN
                });
                console.log('The token is:'+ token);
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
                    ),
                    httpOnly:true
                }
                res.cookie('jwt' ,token,cookieOptions);
            }
        });
    } catch(error){
        console.log(error);
    }
}

exports.register = (req, res) => {

  console.log('REQ BODY',req.body)

 

  const { firstname, lastname, password,passwordConfirm, Email } = req.body

  if (password !== passwordConfirm) {

    return res.render('register', {

      message: 'Password do not match'

    })
    }

  db.query('SELECT email FROM users WHERE email = ?', [Email], async (error, results) => {

    if(error) {

      console.log(error)

    }


    if (results.length > 0) {

      return res.render('register', {

        message: 'That email is already in use'

      })

    }

    let hashedPassword = await bcrypt.hash(password, 8)

    console.log(hashedPassword)


    //res.send('testing')               firstname, lastname, password,passwordConfirm, Email

    db.query('INSERT INTO users SET ?', {First_Name: firstname, Last_Name: lastname, email: Email, password: hashedPassword }, (error, results) => {

      if(error) {

        console.log(error)

      } else {

        return res.render('register', {

          message: 'User registered'

        })

      }

    })

  })




  //res.send('Form submitted')

}
