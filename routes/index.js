var express = require('express');
var router = express.Router();
const healthDetails = require('../data/healthDetails');

let newHealthDetails =[]

router.use((req,res,next)=>{
  newHealthDetails = healthDetails.map((person)=>{
    let bmi = (person.WeightKg*100)/person.HeightCm
    person.bmi =  Math.round(bmi*10)/10;
    if(person.bmi < 18.5 ){
      person.bmiCategory = 'Underweight'
      person.healthRisk = 'Malnutrition risk'
    }
    else if(person.bmi >= 18.5 && person.bmi <= 24.9){
      person.bmiCategory = 'Normal weight'
      person.healthRisk = 'No risk'
    }
    else if(person.bmi >= 25 && person.bmi <= 29.9){
      person.bmiCategory = 'Overweight'
      person.healthRisk = 'Enhanced risk'
    }
    else if(person.bmi >= 30 && person.bmi <= 34.9){
      person.bmiCategory = 'Moderately obese'
      person.healthRisk = 'Medium risk'
    }
    else if(person.bmi >= 35 && person.bmi <= 39.9){
      person.bmiCategory = 'Severly obese'
      person.healthRisk = 'High risk'
    }
    else if(person.bmi >= 40){
      person.bmiCategory = 'Very Severly obese'
      person.healthRisk = 'Very High risk'
    }
    else{
      person.bmiCategory = 'Not in range'
      person.healthRisk = 'Not in range'
    }
    return person;
})
next();
})

/* GET home page. */
router.get('/healthDetails', function(req, res, next) {
  res.json(newHealthDetails)
  
});
 
router.get('/overweight',(req,res,next)=>{
    const result = newHealthDetails.filter((person)=>{
        return person.bmiCategory === "Overweight"
    })
    res.json(result.length)
})

module.exports = router;
