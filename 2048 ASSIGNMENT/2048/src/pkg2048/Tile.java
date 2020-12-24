/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pkg2048;

public class Tile {
    private int[][] before;
    private int[][] after;
    
    
    public Tile (int row, int column) {
        before = new int[row][column];
        after = new int[row][column];
        
    }
    
    public void setBefore(int[][] tiles,int row,int column) {
              
        for (int i = 0; i < row; i++) {
            System.arraycopy(tiles[i], 0, before[i], 0, column);
        }
    }
    
    public void setAfter(int[][] tiles,int row, int column) {
        
        for (int i = 0; i < row; i++) {
            System.arraycopy(tiles[i], 0, after[i], 0, column);
        }
    }
    
    public int[][] printBefore(int row, int column) {
        return before;
    }
    
    public boolean compareBeforeAfter(int row, int column) {
        boolean value = true;
        for(int i=0; i<row; i++) {
            for(int j=0; j<column; j++) {
                if (before[i][j]!=after[i][j]) {
                    value = false;
                }
            }
        }
        return value;
    }
}

