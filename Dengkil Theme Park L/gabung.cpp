#include<stdio.h>
void rent (int);
void disproom (int, int, int);	void receipt (int, int, int);	int sing= 35, doub= 35, super= 30, init, s= 0, d= 0, sp=0, si= 120, dou= 200, sups= 310, totals;
char yeno;
int aerie();
#define price_adult 50
#define price_c 30
#define GST 1.06
int syafiq();
int syafiq2();
#include<stdlib.h>
#define STOP 0
void HauntedHouse(int age, int height);
void RollerCoaster(int age, int height);
void FlyingFox(int age, int height);
void WaterSlide(int age, int height);
void FastSwing(int age, int height);

int main()
{
	int xx;
	while(xx!= 5)
	{
	printf("\n1. Parking\n");
	printf("2. Buying Ticket\n");
	printf("3. Check Condition\n");
	printf("4. Resort Booking\n");
	printf("5. Exit\n");
	
	printf("\nEnetr your selection: ");
	scanf(" %d",&xx);
	system("cls");
	if(xx == 2)
	{
		syafiq();	
	}
	if(xx==3)
	{
		syafiq2();
	}
	if(xx==4)
	{
		aerie();
	}
	system("cls");
	}
	
	
}


	
	int aerie ()
	
	{
		printf("____________________________________________________________\n\n");
		printf("Enter Y to rent room, N to exit :");
		scanf(" %c", &yeno);
		if (yeno== 'Y' || yeno== 'y')
		{
			init= 1;
		}
		else if (yeno== 'N' || yeno== 'n')
		{
			return 0;
		}
		rent (init);
	}
	
	void rent (int init)
	{
		if (init!=0)
		{	
			int r;
			char mr;
			disproom (sing, doub, super);
			printf("\n________________________\n");
			printf("Enter desired room");
			printf("\nType 1 for Single Room");
			printf("\nType 2 for Double Room");
			printf("\nType 3 for Superior Room");
			r= 1;
			
			while (r> 0)
			{	
				printf("\nRoom : ");
				scanf("%d", &r);
				if (r== 1)
				{
					--sing; 
					s+=1;
					break;
				
				}
				else if (r== 2)
				{
					--doub;
					d+=1;
					break;
				}
				else if (r== 3)
				{
					--super;
					sp+=1;
					break; 
				}
				else
				{
					printf("Wrong number");
					continue;
				}
			}
			receipt (si, dou, sups);
			printf("\n\nMore rooms (Y- Yes, N- No)?\n");
			scanf(" %c", &mr);
			printf("\n");
			if (mr== 'Y' || mr== 'y')
			{
				main ();
			}
		}
	}
	void disproom (int sing, int doub, int super)
	{
		printf("\n________________________________________\n");
		printf("Single room (RM 120)\t : %d rooms left\n", sing);
		printf("Double room (RM 200)\t : %d rooms left\n", doub);
		printf("Superior room (RM 310)\t : %d rooms left\n", super);
	}
	
	
	void receipt (int si, int dou, int sups)
	{
		printf("\n\nTotal payment:\n");
		totals= (si* s)+ (dou* d)+ (sups* sp);
		printf("RM %d", totals);
	}
	
	int syafiq()
{
	int age[1000];
	int code[1000];
	float height[1000];
	int i,j=0;
	char status;
	float price_t,total;
	//printf("j=%d\n",j);	
	FILE*fp1=fopen("code.txt","r+");
	while(!feof(fp1))
	{
			fscanf(fp1," %d",&code[j]);
			++j;
		
	}

//printf("j=%d\n",j);	
	while (status != 'n' )
	{
		code[j]=j*273+100000;
		
		printf("\nPlease enter the age: ");
		scanf(" %d",&age[j]);
		printf("Please enter the height: ");
		scanf(" %f",&height[j]);
		
		if (age[j]<=12 || age[j>= 55])
		{
			price_t=price_adult * GST;
		}
		if(age[j]>12 && age[j]<55 )
			price_t=price_c * GST;
		
	{
		fopen("code.txt","a+");
		fprintf(fp1,"%d\n",code[j]);
		fclose(fp1);
	}
	{
		FILE*fp2=fopen("age.txt","a+");
		fprintf(fp2,"%d\n",age[j]);
		fclose(fp2);
	}
	{
		FILE*fp3=fopen("height.txt","a+");
		fprintf(fp3,"%.2f\n",height[j]);
		fclose(fp3);
	}
	{
		FILE*fp4=fopen("income.txt","a++");
		fprintf(fp4,"%.2f\n",price_t);
		fclose(fp4);
	}
		printf("\nYour code: %d",code[j]);
		printf("\nDo you want to continue (Y / N): ");
		scanf(" %c",&status);
		
		if(status == 'Y' || status =='y')
			j++;
		
		total=total + price_t;
	}
	
	printf("\nTotal price: RM %.2f",total);
	
	return 0;
}

int syafiq2()
{
	int selector=1;
	int age[1000];
	float height[1000],b;
	int code,i,a,j,z,h;
	
	
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
	
	
	
