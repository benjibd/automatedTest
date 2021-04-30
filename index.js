const { Builder, By } = require("selenium-webdriver");
const faker = require('faker');
const moment = require('moment');
const waterfall = require('async/waterfall');
const driver = new Builder()
  .forBrowser("firefox")
  .build();



async function createPatientsAllFields() {

  try {


    await driver.get("http://192.168.4.124:3000")
    
      let fName = faker.name.firstName()
      let lName = faker.name.lastName()
      let mName = faker.name.firstName()
      let address = faker.address.streetAddress()
      let dob = faker.date.between('1980-01-01', '2021-03-30')
      dob = moment(dob).format('YYYY-MM-DD')
      let phoneNum =faker.phone.phoneNumber('0244######')
      await driver.findElement(By.css("input[data-test-id = 'first-name']")).sendKeys(fName)
      await driver.findElement(By.css("input[data-test-id = 'last-name']")).sendKeys(lName)
      await driver.findElement(By.css("input[data-test-id = 'middle-name']")).sendKeys(mName)
      await driver.findElement(By.css("input[data-test-id = 'phone-number']")).sendKeys(phoneNum)
      await driver.findElement(By.css("textarea[data-test-id = 'address']")).sendKeys(address)
      await driver.findElement(By.css("input[data-test-id = 'dob']")).sendKeys(dob)
     
      await driver.findElement(By.css("a[data-test-id = 'submit-btn']")).click()
      let element = await (await driver.findElement(By.xpath("/html/body/div/div/div[2]/main/div/div[2]/h4"))).getText()
      if (element == (fName + " " + mName + " " + lName)) {
        console.log("createPatientsAllFields: Pass")
      } else {
        console.log("createPatientsAllFields: Fail")
      }

  

  } catch (error) {
    console.log(console.log("createPatientsAllFields: Fail"))
  }

  await driver.quit()

}

async function createPatientRequiredFieldsOnly() {

  try {


    await driver.get("http://192.168.4.124:3000")

    let fName = faker.name.firstName()
    let lName = faker.name.lastName()  
    let dob = faker.date.between('1980-01-01', '2021-03-30')
    dob = moment(dob).format('YYYY-MM-DD')
    let phoneNum =faker.phone.phoneNumber('0244######')
    await driver.findElement(By.css("input[data-test-id = 'first-name']")).sendKeys(fName)
    await driver.findElement(By.css("input[data-test-id = 'last-name']")).sendKeys(lName) 
    await driver.findElement(By.css("input[data-test-id = 'phone-number']")).sendKeys(phoneNum)
    await driver.findElement(By.css("input[data-test-id = 'dob']")).sendKeys(dob)
    await driver.findElement(By.css("a[data-test-id = 'submit-btn']")).click()
    let name = await driver.findElement(By.xpath("/html/body/div/div/div[2]/main/div/div[2]/h4")).getText()
   

   
    if (name == (fName  + " " + lName)) {
      console.log("createSinglePatientRequiredFieldsOnly: Pass")
    } else {
      console.log("createSinglePatientRequiredFieldsOnly: Fail")
    }




  } catch (error) {
    console.log("+++++++++createSinglePatientRequiredFieldsOnly: Fail",error)
  }

  

}




createPatientRequiredFieldsOnly().then(() => {
  createPatientsAllFields()


}).catch((err)=> console.log(err))





  //runTestcases()