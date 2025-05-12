
interface Bed{
  _id: number;
  name: string;
  macAddress: string;
  assigned: boolean;
  lastTemperature: number
}

interface BedDetails {
  id: number,
  temperature: number
  
}

interface Alert {
  _id: number,
  bedId: number,
  message: string;
  date: number
}
