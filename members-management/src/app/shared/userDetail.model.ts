

export class UserDetail{
    constructor(public userName: any, public firstName : any,public lastName : any, public gender : string
      , public dob : Date, public emailId : any,public mobileNumber : any, public addressField : string
      , public country : string, public state: string, public zipcode: any, public timezone: any,
      public locale : any, public image: any, public role: any ){
            this.userName = userName;
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = gender;
            this.dob = dob;
            this.emailId = emailId;
            this.mobileNumber = mobileNumber;
            this.addressField = addressField;
            this.country = country;
            this.state = state;
            this.zipcode = zipcode;
            this.timezone = timezone;
            this.locale = locale;
            this.image = image;
            this.role = role;
      }
    }