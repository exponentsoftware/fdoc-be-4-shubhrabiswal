const User = require('../model/User')
const Todo = require('../model/Todo')

const success = {
    error: null,
    message: "Task done successfully"
}
const failure = {
    data: null,
    message: "Error while fetching data"
}

const no_data = {
    error: null,
    message: "Not present in database"
}
const exists = {
    error: null,
    message: "Already present in database"
}

// exports.adduser = async (req, res) => {

//     try {
//         let user = await User.findOne({ email: req.body.email })
//         // console.log(user.user_name)
//         if (!user) {
//             let new_user = await new User(req.body).save()
//             return res.status(200).send({
//                 error: null,
//                 data: new_user,
//                 message: "User created successfully"
//             })
//         }else{
//             return res.status(200).send(exists)
//         }

//     } catch (err) {
//         return res.status(400).send({failure,error: err.message})
//     }

// };
exports.adduser = async (req, res) => {
    const { body: { user } } = req;
    console.log(user)
    try {
        // let new_user = await new User(req.body)
        // // new_user.password = User.setPassword(new_user.password)
        // new_user.password = new_user.setPassword(new_user.password)
        // console.log(new_user.password)
        // new_user.save()
        // return res.status(200).json({
        //     error: null,
        //     message: "Sign up Successfull",
        //     user: new_user.toAuthjson()
        // })

        let new_user = await new User(user)
        new_user.setPassword(user.password)
        new_user.save()
        res.status(200).json({user:new_user.toAuthJSON()})
    } catch (err) {
        return res.status(400).send({ failure, error: err.message })
    }

};

exports.signin = async (req, res) => {
    // const { body: { user } } = req;
    try{
        if(!req.body.email || !req.body.password){
            return res.status(400).send({message:'One or more fields missing'})
        }
        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
            if(err) {
              return next(err);
            }
        
            if(passportUser) {
              const user = passportUser;
              user.token = passportUser.generateJWT();
        
              return res.json({ user: user.toAuthJSON() });
            }
        
            return status(400).info;
          })
        // let user = User.findOne({email:req.body.email},{password:req.body.password})

    }
    catch{

    }
}

exports.getalltodo = async (req, res) => {
    try {
        let id = req.params.id
        let user = await User.findById({ _id: id });
        // console.log(user.role)
        if (user.role == "admin") {
            let all_todo = await Todo.find()
            return res.status(200).send({ success, data: all_todo })
        }
        if (user.role == "app_user") {
            let todo = await Todo.find({ user_name: id });
            console.log(todo)
            return res.status(200).json({ success, data: todo })
        }
    } catch (err) {
        return res.status(400).send({ failure, error: err.message })
    }
};




