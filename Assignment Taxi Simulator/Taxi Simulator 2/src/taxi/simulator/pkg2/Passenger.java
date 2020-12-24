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
public class Passenger{
	private String name;
	private int srcX;
	private int srcY;
	private int destX;
	private int destY;
	boolean statusPass = false; //if true, taxi have fetch passenger
	boolean statusDone = false; //if true, taxi have sent passenger | This boolean should not exist

    public Passenger() {
    }
	
        
	public Passenger(String name,int srcX, int srcY, int destX, int destY, String[][] mapArr, Taxi taxi) {
		
		this.name = name;
		this.srcX = srcX;
		this.srcY = srcY;
		this.destX = destX;
		this.destY = destY;
		
		setSrc(mapArr);
		setDest(mapArr);
		Coordinate src = new Coordinate(name, srcX, srcY, false, this);
		Coordinate dest = new Coordinate(name, destX, destY, true, this);
		
		taxi.addToList(src);
		taxi.addToList(dest);
	}
        public void addPassenger(String name,int srcX, int srcY, int destX, int destY, String[][] mapArr, Taxi taxi) {
		
		this.name = name;
		this.srcX = srcX;
		this.srcY = srcY;
		this.destX = destX;
		this.destY = destY;
		
		setSrc(mapArr);
		setDest(mapArr);
		Coordinate src = new Coordinate(name, srcX, srcY, false, this);
		Coordinate dest = new Coordinate(name, destX, destY, true, this);
		
		taxi.addToList(src);
		taxi.addToList(dest);
	}
	
	public void setSrc(String[][] mapArr) {
		if(mapArr[srcY][srcX]=="- ") {
			mapArr[srcY][srcX] = name + "_s";
		}
		else 
			mapArr[srcY][srcX] = mapArr[srcY][srcX]+"|"+name+"_s";
	}
	public void setDest(String[][] mapArr) {
		if(mapArr[destY][destX]=="- ") {
			mapArr[destY][destX] = name + "_d";
		}
		else 
			mapArr[destY][destX] = mapArr[destY][destX]+"|"+name+"_d";	
	}
	
	public int getSrcX() {
		return srcX;
	}
	public int getSrcY() {
		return srcY;
	}
	public int getDestX() {
		return destX;
	}
	public int getDestY() {
		return destY;
	}

	public boolean getStatusPass() {
		return statusPass;
	}
	public boolean getStatusDone() {
		return statusDone;
	}
	public void setStatusPass() {
		statusPass = true;
	}
	public void setStatusDone() {
		statusDone = true;
	}

}

