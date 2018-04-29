const { makeExecutableSchema } = require ('graphql-tools');
const { find, filter } = require ('lodash');

const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLOutputObjectType } = require( 'graphql');

const fetch = require('node-fetch')
const util = require('util')
// const parseXML = util.promisify(require('xml2js').parseString)
const toJs = require('xml2js').parseString
const parseXML = util.promisify(require('xml2js').parseString)




// const openData = fetch('https://www.opensecrets.org/api/?method=candContrib&cid=N00007360&cycle=2018&apikey=7373806f1f70c947ad5317f33987630f')
// .then(response => {
    

    
//     return response.text()

// })
// .then(parseXML)
// .then((result) =>{
//     console.log(result.response.contributors[0])
// })

// const legislatorData =  fetch(`http://www.opensecrets.org/api/?method=getLegislators&id=MA&apikey=7373806f1f70c947ad5317f33987630f`)
// .then(response => response.text())
// .then(parseXML)
// .then((result) =>{
//     console.log(result.response.legislator)
// })





const typeDefs = `


type StateLegislators {
    legislators: [Legislator] # the list of Legislators in State

}

type Legislator {
    cid: String
    firstlast: String
    party: String
    phone: String
    first_elected: String



}


 # the schema allows the following query:

type Query {

    legislatorsByState(state:String): [StateLegislators]
    



}
`



const resolvers = {
    Query: {
          legislatorsByState:   (obj, state) => fetch(`http://www.opensecrets.org/api/?method=getLegislators&id=${state.state}&apikey=7373806f1f70c947ad5317f33987630f`)
.then(response => response.text())
.then(parseXML)
.then(result =>
    result.response.legislator
)
.then(result => result.map(e => e.$))
.then(result => result)


},


StateLegislators: {
    legislators: (obj) => [{ cid: obj.cid, firstlast: obj.firstlast, party: obj.party, phone: obj.phone, fist_elected:obj.first_elected}]
},
  
Legislator: {

    cid: obj => obj.cid,
    firstlast: (obj) => obj.firstlast,
    party: (obj) => obj.party,
    phone: (obj) => obj.phone,
    first_elected: (obj) => obj.first_elected


},



}



const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


module.exports = schema






















// const LegislatorType = new GraphQLObjectType({
//     name: 'LegislatorType',
//     description: 'is this getting called?',

//     fields:   () =>  ({

    
//         cid:{
//             type:GraphQLString,
//             args:{
//                 cid: {
//                 type:GraphQLString
//                 }
//             },
            
//             resolve: async (xml, args )=>
//                    { const obj = await xml.response.legislator.filter(element => {
//                        return element.$.cid === args.cid
//                     })[0]
//                     return obj.$.cid
                
//                 }

                    
//                    // xml.response.legislator.$
        
        
        

            
//         },

//         firstLast:{
//             type:GraphQLString,
//             args:{
//                 cid: {
//                 type:GraphQLString
//                 }
//             },
            
//             resolve:   async (xml, args )=>
//             { const obj = await xml.response.legislator.filter(element => {
//                 return element.$.cid === args.cid
//              })[0]
//              return obj.$.firstlast
         
//          }
            

            
//         },
       
//         party:{
//             type: GraphQLString,
//             args:{
//                 cid: {
//                 type:GraphQLString
//                 }
//             },
//             resolve:   async (xml, args )=>
//             { const obj = await xml.response.legislator.filter(element => {
//                 return element.$.cid === args.cid
//              })[0]
//              return obj.$.party
         
//          }
            

//         },
//         phone:{
//             type: GraphQLString,
//             args:{
//                 cid: {
//                 type:GraphQLString
//                 }
//             },
//             resolve:   async (xml, args )=>
//             { const obj = await xml.response.legislator.filter(element => {
//                 return element.$.cid === args.cid
//              })[0]
//              return obj.$.phone
         
//          }
//         },
//         first_elected:{
//             type: GraphQLInt,
//             args:{
//                 cid: {
//                 type:GraphQLString
//                 }
//             },
//             resolve:   async (xml, args )=>
//             { const obj = await xml.response.legislator.filter(element => {
//                 return element.$.cid === args.cid
//              })[0]
//              return Number(obj.$.first_elected)
         
//          }
//         }

//     })



// })



// // const LegislatorsObj = new GraphQLObjectType({

// //     name: 'legislatorByState',
// //     description: '...',

// //     fields: () => ({
// //         legislatorById:{
// //             type:GraphQLObjectType,
// //             args:{
// //                 cid: {
// //                     type:GraphQLString}
// //             },

            
// //             resolve: (xml, args ) =>
// //             xml.legislator.filter(legismatch => {
// //                 console.log(legismatch.$.cid )
// //                 return legismatch.$.cid === args.cid
                
// //             })[0]
// //         },
        

// //     })



// // })





// module.exports = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'Query',
//         description:'Schema of Legislators by State',

//         fields:() => ({
//             legislatorsByState:{
//                 type: LegislatorType,
//                 args:{
//                     state: {type:GraphQLString}
//                 },
//                 resolve: (root, args) => 
//                     // console.log('hello??')
//                     // const xml = await fetch(`http://www.opensecrets.org/api/?method=getLegislators&id=MA&apikey=7373806f1f70c947ad5317f33987630f`)
//                     // xml = xml.text()
//                     // const result = await parseXML(xml)
//                     // await console.log(result, "this getting called???")
//                     //return "something"

//                     fetch(`http://www.opensecrets.org/api/?method=getLegislators&id=${args.state}&apikey=7373806f1f70c947ad5317f33987630f`)
//                     .then(response => response.text())
//                     .then(parseXML)
                   
                   
                
               

//             }

//         })
//     })
// })









