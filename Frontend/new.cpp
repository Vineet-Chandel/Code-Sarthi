#include <stdio.h>
#include <stdlib.h>


struct Node {
    int data;
    struct Node* next;
};

int main(){
    struct Node* head = NULL, *temp, *newNode;
    int i,n;
    printf("Enter the number of nodes:");
    scanf("%d", &n);
    //creating linked list
    for (i=0;i<=n;i++){
        newNode=(struct Node*)malloc(sizeof(struct Node));
        printf("Enter the value of the % ");
        
    }


    return 0;
}