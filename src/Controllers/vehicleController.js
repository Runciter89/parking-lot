const vehicle = {}

const VEHICLE_TYPE = {
  OFFICIAL: 'OFFICIAL',
  RESIDENT: 'RESIDENT',
  NON_RESIDENT: 'NON_RESIDENT'

}

//imports
var Vehicles = require('../Models/Vehicles');




async function createVehicle(data) {
  const { number_plate, vehicle_type } = data;
  return Vehicles.create({
    numberPlate: number_plate,
    vehicle_type,
  })
}

//create official
vehicle.create_official = async (req, res) => {
  try {
    const response = await createVehicle({
      ...req.body,
      vehicle_type: VEHICLE_TYPE.OFFICIAL,
    })
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}

//create resident
vehicle.create_resident = async (req, res) => {

  try {
    const response = await createVehicle({
      ...req.body,
      vehicle_type: VEHICLE_TYPE.RESIDENT,
    })
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}

//vehicle list
vehicle.list = async (req, res) => {
  try {
      const response = await Vehicles.findAll({
       
  
      })
      res.json({ success: true, data: response });
  
    } catch (e) {
      console.log(e);
      res.json({ success: false, error: e });
    }
  }
 
  //get vehicle by numberPlate
  vehicle.get = async (req, res) => {
      try {
        const { number_plate } = req.params;
    
        const response = await Vehicles.findOne({
          where: { numberPlate: number_plate }
    
        })
        res.json({ success: true, data: response });
    
      } catch (e) {
        console.log(e);
        res.json({ success: false, error: e });
      }
    }
    
//delete vehicle
vehicle.delete = async (req, res) => {
  try {

    const { number_plate } = req.params;

    const response = await Vehicles.destroy({
      where: { numberPlate: number_plate }
    })
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}
//update vehicle
vehicle.update = async (req, res) => {

  try {

    const {number_plate, vehicle_type, monthly} = req.body;

    const response = await Vehicles.update({
      numberPlate: number_plate,
      vehicle_type: vehicle_type,
      monthly: monthly
     
    }, {
      where: { numberPlate: number_plate }
    })
    res.json({ success: true, data: response });

  } catch (e) {
    console.log(e);
    res.json({ success: false, error: e });
  }
}

module.exports = vehicle;