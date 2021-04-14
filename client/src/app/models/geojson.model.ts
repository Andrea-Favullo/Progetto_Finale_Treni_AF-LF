export class Geometry {
  //type: string;
  coordinates: any;
  //non sappiamo se coordinates sarà un number[] (Point), number[][] (LineString) o
  //number [][][] (Polygon) allora usiamo il tipo any: indefinito
}
export class GeoJson { /*
  public type: string;
  public geometry: Geometry;
  public properties?: any //le proprietà possono variare per ora le lasciamo di tipo
                                //any
                                */
}
