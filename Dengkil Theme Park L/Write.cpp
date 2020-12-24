#include<stdio.h>
#define price_adult 50
#define price_c 30
#define GST 1.06

int main()
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
