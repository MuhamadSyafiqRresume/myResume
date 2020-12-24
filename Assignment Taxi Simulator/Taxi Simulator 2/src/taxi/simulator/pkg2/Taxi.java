/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package taxi.simulator.pkg2;

/**
 *
 * @author Asus
 */
//this is the main movement of the coding
//1. calculates the nearest distance of taxi n coordinates
//2. calculates where the taxi is supposed to go



import java.util.ArrayList;

public class Taxi{
	 public static int taxiX = 0;
	 public static int taxiY = 0;
	 ArrayList<TaxiMovement> taxiMovement = new ArrayList<>();
	 ArrayList<Coordinate> passengerList = new ArrayList<>();
         ArrayList status=new ArrayList();
	 Time time = new Time();
	 
	 public Taxi(String[][] mapArr) {
		 iniMap(mapArr);
	 }
         public void getPassengerLists(){
             for (int i = 0; i < passengerList.size(); i++) {
                 System.out.println("Passenger List= "+passengerList.toString());
                 
             }
         }
	
	 public void iniMap(String[][] mapArr) {
		 for (int i = 0; i < mapArr.length; i++) {
			 for (int j = 0; j < mapArr.length; j++) {
				 mapArr[i][j] = "- ";
			 }
		 }
	 }
	 public void printMap(String[][] mapArr) {
		 System.out.print("\t");
		 for (int i = 0; i < mapArr.length; i++) {
			 System.out.printf("%d\t", i);
		 }
		 System.out.println();
		 for (int i = 0; i < mapArr.length; i++) {
			 System.out.print("---------");
		 }
		 for (int i = 0; i < mapArr.length; i++) {
			 System.out.printf("\n%d | \t", i);
			 for (int j = 0; j < mapArr.length; j++) {
				 System.out.print(mapArr[i][j] + "\t");
			 }
		 }
	 }
	 //1: to src
	 //else: to dest
	 public static double checkDistance(Coordinate Z) {
		 return (Math.sqrt(Math.pow((taxiX-Z.getX()), 2))+(Math.pow((taxiY-Z.getY()), 2)));
	 }
	
	 public void addToList(Coordinate Z) {
		 passengerList.add(Z);
	 }
	
	 public ArrayList<Coordinate> getPassengerList() {
		 return passengerList;
	 }
	 
	 public void sendPassengers() {
		 System.out.print("\n\n"+time.toString()+" ");
		 System.out.println("Taxi started");
//		 System.out.println("taxiX: 0 taxiY: 0");
		 while(passengerList.size() != 0) {
			 Coordinate nearest = getNearest();
			 moveTaxi(nearest);
			 
			 if(!nearest.getSoD()) {  //source
				 nearest.setStatusPass();
				 System.out.print(time.toString()+" ");
				 System.out.println("Taxi fetch Passenger "+nearest.getName());
				 TaxiMovement tM = new TaxiMovement(nearest, "fetchPassen", time.getTime());
				 taxiMovement.add(tM);
			 }
			 else {                     //destination
				 nearest.setStatusDone();
				 System.out.print(time.toString()+" ");
				 System.out.println("Taxi drop Passenger "+nearest.getName());
				 TaxiMovement tM = new TaxiMovement(nearest, "dropPassen", time.getTime());
				 taxiMovement.add(tM);
			 }
		}
	 }
	 
	 public void moveTaxi(Coordinate Z) {
//		 System.out.println("nextX: "+Z.X+" nextY: "+Z.Y);
		 if(checkX(Z)>0) {
			 int temp = taxiX;
			 for (int i = temp; i < Z.X; i++) {
				time.setTime();
				System.out.print(time.toString()+" ");
				System.out.println("Taxi move right");
				taxiX++;
				TaxiMovement tM = new TaxiMovement(Z, "right", time.getTime());
				taxiMovement.add(tM);
			 }
		 }
		 else {
			 int temp = taxiX;
			 for (int i = temp; i > Z.X; i--) {
				time.setTime();
				System.out.print(time.toString()+" ");
				System.out.println("Taxi move left");
				taxiX--;
				TaxiMovement tM = new TaxiMovement(Z, "left", time.getTime());	
				taxiMovement.add(tM);
			 }
		 }
		 //up,down,right,left
		 if(checkY(Z)>0) {
			 int temp = taxiY;
			 for (int i = temp; i < Z.Y; i++) {
				time.setTime();
				System.out.print(time.toString()+" ");
				System.out.println("Taxi move down");
				taxiY++;
				TaxiMovement tM = new TaxiMovement(Z, "down",time.getTime());
				taxiMovement.add(tM);
			 }
		 }
		 else {
			 int temp = taxiY;
			 for (int i = temp; i > Z.Y; i--) {
				time.setTime();
				System.out.print(time.toString()+" ");
				System.out.println("Taxi move up");
				taxiY--;
				TaxiMovement tM = new TaxiMovement(Z, "up", time.getTime());
				taxiMovement.add(tM);
			 }
		 }
//		 System.out.println("taxiX: "+taxiX+" taxiY: "+taxiY+"\n");
	 }
	 
	 public static int checkX(Coordinate Z) {
		 return Z.X-taxiX;
	 }
	 public static int checkY(Coordinate Z) {
		 return Z.Y-taxiY;
	 }
         public int getSize(){
             System.out.println("Size="+passengerList.size());
             return passengerList.size();
         }
	
	 //getting the nearest 
	 public Coordinate getNearest() {
		 Coordinate nearest = passengerList.get(0);
		 for (int i = 1; i < passengerList.size(); i++) {
			if(checkDistance(nearest) > checkDistance(passengerList.get(i))) {
				if(passengerList.get(i).getSoD()) {
					if(passengerList.get(i).getStatusPass()) {
						nearest = passengerList.get(i);
					}
				}
				else {
					nearest = passengerList.get(i);
                                         status.add(nearest);
//                                        passengerList.get(i).setStatusPass();
				}
			}
		}
                 
		passengerList.remove(nearest);
		return nearest;
	 }
	 
	 
}

