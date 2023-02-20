import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();





// });

const testCases = [

  {
    Booked_cabin: "Economy", Email: "abhishek@zzz.com", Fare_Class: "F", First_name: "Abhishek ", Id: "1", Last_name: "Kumar", Mobile_phone: "9876543210", PNR: "ABC123", Pax: "2", Ticketing_Date: "5/21/2019", Travel_date: "7/31/2019"
  },
  { Booked_cabin: "Economy", Email: "monin@zzz.com", Fare_Class: "C", First_name: "Monin", Id: "2", Last_name: "Sankar", Mobile_phone: "9876543211", PNR: "PQ234", Pax: "2", Ticketing_Date: "5/22/19", Travel_date: "8/30/19" },
  {
    Booked_cabin: "Business", Email: "radhika@zzz", Fare_Class: "T", First_name: "Radhika", Id: "3", Last_name: "Suresh", Mobile_phone: "9876543212", PNR: "ZZZ345", Pax: "4", Ticketing_Date: "5/21/19", Travel_date: "5/31/19"
  },

  {
    Booked_cabin: "Premium Economy", Email: "kben@zzz.com", Fare_Class: "M", First_name: "Kalyani", Id: "4", Last_name: "Ben", Mobile_phone: "9876543213", PNR: "A1B2C3", Pax: "1", Ticketing_Date: "5/21/19", Travel_date: "4/30/19"
  },

  { Booked_cabin: "Economy", Email: "sbatra@zzz.com", Fare_Class: "Z", First_name: "Somnath", Id: "5", Last_name: "Batra", Mobile_phone: "9876543214", PNR: "X1Y2Z4", Pax: "3", Ticketing_Date: "5/23/19", Travel_date: "7/25/19" },

  // {email: [1, 2],r: 3},

];
let data = [];
let passed_data = []
const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const isValidContact = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const isValidPNR = /^[a-zA-Z0-9]*$/;

describe("Test my Airline module", () => {
  test("test add method", async () => {

    for (let i = 0; i < testCases.length; i++) {
      let Errors = []
      const { Email, Mobile_phone, PNR, Ticketing_Date, Travel_date, } = testCases[i];
      try {
        const x = new Date(Ticketing_Date);
        const y = new Date(Travel_date);
        const datecomp = x > y ? 'yes' : 'no'
        if (datecomp == 'yes') {
          await Errors.push('Ticketing date is greater than travel date');
          await data.push(testCases[i])
        }

      }
      catch (e) {
        // testCases[i]['']
        // await Errors.push('date error');
      }
      try {
        expect(Email).toMatch(isValidEmail)
      }
      catch (e) {
        await Errors.push('Invalid Email');
        await data.push(testCases[i])
      }
      try {
        expect(Mobile_phone).toMatch(isValidContact)
      }
      catch (e) {
        await Errors.push('Invalid contact number');
        await data.push(testCases[i])
      }
      try {
        const info = expect(PNR).toHaveLength(6);
        if (info) {
          expect(PNR).toMatch(isValidPNR);

        }
      }
      catch {
        await Errors.push('Invalid PNR');
        await data.push(testCases[i])
      }
      Errors.length ?
        testCases[i]['Errors'] = Errors
        :
        await passed_data.push(testCases[i])
    }
    console.log(data, 'data validation failed')
  })
})



describe('percent',function(){
  it('should be a decimal',function(){
    for(let i=0;i<passed_data.length;i++){
      const { Fare_Class } = passed_data[i];

    var percent = Fare_Class.charCodeAt(0)

try{
  let a=expect(percent).toBeGreaterThanOrEqual(65);
  if(a){
   let b= expect(percent).toBeLessThanOrEqual(69);
   if(b){
     passed_data[i]['discount_code'] = 'OFFER_20'

   }
  }

}
catch(a){
console.log(a,'aaaa')}
try{
  let a=expect(percent).toBeGreaterThanOrEqual(70);
  if(a){
   let b= expect(percent).toBeLessThanOrEqual(75);
   if(b){
     passed_data[i]['discount_code'] = 'OFFER_20'

   }
  }

}
catch(a){
console.log(a,'aaaa')}
try{
  let a=expect(percent).toBeGreaterThanOrEqual(76);
  if(a){
   let b= expect(percent).toBeLessThanOrEqual(82);
   if(b){
     passed_data[i]['discount_code'] = 'OFFER_20'

   }
  }

}
catch(a){
console.log(a,'aaaa')}
try{
  let a=expect(percent).toBeGreaterThanOrEqual(83);
  if(a){
   let b= expect(percent).toBeLessThanOrEqual(90);
   if(b){
     passed_data[i]['discount_code'] = 'OFFER_20'

   }
  }

}
catch(a){
console.log(a,'aaaa')}




    // expect(percent >= 65).toBeTruthy();
    // expect(percent).toBeLessThanOrEqual(69);
    // expect(percent >= 70).toBeTruthy();
    // expect(percent).toBeLessThanOrEqual(75);
    }
  });   
});


// const ouncesPerCan=()=>{

// }

    describe("Test of pass Airline module", () => {
      test("test add method", async () => {

for(let i=0;i<passed_data.length;i++){
  const { Fare_Class } = passed_data[i];


if (expect(Fare_Class.charCodeAt(0)).toBeGreaterThanOrEqual(65) && expect(Fare_Class.charCodeAt(0)).toBeLessThanOrEqual(69)) {
  passed_data[i]['discount_code'] = 'OFFER_20'

}
else if (Fare_Class.charCodeAt(0) >= 70 && Fare_Class.charCodeAt(0) <= 75) {
  console.log('kk1')
  passed_data[i]['discount_code'] = 'OFFER_30'
}
else if (Fare_Class.charCodeAt(0) >= 76 && Fare_Class.charCodeAt(0) <= 82) {
  console.log('kk2')
  passed_data[i]['discount_code'] = 'OFFER_25'
}
else {
  console.log('kk')
  passed_data[i]['discount_code'] = 'no offer code'
}

 console.log(passed_data, 'passeddata')





}
  })
  
})




















