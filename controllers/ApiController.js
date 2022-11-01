import db from '../models/index.js';
import NodeCache from 'node-cache';
const Airport = db.Airport;
const Vehicle = db.Vehicle;
const Helment = db.Helment;
const Equipment = db.Equipment;

const apiCache = new NodeCache({ stdTTL: 600 });

export const handleGetAssets = async function(req,res){
  const assets = apiCache.get('assets');
  if(apiCache.has('assets')){
    return res.status(200).json({assets});
  }
  try {
    const airports = await Airport.findAll({
      attributes: {exclude:['createdAt','updatedAt']}
    });
    var vehicles = await Vehicle.findAll({
      attributes:{exclude:["createdAt,updatedAt"]}
    })
    vehicles = vehicles.map((v)=>{
      return {name:v.name,id:v.id,passengers:{min:v.min_passengers,max:v.max_passengers},childs:{min:v.min_childs,max:v.max_childs}};
    });

    var helmets = await Helment.findAll({
      attributes:{exclude:["createdAt","updatedAt"]}
    })
    var equipments = await Equipment.findAll({
      attributes:{exclude:["createdAt","updatedAt"]}
    })

    const assets = {
      airports,
      vehicles,
      helmets,
      equipments
    }
    apiCache.set('assets',assets,300);
    return res.status(200).json({assets});
  } catch (error) {
    return res.status(404).json({message:"Failed to load content."});
  }
}