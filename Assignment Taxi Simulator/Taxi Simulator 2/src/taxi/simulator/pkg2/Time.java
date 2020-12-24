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
//calculate time

public class Time {
	private int time = 0;
	
	public Time() {
		
	}
	
	public void setTime() {
		time++;
	}
	
	public String toString() {
		return "[" + time + "]";
	}
	
	public int getTime() {
		return time;
	}
}


