const expect = require('chai').expect
const axios = require('axios')
const baseurl = 'http://localhost:8080/'
require('dotenv').config()
const configHeaders = {
    headers: {
        'Authorization': 'Bearer ' + process.env.TEST_JWT_TOKEN,
    }
}

describe('USER API TEST', () => {

    it('USER SIGNUP - Provided user details, if email doesnot exist user should be registered to the database else should throw msg for user exist', async () => {
        const SignUpTestData = {
            fullname: 'Bibash kattel',
            phonenumber: '7585731309',
            email: 'kattelb@uni.coventry.ac.uk',
            address: '17 sandy lane cv1 4ex',
            password: 'Bibash',
        }

        const response = await axios.
            post(baseurl + 'user', SignUpTestData)

        expect(response.data).to.have.property('success')
        expect(response.data).to.have.property('msg')
        expect(response.data.msg).to.equal('New User registered successfully')
        expect(response.data.success).to.equal(true)

    });

    it('USER SIGNIN -Provided email and password, if email and password matches, it should send user details along token, else throw msg for failed login', async () => {
        const SignInTestData = {
            email: 'bibash2020@outlook.com',
            password: 'Bibash',
        }

        const response = await axios.
            post(baseurl + 'user/signin', SignInTestData)

        expect(response.data).to.have.property('success')
        expect(response.data).to.have.property('msg')
        expect(response.data).to.have.property('token')
        expect(response.data.success).to.equal(true)
        expect(response.data.msg).to.equal('Welcome ' + response.data.data.fullname)

    });

    it('RETRIVE LOGGED IN USER DATA- Provided authorization token and userid, if user exist it should send user details, else throw msg for data not found', async () => {
        const TestLoggedInUserData='635b06e224ae4c85d82749c9';
       
        const response = await axios.
            get(baseurl + 'user/'+TestLoggedInUserData, configHeaders)

        expect(response.data).to.have.property('success')
        expect(response.data).to.have.property('msg')
        expect(response.data).to.have.property('data')
        expect(response.data.success).to.equal(true)
        expect(response.data.msg).to.equal('User found ' + response.data.data.fullname)

    });

    it('UPDATE USER PROFILE - Provided authorization token, userid and user data, if id exist it should update user details, else throw msg for data not found', async () => {
        const UserIdToUpdateProfile='635b06e224ae4c85d82749c9';
        const TestDataForUserProfileUpdate= {
            fullname: 'Bibash kkkk',
            phonenumber: '4563201258',
            address: 'Coventry university'
        }
        const response = await axios.
            put(baseurl + 'user/'+UserIdToUpdateProfile, TestDataForUserProfileUpdate, configHeaders)

        expect(response.data).to.have.property('success')
        expect(response.data).to.have.property('msg')
        expect(response.data.success).to.equal(true)
        expect(response.data.msg).to.equal('Profile updated successfully ')

    });

    it('LOAD USER WALLET - Provided authorization token, userid and amount to load, if id exist it should update and sumup the total amount of user, else throw error msg ', async () => {
        const UserIdToUpdateWallet= '635b06e224ae4c85d82749c9';
        const TestDataToUpdateWallet={
            totalamount: '15.6'
        }
        const response = await axios.
            put(baseurl + 'user/'+UserIdToUpdateWallet, TestDataToUpdateWallet, configHeaders)

        expect(response.data).to.have.property('success')
        expect(response.data).to.have.property('msg')
        expect(response.data.success).to.equal(true)
        expect(response.data.msg).to.equal('You have successfully loaded GBP '+TestDataToUpdateWallet.totalamount)

    });

    it('VERIFY QR CODE - Provided authorization token, sender id and recipient id, if both sender and recipient exist, it should return qr verified message else throw msg for either sender or recipient doesnot exist or 500 status code error', async () => {
     
        const TestDataToVerifyQRCode={
            receipentid: '635b06e224ae4c85d82749c9',
            senderid:'635b091024ae4c85d82749d7'
        }
        const response = await axios.
            post(baseurl + 'user/verifyqrdata', TestDataToVerifyQRCode, configHeaders)

        expect(response.data).to.have.property('success')
        expect(response.data).to.have.property('msg')
        expect(response.data).to.have.property('recipientdata')
        expect(response.data).to.have.property('senderdata')
        expect(response.data.success).to.equal(true)
        expect(response.data.msg).to.equal('QR verified ')

    });

    it('SIGNIN OR SIGNUP WITH GOOGLE - Provided email with domain @gmail.com if email exist it should return user exist with user data, else it should register user and return new user signup message along with signedup data and send email ', async () => {
     
        const TestDatForGoogleSignInSignUp={
            email: 'bibashkatel44@gmail.com',
            fullname:'Test name'
        }
        const response = await axios.
            post(baseurl + 'user/signinorsignupgoogleuser', TestDatForGoogleSignInSignUp)

        expect(response.data).to.have.property('success')
        expect(response.data).to.have.property('msg')
        expect(response.data).to.have.property('token')
        expect(response.data).to.have.property('data')
        expect(response.data.success).to.equal(true)
        expect(response.data.msg).to.equal('User already exist')

    });

     it('SEND EMAIL - Provided authorization token, email, subject and description, if email is valid is should return email sent message, else  throw error message', async () => {
     
        const TestDatForSendingEmail={
            email: 'bibashkatel4@gmail.com',
            subject:'Test subject',
            description:'Test description'
        }
        const response = await axios.
            post(baseurl + 'user/sendemail', TestDatForSendingEmail, configHeaders)

        expect(response.data).to.have.property('success')
        expect(response.data).to.have.property('msg')
        expect(response.data.success).to.equal(true)
        expect(response.data.msg).to.equal('Email sent successfully, check your inbox')

    });

});


describe('TRANSACTION API TEST', () => {

    it('MAKE TRANSACTION - Provided authorization token, sender and receipient id, amount and remarks , it should increase the total amount of recipient and deduct same amount of sender and both of them should receive email notification, else throw error message', async () => {
        const UserIdToUpdateWallet= '635b06e224ae4c85d82749c9';

        const TestMakeTransActionData = {
            sender: '636813d250ef2dff1f75214c',
            recipient: '6367ff93f7c1ea65b3abdca3',
            amount: 5,
            remarks: "Testing transaction"
        }

        const response = await axios.
            post(baseurl + 'transaction', TestMakeTransActionData, configHeaders)

        expect(response.data).to.have.property('success')
        expect(response.data).to.have.property('msg')
        expect(response.data).to.have.property('recipientdata')
        expect(response.data).to.have.property('senderdata')
        expect(response.data.msg).to.equal('You have successfully sent GBP '+TestMakeTransActionData.amount +' to '+ response.data.recipientdata.fullname)
        expect(response.data.success).to.equal(true)

    });

    it('GET USERS TRANSACTIONS LIST FOR STATEMENT - Provided authorization token, userid it should return all the transcation made by particular user, else throw message for transcation not found', async () => {
        const TestUserIdForRetrivingTranscationList = '636813d250ef2dff1f75214c'

        const response = await axios.
            get(baseurl + 'transaction/getall/'+TestUserIdForRetrivingTranscationList,  configHeaders)

        expect(response.data).to.have.property('success')
        expect(response.data).to.have.property('msg')
        expect(response.data).to.have.property('data')
        expect(response.data.msg).to.equal('Successfully retrived transaction')
        expect(response.data.success).to.equal(true)

    });

});
