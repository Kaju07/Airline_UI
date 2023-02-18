import { Component } from 'react'
import Papa from "papaparse";
class App extends Component {
  state = {
    data: [],
    passed_data: [],
    failed_data: [],
    booking_file: null,
    data1: [],
    data2: [],

  }


  processData = async (el) => {
    console.log(el, 'processdata')
    let Errors = []
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValidContact = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const isValidPNR = /^[a-zA-Z0-9]*$/;
    const x = new Date(el.Ticketing_Date);
    const y = new Date(el.Travel_date);
    !el.Email.match(isValidEmail) ? Errors.push('Invalid Email') : console.log()
    !el.Mobile_phone.match(isValidContact) ? Errors.push('Invalid Phone') : console.log()
    !el.PNR.match(isValidPNR) || el.PNR.length != 6 ? Errors.push('Invalid PNR') : console.log()
    el.Booked_cabin == 'Economy' || el.Booked_cabin == 'Premium Economy' || el.Booked_cabin == 'Business' || el.Booked_cabin == 'First' ? console.log() : Errors.push('invalid cabin')
    x > y ? Errors.push('Ticketing date is greater than travel date') : console.log()
    el['Errors'] = Errors
    await Errors.length > 0 ? this.state.data1.push(el) : this.state.data2.push(el);
    //  Errors=null
  }
  addDidcountCode = () => {
    let data = this.state.data2;
    data.forEach((el) => {

      if (el.Fare_Class.charCodeAt(0) >= 65 && el.Fare_Class.charCodeAt(0) <= 69) {
        el['discount_code'] = 'OFFER_20'

      }
      else if (el.Fare_Class.charCodeAt(0) >= 70 && el.Fare_Class.charCodeAt(0) <= 75) {
        el['discount_code'] = 'OFFER_30'

      }
      else if (el.Fare_Class.charCodeAt(0) >= 76 && el.Fare_Class.charCodeAt(0) <= 82) {
        el['discount_code'] = 'OFFER_25'

      }

      else {
        el['discount_code'] = 'no offer code'

      }
    })
    this.setState({ passed_data: data })

  }

  changeHandler = (event) => {
    console.log(event.target.files[0])
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: this.updateData

    });
  };
  updateData = async (result) => {
    console.log(result.data, 'result in updatedata')
    const data = result.data;
    this.setState({ data });
    await data.forEach((element, i) => {
      // console.log(element.Email.length==1)
      element.Email.length > 1 ?
        this.processData(element) : console.log()


    });
    this.state.data2.length > 0 ? this.addDidcountCode() : console.log()

  }


  render() {
    return (
      <>
        <input
          type='file'
          accept='.csv'
          id='csvFile'
          onChange={(e) => this.changeHandler(e)}
        >
        </input>
        <br />
        {this.state.passed_data.length > 0 ?
          <>
            <p>Validation Pass Data</p>
            <table className="table-bordered">

              <tr>
                <th>First_name</th>
                <th>Last_name</th>
                <th>Email</th>

                <th>Mobile_phone</th>
                <th>PNR</th>
                <th>PAX</th>
                <th>Ticketing_Date</th>
                <th>Travel_date</th>
                <th>discount_code</th>
                <th>Booked_cabin</th>
              </tr>
              {this.state.passed_data.map((el, i) => {

                return (<>

                  <tr>
                    <td>{el.First_name}</td>
                    <td>{el.Last_name}</td>
                    <td>{el.Email}</td>

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
            </table>
          </>
          : null}
        <br />
        {this.state.data1.length > 0 ?
          <>
            <p>Validation failed Data</p>

            <table className="table-bordered">
              <tr>
                <th>First_name</th>
                <th>Last_name</th>
                <th>Email</th>
                <th>Mobile_phone</th>
                <th>PNR</th>
                <th>PAX</th>
                <th>Ticketing_Date</th>
                <th>Travel_date</th>
                <th>Booked_cabin</th>
                <th>Errors</th>
              </tr>
              {this.state.data1.map((el, i) => {
                {
                  console.log(this.state.data1, '--data1')
                }
                return (<>

                  <tr>
                    <td>{el.First_name}</td>
                    <td>{el.Last_name}</td>
                    <td>{el.Email}</td>
                    <td>{el.Mobile_phone}</td>
                    <td>{el.PNR}</td>
                    <td>{el.Pax}</td>
                    <td>{el.Ticketing_Date}</td>
                    <td>{el.Travel_date}</td>
                    <td>{el.Booked_cabin}</td>
                    <td>{el.Errors}</td>
                  </tr>
                </>)
              })}
            </table>
          </>
          : null}

      </>
    );
  }
}

export default App;



// [
//   {
//     Booked_cabin: "Economy", Email: "abhishek@zzz.com", Fare_Class: "F", First_name: "Abhishek ", Id: "1", Last_name: "Kumar", Mobile_phone: "9876543210", PNR: "ABC123", Pax: "2", Ticketing_Date: "5/21/2019", Travel_date: "7/31/2019"
//   },
//   { Booked_cabin: "Economy", Email: "monin@zzz.com", Fare_Class: "C", First_name: "Monin", Id: "2", Last_name: "Sankar", Mobile_phone: "9876543211", PNR: "PQ234", Pax: "2", Ticketing_Date: "5/22/19", Travel_date: "8/30/19" },
//   {
//     Booked_cabin: "Business", Email: "radhika@zzz", Fare_Class: "T", First_name: "Radhika", Id: "3", Last_name: "Suresh", Mobile_phone: "9876543212", PNR: "ZZZ345", Pax: "4", Ticketing_Date: "5/21/19", Travel_date: "5/31/19"
//   },

//   {
//     Booked_cabin: "Premium Economy", Email        :        "kben@zzz.com", Fare_Class: "M", First_name: "Kalyani", Id: "4", Last_name: "Ben", Mobile_phone: "9876543213", PNR: "A1B2C3", Pax: "1", Ticketing_Date: "5/21/19", Travel_date: "4/30/19"
//   },

//   { Booked_cabin: "Economy", Email: "sbatra@zzz.com", Fare_Class: "Z", First_name: "Somnath", Id: "5", Last_name: "Batra", Mobile_phone: "9876543214", PNR: "X1Y2Z4", Pax: "3", Ticketing_Date: "5/23/19", Travel_date: "7/25/19", discount_code: "no offer code" },
// ]