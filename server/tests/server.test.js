const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {userSchema} = require('./../../models/user');

beforeEach((done) => {
    userSchema.remove({}).then(() => done());
});

describe('POST /signup', () => {
    it('Should create a new user', (done) => {
        var firstName = 'Abdul';
        var lastName = 'Hameed';
        var email = 'abdul@trailay.com';
        var password = 'r43ufe4@fdf';
        var phone = '0300-12345467';

        request(app)
        .post('/signup')
        .send({
            firstName, lastName, email, password, phone
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.firstName).toBe(firstName)
            expect(res.body.lastName).toBe(lastName)
            expect(res.body.email).toBe(email)
            expect(res.body.password).toBe(password)
            expect(res.body.phone).toBe(phone)
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }

            userSchema.find().then((userSchemas) => {
                expect(userSchemas.length).toBe(1);
                expect(userSchemas[0].lastName).toBe(lastName);
                done();
            }).catch((e) => done(e));
        });
    });
});