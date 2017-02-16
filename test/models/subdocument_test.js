const assert = require('assert');
const User = require('../../server/models/user');

describe('Subdocuments',function(){


  it('can create a subdocument',function(done){

    //tp insure that a new post was saved correctly
    //find the created user
    //look up the property with the subdocument
    //check for saved values
    const preston = new User();

    preston.save({
      email: 'asdfasdf@gmail.com',
      password:'123123123456',
      ZillowHomeQueries:[
        {
          propertyID:'3134',
          Address:' 1234 Whatevas St',
          City: 'YayArea',
          State: 'CA',
          ZipCode:  '94109',
          Room: 20,
          Bath: 3,
          AskingPrice: 333434,
          MarketValue: 1200000,
          LastSoldDate: '01012017',
          LastSoldAmount:60000,
          YearBuilt: '1989',
          SqFootage:4567,
          UseCode: 'MultiFamily2To4',
        }
      ]
    })
      .then(
        ()=>{
            console.log('saved Preston')
           User.findOne({email:'asdfasdf@gmail.com'})
        }

      )
      .then(
        (user)=>{
        console.log(user);
          assert(user.ZillowHomeQueries[0].propertyID==='3134')
          done()
         }
    )


  })
})
