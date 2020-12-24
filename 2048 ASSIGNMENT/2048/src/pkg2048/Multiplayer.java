
package pkg2048;

import java.util.Random;
import java.util.Scanner;


public class Multiplayer {
    private int points;
    Scanner sc = new Scanner(System.in);
    int turn=0;
    int point1=0;
    int point2=0;        
    
    public Multiplayer(int points) {
        this.points = points;
    }
    public void ShowGrid(int row, int column, int[][] tiles) {
        for(int i=0; i<row; i++) {
            for(int j=0; j<column; j++) {
                System.out.print(tiles[i][j]+"\t");
            }
            System.out.println();
        }
    }
    private boolean hasEmptyTile(int row, int column, int[][] tiles){
        for (int i = 0; i < row; i++){
            for (int j = 0; j < column; j++){
                if (tiles[i][j] == 0){
                    return true;
                }
            }
        }
        return false;
    }
    private boolean generateNewTile(int row, int column, int[][] tiles){
        if (!(hasEmptyTile(row, column, tiles))){
            return false;
        }
        Random random = new Random();
        //iterate until an empty tile if found
        while (true){
            int x = random.nextInt(row);
            int y = random.nextInt(column);

            if (tiles[x][y] == 0){

                tiles[x][y] = getNewTileValue();
                return true;
            }
        }
    }  
    private int getNewTileValue(){
        Random random = new Random();
        int rng = random.nextInt(2) + 1;
        return (rng * 2);
    }
    private boolean hasEqualNeighbour(int row, int column, int[][] tiles) {
        for (int i = 0; i < row; i++){
            for (int j = 0; j < column; j++){

                //check the tile in the right of the chosen tile. Ignore last column.
                if (j < column - 1){

                    if (tiles[i][j] == tiles[i][j + 1]) {
                        return true;
                    }
                }
                //check the tile below the chosen tile. Ignore last row.
                if (i < row - 1){
                    if (tiles[i][j] == tiles[i + 1][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    private boolean noPossibleMove(int row, int column, int[][] tiles){    
        if (hasEmptyTile(row, column, tiles)){
            return false;
        }
        return !(hasEqualNeighbour(row, column, tiles));
    }
    private int checkRight(int i,int row, int column, int[][] tiles) {
        int count=0; 
        for(int j=0; j<column-1; j++) {
            if(tiles[i][column-j-1]==0) {
                count++;
            }
            else
                break;
        } return count;
    }
    private void slideToRight(int i, int j,int row, int column, int[][] tiles) {
        int temp=0; 
        for(j=j; j<column-1; j++) {
            temp=tiles[i][column-1-j];
            tiles[i][column-1-j]=tiles[i][column-2-j];
            tiles[i][column-2-j]=temp;
        }
    }
    private void Right(int point,int row, int column, int[][] tiles) {
        int count=0;
        //removing 0s from the right
        for(int i=0; i<row; i++) {
            count = checkRight(i,row,column, tiles);
            while(count>0) {
                for(int j=0; j<count; j++) {
                    slideToRight(i,j,row,column, tiles);
                    count--;
                }
            }
        }        
        //remove 0s in between numbers
        int temp=0; count=column-2;
        while(count>0) {
            for(int i=0; i<row; i++) {
                for(int j=1; j<column-1; j++) {
                    if(tiles[i][column-1-j]==0) {
                    temp=tiles[i][column-1-j];
                    tiles[i][column-1-j]=tiles[i][column-2-j];
                    tiles[i][column-2-j]=temp;
                    }
                }
            } count--;  
        }
        //should merge if equal
        count=column-2;
            for(int i=0; i<row; i++) {
                for(int j=0; j<column-1; j++) {
                    if(tiles[i][column-1-j]==tiles[i][column-2-j]) {
                        tiles[i][column-1-j]=(tiles[i][column-2-j])*2;
                        point=tiles[i][column-2-j];
                        tiles[i][column-2-j]=0;
//                        System.out.println(point);
                        while(count>0) {
                            if(tiles[i][column-1-j]==0) {
                                temp=tiles[i][column-1-j];
                                tiles[i][column-1-j]=tiles[i][column-2-j];
                                tiles[i][column-2-j]=temp;
                            } count--; 
                        }
                    }
                }
            }
            temp=0; count=column-2;
            while(count>0) {
                for(int i=0; i<row; i++) {
                    for(int j=1; j<column-1; j++) {
                        if(tiles[i][column-1-j]==0) {
                        temp=tiles[i][column-1-j];
                        tiles[i][column-1-j]=tiles[i][column-2-j];
                        tiles[i][column-2-j]=temp;
                    }
                }
            } count--;  
        }points = point;
    }
    private int checkLeft(int i,int row, int column, int[][] tiles) {
        int count=0; 
        for(int j=0; j<column-1; j++) {
            if(tiles[i][j]==0) {
                count++;
            }
            else
                break;
        } return count;
    }
    private void slideToLeft(int i, int j,int row, int column, int[][] tiles) {
        int temp=0; j=0;
        for(j=j; j<column-1; j++) {
            temp=tiles[i][j];
            tiles[i][j]=tiles[i][j+1];
            tiles[i][j+1]=temp;
        }
    }
    private void Left(int point,int row, int column, int[][] tiles) {
        int count=0;
        //removing 0s from the right
        for(int i=0; i<row; i++) {
            count = checkLeft(i,row,column, tiles);
            while(count>0) {
                for(int j=0; j<count; j++) {
                    slideToLeft(i,j,row,column, tiles);
                    count--;
                }
            }
        }        
        //remove 0s in between numbers
        int temp=0; count=column-2;
        while(count>0) {
            for(int i=0; i<row; i++) {
                for(int j=1; j<column-1; j++) {
                    if(tiles[i][j]==0) {
                    temp=tiles[i][j];
                    tiles[i][j]=tiles[i][j+1];
                    tiles[i][j+1]=temp;
                    }
                }
            } count--;  
        }
        //should merge if equal
        count=column-2;
            for(int i=0; i<row; i++) {
                for(int j=0; j<column-1; j++) {
                    if(tiles[i][j]==tiles[i][j+1]) {
                        tiles[i][j]=(tiles[i][j+1])*2;
                        point=tiles[i][j+1];
                        tiles[i][j+1]=0;
//                        System.out.println(point);
                        while(count>0) {
                            if(tiles[i][j]==0) {
                                temp=tiles[i][j+1];
                                tiles[i][j]=tiles[i][j+1];
                                tiles[i][j+1]=temp;
                            } count--; 
                        }
                    }
                }
            }
            temp=0; count=column-2;
            while(count>0) {
                for(int i=0; i<row; i++) {
                    for(int j=1; j<column-1; j++) {
                        if(tiles[i][j]==0) {
                        temp=tiles[i][j];
                        tiles[i][j]=tiles[i][j+1];
                        tiles[i][j+1]=temp;
                    }
                }
            } count--;  
        } points = point;
    }
    private int checkUp(int j,int row, int column, int[][] tiles) {
        int count=0; 
        for(int i=0; i<row-1; i++) {
            if(tiles[i][j]==0) {
                count++;
            }
            else
                break;
        } return count;
    }
    private void slideToUp(int i, int j,int row, int column, int[][] tiles) {
        int temp=0; 
        for(i=i; i<row-1; i++) {
            temp=tiles[i][j];
            tiles[i][j]=tiles[i+1][j];
            tiles[i+1][j]=temp;
        }
    }
    private void Up(int point,int row, int column, int[][] tiles) {
        int count=0;
        //removing 0s from the right
        for(int j=0; j<column; j++) {
            count = checkUp(j,row,column, tiles);
            while(count>0) {
                for(int i=0; i<count; i++) {
                    slideToUp(i,j,row,column, tiles);
                    count--;
                }
            }
        }        
        //remove 0s in between numbers
        int temp=0; count=row-2;
        while(count>0) {
            for(int j=0; j<column; j++) {
                for(int i=1; i<row-1; i++) {
                    if(tiles[i][j]==0) {
                    temp=tiles[i][j];
                    tiles[i][j]=tiles[i+1][j];
                    tiles[i+1][j]=temp;
                    }
                }
            } count--;  
        }
        //merge if equal
        count=row-2;
            for(int j=0; j<column; j++) {
                for(int i=0; i<row-1; i++) {
                    if(tiles[i][j]==tiles[i+1][j]) {
                        tiles[i][j]=(tiles[i+1][j])*2;
                        point=tiles[i+1][j];
                        tiles[i+1][j]=0;
//                        System.out.println(point);
                        while(count>0) {
                            if(tiles[i][j]==0) {
                                temp=tiles[i][j];
                                tiles[i][j]=tiles[i+1][j];
                                tiles[i+1][j]=temp;
                            } count--; 
                        }
                    }
                }
            }
            temp=0; count=row-2;
            while(count>0) {
                for(int j=0; j<column;j++) {
                    for(int i=1; i<row-1; i++) {
                        if(tiles[i][j]==0) {
                        temp=tiles[i][j];
                        tiles[i][j]=tiles[i+1][j];
                        tiles[i+1][j]=temp;
                    }
                }
            } count--;  
        } points = point;
    }
    private int checkDown(int j,int row, int column, int[][] tiles) {
        int count=0; int i=0;
        for(i=0; i<row-1; i++) {
            if(tiles[row-1-i][j]==0) {
                count++;
            }
            else
                break;
        } return count;
    }
    private void slideToDown(int i, int j,int row, int column, int[][] tiles) {
        int temp=0; 
        for(i=i; i<row-1; i++) {
            temp=tiles[row-1-i][j];
            tiles[row-1-i][j]=tiles[row-2-i][j];
            tiles[row-2-i][j]=temp;
        }
    }
    private void Down(int point,int row, int column, int[][] tiles) {
        int count=0;
        //removing 0s from the right
        for(int j=0; j<column; j++) {
            count = checkDown(j,row,column, tiles);
            while(count>0) {
                for(int i=0; i<count; i++) {
                    slideToDown(i,j,row,column, tiles);
                    count--;
                }
            }
        }        
        //remove 0s in between numbers
        int temp=0; count=row-2;
        while(count>0) {
            for(int j=0; j<column; j++) {
                for(int i=1; i<row-1; i++) {
                    if(tiles[row-1-i][j]==0) {
                    temp=tiles[row-1-i][j];
                    tiles[row-1-i][j]=tiles[row-2-i][j];
                    tiles[row-2-i][j]=temp;
                    }
                }
            } count--;  
        }
        //merge if equal
        count=row-2;
            for(int j=0; j<column; j++) {
                for(int i=0; i<row-1; i++) {
                    if(tiles[row-1-i][j]==tiles[row-2-i][j]) {
                        tiles[row-1-i][j]=(tiles[row-2-i][j])*2;
                        point=tiles[row-2-i][j];
                        tiles[row-2-i][j]=0;
//                        System.out.println(points);
                        while(count>0) {
                            if(tiles[row-1-i][j]==0) {
                                temp=tiles[row-1-i][j];
                                tiles[row-1-i][j]=tiles[row-2-i][j];
                                tiles[row-2-i][j]=temp;
                            } count--; 
                        }
                    }
                }
            }
            temp=0; count=row-2;
            while(count>0) {
                for(int j=0; j<column;j++) {
                    for(int i=1; i<row-1; i++) {
                        if(tiles[row-1-i][j]==0) {
                        temp=tiles[row-1-i][j];
                        tiles[row-1-i][j]=tiles[row-2-i][j];
                        tiles[row-2-i][j]=temp;
                    }
                }
            } count--;  
        } points = point;
    }
    private void ShowABCD(int row, int column, int[][] tiles) {
        for (int i=0; i<row; i++) {
            for (int j=0; j<column; j++) {
                if (tiles[i][j]==0) 
                    System.out.print("0\t");
                else if (tiles[i][j]==Math.pow(2,1))
                    System.out.print("a\t");
                else if (tiles[i][j]==Math.pow(2,2))
                    System.out.print("b\t");
                else if (tiles[i][j]==Math.pow(2,3))
                    System.out.print("c\t");
                else if (tiles[i][j]==Math.pow(2,4))
                    System.out.print("d\t");
                else if (tiles[i][j]==Math.pow(2,5))
                    System.out.print("e\t");
                else if (tiles[i][j]==Math.pow(2,6))
                    System.out.print("f\t");
                else if (tiles[i][j]==Math.pow(2,7))
                    System.out.print("g\t");
                else if (tiles[i][j]==Math.pow(2,8))
                    System.out.print("h\t");
                else if (tiles[i][j]==Math.pow(2,9))
                    System.out.print("i\t");
                else if (tiles[i][j]==Math.pow(2,10))
                    System.out.print("j\t");
                else if (tiles[i][j]==Math.pow(2,11))
                    System.out.print("k\t");
                else if (tiles[i][j]==Math.pow(2,12))
                    System.out.print("l\t");
                else if (tiles[i][j]==Math.pow(2,13))
                    System.out.print("m\t");
                else if (tiles[i][j]==Math.pow(2,14))
                    System.out.print("n\t");
                else if (tiles[i][j]==Math.pow(2,15))
                    System.out.print("o\t");
                else if (tiles[i][j]==Math.pow(2,16))
                    System.out.print("p\t");
                else if (tiles[i][j]==Math.pow(2,17))
                    System.out.print("q\t");
                else if (tiles[i][j]==Math.pow(2,18))
                    System.out.print("r\t");
                else if (tiles[i][j]==Math.pow(2,19))
                    System.out.print("s\t");
                else if (tiles[i][j]==Math.pow(2,20))
                    System.out.print("t\t");
                else if (tiles[i][j]==Math.pow(2,21))
                    System.out.print("u\t");
                else if (tiles[i][j]==Math.pow(2,22))
                    System.out.print("v\t");
                else if (tiles[i][j]==Math.pow(2,23))
                    System.out.print("w\t");
                else if (tiles[i][j]==Math.pow(2,24))
                    System.out.print("x\t");
                else if (tiles[i][j]==Math.pow(2,25))
                    System.out.print("y\t");
                else if (tiles[i][j]==Math.pow(2,26))
                    System.out.print("z\t");
                else
                    System.out.println("You broke the game. Congratulations.");
            }
            System.out.println(); 
            System.out.println();
        }
    }
    public void setUndo(Tile abcd,int[][] tiles,int row, int column,int[][] undo) {
        
        int [][] before = abcd.printBefore(row,column);
        for (int i = 0; i < row; i++) {
            System.arraycopy(before[i], 0, undo[i], 0, column);
        }
    }
    private void undo(int[][] tiles, int[][] undo, int row, int column) {
        for (int i = 0; i < row; i++) {
            System.arraycopy(undo[i], 0, tiles[i], 0, column);
        }
    }
    public void mainMovemonet(Tile abcd, Player user, int row, int column, int[][] tiles, int[][] undo ) {      //where it's all begun
        
        generateNewTile(row,column, tiles);
        ShowABCD(row,column,tiles);
        while(noPossibleMove(row,column, tiles)==false) {
            System.out.println("Enter 1 to quit.");
            System.out.print("Enter direction(w,a,s,d): ");
            char direction = sc.next().charAt(0);
            System.out.println();
            
            if(turn % 2==0){
                abcd.setBefore(tiles,row,column);
                System.out.println("Player 1 turn.");
                if (direction == 'd') {
                    Right(points,row,column, tiles);
                    abcd.setAfter(tiles,row,column);

                    if(abcd.compareBeforeAfter(row,column) == true) {
                        System.out.println("That is not a valid move");
                    }
                    else {
                        setUndo(abcd,tiles,row,column,undo);
                        generateNewTile(row,column, tiles);
                        ShowABCD(row, column, tiles);
                        System.out.println("Points: " + points);
                    }   
                }
                else if (direction == 'a') {
                    Left(points,row,column, tiles);
                    abcd.setAfter(tiles,row,column);
                    if(abcd.compareBeforeAfter(row,column) == true) {
                        System.out.println("That is not a valid move");
                    }
                    else {
                        setUndo(abcd,tiles,row,column,undo);
                        generateNewTile(row,column, tiles);
                        ShowABCD(row, column, tiles);
                        System.out.println("Points: " + points);
                    } 
                }
                else if (direction == 'w') {
                    Up(points,row,column, tiles);
                    abcd.setAfter(tiles,row,column);
                    if(abcd.compareBeforeAfter(row,column) == true) {
                        System.out.println("That is not a valid move");
                    }
                    else {
                        setUndo(abcd,tiles,row,column,undo);
                        generateNewTile(row,column, tiles); 
                        ShowABCD(row, column, tiles);
                        System.out.println("Points: " + points);
                    } 
                }
                else if (direction == 's') {
                    Down(points,row,column, tiles);
                    abcd.setAfter(tiles,row,column);
                    if(abcd.compareBeforeAfter(row,column) == true) {
                        System.out.println("That is not a valid move");
                    }
                    else {
                        setUndo(abcd,tiles,row,column,undo);
                        generateNewTile(row,column, tiles);
                        ShowABCD(row, column, tiles);
                        System.out.println("Points: " + points);
                    } 
                }
                else if (direction=='1')
                    break;
                else if (direction=='u') {
                  undo(tiles,undo,row,column);
                    ShowABCD(row, column, tiles);
                        System.out.println("Points: " + points);
                }
                else
                    System.out.println("Please enter a valid direction.");
                turn++;
                point1+=points;
            }
                if(turn % 2==1){
                abcd.setBefore(tiles,row,column);
                System.out.println("Player 1 turn.");
                if (direction == 'd') {
                    Right(points,row,column, tiles);
                    abcd.setAfter(tiles,row,column);

                    if(abcd.compareBeforeAfter(row,column) == true) {
                        System.out.println("That is not a valid move");
                    }
                    else {
                        setUndo(abcd,tiles,row,column,undo);
                        generateNewTile(row,column, tiles);
                        ShowABCD(row, column, tiles);
                        System.out.println("Points: " + points);
                    }   
                }
                else if (direction == 'a') {
                    Left(points,row,column, tiles);
                    abcd.setAfter(tiles,row,column);
                    if(abcd.compareBeforeAfter(row,column) == true) {
                        System.out.println("That is not a valid move");
                    }
                    else {
                        setUndo(abcd,tiles,row,column,undo);
                        generateNewTile(row,column, tiles);
                        ShowABCD(row, column, tiles);
                        System.out.println("Points: " + points);
                    } 
                }
                else if (direction == 'w') {
                    Up(points,row,column, tiles);
                    abcd.setAfter(tiles,row,column);
                    if(abcd.compareBeforeAfter(row,column) == true) {
                        System.out.println("That is not a valid move");
                    }
                    else {
                        setUndo(abcd,tiles,row,column,undo);
                        generateNewTile(row,column, tiles); 
                        ShowABCD(row, column, tiles);
                        System.out.println("Points: " + points);
                    } 
                }
                else if (direction == 's') {
                    Down(points,row,column, tiles);
                    abcd.setAfter(tiles,row,column);
                    if(abcd.compareBeforeAfter(row,column) == true) {
                        System.out.println("That is not a valid move");
                    }
                    else {
                        setUndo(abcd,tiles,row,column,undo);
                        generateNewTile(row,column, tiles);
                        ShowABCD(row, column, tiles);
                        System.out.println("Points: " + points);
                    } 
                }
                else if (direction=='1')
                    break;
                else if (direction=='u') {
                  undo(tiles,undo,row,column);
                    ShowABCD(row, column, tiles);
                        System.out.println("Points: " + points);
                }
                else
                    System.out.println("Please enter a valid direction.");
                turn++;
                point2+=points;
            }
            System.out.println();
            user.saveScore(points);
        }
        
        System.out.println("Game Over. Player 1 score is "+point1);
        System.out.println("Game Over. Player 2 score is "+point2);
        user.getScore();
        user.saveHighscoreToDat();
        
        user.showScore();
        
    }
}

    
}

