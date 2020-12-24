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
//this is the class to save the coordinates of the taxi


public class Coordinate{
	
	String name;
	int X;
	int Y;
	boolean SoD = false; //src = false | dest = true
	Passenger passenger;
	
	public Coordinate(String name,int X, int Y, boolean SoD, Passenger passenger) {
		this.name = name;
		this.X = X;
		this.Y = Y;
		this.SoD = SoD;
		this.passenger = passenger;
	}
	
	public int getX() {
		return X;
	}
	public int getY() {
		return Y;
	}
	
	public boolean getStatusPass() {
		return passenger.getStatusPass();
	}
	public boolean getStatusDone() {
		return passenger.getStatusDone();
	}
	public void setStatusPass() {
		passenger.setStatusPass();
	}
	public void setStatusDone() {
		passenger.setStatusDone();
	}

	public boolean getSoD() {
		return SoD;
	}
	public String getName() {
		return name;
	}
	public Passenger getPassenger() {
		return passenger;
	}

}

