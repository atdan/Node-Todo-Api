const {SHA256} = require(`crypto-js`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);

// const message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//     id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + `secret`).toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + `secret`).toString();
//
// if (resultHash === token.hash){
//     console.log("Data was not changed")
// }else {
//     console.log('Data was changed dont trust');
// }


// var data = {
//     id: 10
// };
//
// var token = jwt.sign(data, '123abc');
//
// console.log(token);
// var decoded= jwt.verify(token, '123abc');
//
// console.log(decoded);


var password = '123abc';
// //hash the password
//
// bcrypt.genSalt(10, (er, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     })
// });

var hashedPassword = '$2a$10$gTfNxHcVWo/HsLNp0e9.gO4O3.uq94olkNAGB2xGDXf/9FsPngLrC';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res)
})