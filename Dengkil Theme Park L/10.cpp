#include<stdio.h>
#include<stdlib.h>
#define STOP 0
void HauntedHouse(int age, int height);
void RollerCoaster(int age, int height);
void FlyingFox(int age, int height);
void WaterSlide(int age, int height);
void FastSwing(int age, int height);


int main()
{
	int selector=1;
	int age[1000];
	float height[1000],b;
	int code,i,a,j,z,h;
	
	while (selector!=STOP)
	{
	
		printf("\n********WELCOME TO THE DENGKIL WATER PARK**********\n");
		printf("********ENTER 0 TO END THE PROGRAM.*******\n");
		printf("\n\n1. Haunted House\n");
		printf("2. Roller Coaster\n");	
		printf("3. Flying Fox\n");
		printf("4. Water Slide\n");
		printf("5. Hyper Swing\n");
		
		printf("\nPlease enter your code: ");
		scanf("%d",&code);
	
		j=((code-100000)/273)-1;
		//printf("j=%d\n",j);
		
		
		FILE*fp1 = fopen("age.txt","r");
   	
   		
   		while (!feof(fp1))
 	 	{
  			fscanf(fp1,"%d",&age[i]);
  
  			i++;
 		 }
 		 
 		i=0;
 		 a=age[j];
 		 printf("Age=%d\n",age[j]);
 	
			FILE*fp2 = fopen("height.txt","r");
   		
   		while (!feof(fp2))
 	 	{
  			fscanf(fp2,"%f",&height[i]);
  
  			i++;
 		}
 
 		b=height[j];
 		printf("Height=%.2f\n",height[j]);
	
		printf("\n\nPlease enter the game code to check your requirement: ");
		scanf(" %d",&selector);
		system("cls");
		if(selector==1)
		{
			HauntedHouse(a,b);
		}
		else if(selector==2)
		{
		RollerCoaster(a,b);
		}
		else if (selector==3)
		{
			FlyingFox(a,b);
		}
		else if (selector==4)
		{
			WaterSlide(a,b);
		}
		else if (selector==5)
		{
			FastSwing(a,b);
		
		}
		else if (selector== 0)
		{
		
		}
		else
		{
			printf("\nInvalid code!!!");
		}
		printf("\nEnter anything to continue.");
		scanf(" %c",&h);
		system("cls");
}

	return 0;
}


void HauntedHouse(int age, int height)
{
	if (age>12 && age<50)
	{
		printf("\nYou are allowed to enter the Haunted House.\n");
		printf("Enjoy your ride.Thank you.\n");
	}
	else
	printf("You are not allowed to enterthe Haunted House\n");
	
	return;
}

void RollerCoaster(int age, int height)
{
	if (age>12 && height>112 && age<50)
	{
		printf("\nYou are allowed to ride the Roller Coaster.\n");
		printf("Enjoy your ride.Thank you.\n");
	}
	else
	printf("You are not allowed to ride the Roller Coaster.\n");

	return;
}

void FlyingFox(int age, int height)
{
	if (age>10 && height> 100 &&age< 55)
	{
		printf("\nYou are allowed to ride the Flying Fox.\n");
		printf("Enjoy your ride.Thank you.\n");
	}
	else
	printf("You are not allowed to ride the Flying Fox.\n");
	
	return;
}
	
	void WaterSlide(int age, int height)
{
	if (age>8 && height> 70 &&age< 55)
	{
		printf("\nYou are allowed to slide at Water Slide.\n");
		printf("Enjoy your day.Thank you.\n");
	}
	else
	printf("You are not allowed to slide at Water Slide.\n");
	
	return;
}
	void FastSwing(int age, int height)
{
	if (age>10 && height> 90 &&age< 50)
	{
		printf("\nYou are allowed to play at Hyper Swing.\n");
		printf("Enjoy the swing.Thank you.\n");
	}
	else
	printf("You are not allowed to play at Hyper Swing.\n");
	
	return;
}
	
	
	
	
	
