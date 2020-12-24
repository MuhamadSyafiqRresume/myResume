#include<stdio.h>

int main()
{
	int i=0;
	int code[1000];
	int age[1000];
	float height[1000];


	
	int x;
	
	 	FILE*fp1=fopen("code.txt","r+");
  while (!feof(fp1))
  {
  	fscanf(fp1,"%d",&code[i]);
  	i++;
  }
  i=0;
  	FILE*fp2=fopen("age.txt","r+");
  while (!feof(fp2))
  {
  	fscanf(fp2,"%d",&age[i]);
  	i++;
  }
  i=0;
  FILE*fp3=fopen("height.txt","r+");
  while (!feof(fp3))
  {
  	fscanf(fp3,"%d",&height[i]);
  	i++;
  }
	for(x=0;x<=i;++x)
	{
		printf("%d\t%d\t%.2f\n",code[x],age[x],height[x]);
	}
	return 0;
}
