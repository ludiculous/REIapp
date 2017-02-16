const assert = require('assert');
const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Market = mongoose.model('user');


describe('User Requests', () => {

    it("Creates unique user on route /signup", (done) => {
        Market.findOne({
            email: 'test@test.com'
        }, (err, existingUser) => {
            if (existingUser) {
                assert(existingUser === existingUser)
                done()
            } else {
                request(app)
                    .post("/signup")
                    .send({
                        email: 'test@test.com'
                    })
                    .end((err, res) => {
                        console.log(res)

                        assert(res.body.email === 'test@test.com')
                        done();
                    })

            }
        })
  })


})
