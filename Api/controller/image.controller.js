const jwt = require('jsonwebtoken');
const multer = require("multer")
const fs = require('fs');
const mongoose = require('mongoose')
const User = require('./../model/image.model')

const SECRET = 'secret';
// const users = [
//   { id: 1, email: 'user1@example.com', password: 'password1', name: 'User 1' },
//   { id: 2, email: 'user2@example.com', password: 'password2', name: 'User 2' },
//   { id: 3, email: 'user3@example.com', password: 'password3', name: 'User 3' },
//   { id: 4, email: 'user4@example.com', password: 'password4', name: 'User 4' },
//   { id: 5, email: 'user5@example.com', password: 'password5', name: 'User 5' },
//   { id: 6, email: 'user6@example.com', password: 'password6', name: 'User 6' },
  
// ];


exports.signUp = async function(req,res){
 
 const {firstName,lastName,email,password} = req.body;

  const user = new User({
    firstName,
    lastName,
    email,
    password,
  });
  const checkemail = await User.findOne({email:email})
  if(!checkemail){
    await user.save()
    res.status(200).json({
      message: "signUp succesful"
    })
  }else{
    res.json({
    message: "Email already Exist"
    })
  }

}

exports.login = async function(req,res){
    const  email = req.body.email;
    const password = req.body.password;
        // check if the user exists
        const user = await User.findOne({ email: email });
        if (user) {
          //check if password matches
          const result = password === user.password;
          if (result) {
           
            const token = jwt.sign({ email: user.email }, SECRET );
             res.json({ 
                      message: "Login Succesfull",
                          token });
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      
    
}

exports.upload = async function(req,res){
  const image = req.data;
  const update = await User.updateOne({email: email}, {
    image : image
  })

    res.status(200).json({
        message: "Image is Uploaded",
      });
}

exports.getImages = async function(req,res){
          const data = await User.findOne({email: email});
          if(data){
            res.status(200).json({
              message : "Profile Data",
              data
            })
          }else{
            res.send("No Profile Found")
          }
        }

exports.setting =  function(req,res){
    User.findOneAndUpdate({ email: email }, { $set:{ 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email:  req.body.email,
    password: req.body.password
 }}, { returnOriginal: false }, (err, result) => {
        if (err) {
          console.log('Error updating user profile:', err);
          res.status(500).json({ success: false, message: 'Error updating user profile' });
        } else {
          res.json({ success: true, message: 'User profile updated successfully', data: result });
        }
      });
 
}
