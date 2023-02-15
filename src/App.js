import {Component} from 'react' 
import Papa from "papaparse";
class App extends Component {
  state = { 
    data:[],
    passed_data:[],
    failed_data:[],
    booking_file:null,
     data1:[],
   data2:[]

   } 


processData=async(el)=>{

  let Errors=[]
  
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValidContact = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  const isValidPNR = /^([A-Za-z]|[0-9]|_)+$/;
 const x = new Date(el.Ticketing_Date);
const y = new Date(el.Travel_date);
   !el.Email.match(isValidEmail)?Errors.push('Invalid Email'):console.log()
   !el.Mobile_phone.match(isValidContact)?Errors.push('Invalid Phone'):console.log()
   !el.PNR.match(isValidPNR)||el.PNR.length!=6?Errors.push('Invalid PNR'):console.log()
   el.Booked_cabin=='Economy'||el.Booked_cabin=='Premium Economy'||el.Booked_cabin=='Business'||el.Booked_cabin=='First'?console.log():Errors.push('invalid cabin')
   x>y?Errors.push('Ticketing date is less than travel date'):console.log()
   el['Errors']=Errors
 await Errors.length>0?this.state.data1.push(el):this.state.data2.push(el)

  //return el
}
addDidcountCode=()=>{
  console.log(this.state.data2,'this.state.data2')
  let data=this.state.data2;
  data.forEach((el)=>{
    if(el.Fare_Class=='A'||el.Fare_Class=='B'||el.Fare_Class=='C'||el.Fare_Class=='D'||el.Fare_Class=='E'){
      el['discount_code']='OFFER_20'
    }
    else if( el.Fare_Class=='F'||el.Fare_Class=='G'||el.Fare_Class=='H'||el.Fare_Class=='I'||el.Fare_Class=='J'||el.Fare_Class=='K'){
      el['discount_code']='OFFER_30'

    }
    else if( el.Fare_Class=='L'||el.Fare_Class=='M'||el.Fare_Class=='N'||el.Fare_Class=='O'||el.Fare_Class=='J'||el.Fare_Class=='P'||el.Fare_Class=='Q'||el.Fare_Class=='R'){
      el['discount_code']='OFFER_25'

    }
    else{
      el['discount_code']='no offer code'

    }
  })
  console.log(data,'datadata')
  this.setState({passed_data:data})

}

    changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: this.updateData
      
    });
  };
  updateData=async(result)=> {
     const data = result.data;
    this.setState({data}); 
    await data.forEach((element,i) => {
       this.processData(element)


});
this.state.data2.length>0?this.addDidcountCode():console.log()

  }


  render() { 
   // console.log(this.state.data,'data')
// console.log(this.state.data1,this.state.data2)

    return (
      <>
      <input
                type='file'
                accept='.csv'
                id='csvFile'
                // onChange={(e) => {
                //     this.setState({booking_file:e.target.files[0]})
                // }}
                onChange={(e)=>this.changeHandler(e)}
            >
            </input>
            <br/>
            {this.state.passed_data.length>0?
            <table className="table">
  <tr>
    {/* <th>{Object.keys(el)}</th> */}
    <th>First_name</th>
    <th>Last_name</th>
    <th>Mobile_phone</th>
    <th>PNR</th>
    <th>PAX</th>
    <th>Ticketing_Date</th>
    <th>Travel_date</th>
    <th>discount_code</th>
    <th>Booked_cabin</th>
  </tr>
           {this.state.passed_data.map((el,i)=>{
       //    console.log(Object.keys(el))
            
            return(<>
           
  <tr>
   {/* {Object.values(el)} */}
   <td>{el.First_name}</td>
    <td>{el.Last_name}</td>
    <td>{el.Mobile_phone}</td>
    <td>{el.PNR}</td>
    <td>{el.Pax}</td>
    <td>{el.Ticketing_Date}</td>
    <td>{el.Travel_date}</td>
    <td>{el.discount_code}</td>
    <td>{el.Booked_cabin}</td>
  </tr>
            </>)
           })}
  </table>:null}
{this.state.data1.length>0?
  <table className="table">
  <tr>
    {/* <th>{Object.keys(el)}</th> */}
    <th>First_name</th>
    <th>Last_name</th>
    <th>Mobile_phone</th>
    <th>PNR</th>
    <th>PAX</th>
    <th>Ticketing_Date</th>
    <th>Travel_date</th>
    <th>Booked_cabin</th>
    <th>Errors</th>
  </tr>
{this.state.data1.map((el,i)=>{
       //    console.log(Object.keys(el))
            
            return(<>

  <tr>
   {/* {Object.values(el)} */}
   <td>{el.First_name}</td>
    <td>{el.Last_name}</td>
    <td>{el.Mobile_phone}</td>
    <td>{el.PNR}</td>
    <td>{el.Pax}</td>
    <td>{el.Ticketing_Date}</td>
    <td>{el.Travel_date}</td>
    <td>{el.Booked_cabin}</td>
    <td>{el.Errors.map((e)=>{return<p>{e}</p>})}</td>
  </tr>
            </>)
           })}
  </table>:null}

      </>
    );
  }
}
 
export default App;

