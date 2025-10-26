#include <iostream>
#include <string>
#include <cstdlib> // pentru srand() și rand()
#include <ctime>   // pentru time()
#include <iomanip> // pentru setprecision
#include <algorithm> //pentru functia fill()

using namespace std;

// double balanta(double balance);
// double deposit();
// double withdraw(double balance);

int main()
{
    // string nume, adresa;
    // int varsta;

    // cout << "Numele tau? ";
    // getline(cin>>ws, nume);  // Citeste cu tot cu spatii
   
    //  cout << "Adresa ta? ";
    //  getline(cin>>ws, adresa);  // Citeste cu tot cu spatii
      

    //  cout << "Varsta ta? ";
    //  cin >> varsta;

    // // Afișare
    // cout << "Nume: " << nume << endl;
    // cout << "Varsta: " << varsta << endl;
    // cout << "Adresa: " << adresa << endl;

    /************************************/

    // srand(time(NULL)); // initializează generatorul de numere aleatoare , fara el ar fi acelasi numar de fiecare data mai jos

    // int numar=(rand()%100)+1; // numar intre 1 si 100
    // int nr=rand()%100; // numar intre 0 si 99

    // cout<<"Numarul generat este: "<<numar<<endl;


    /****************************/

    // srand(time(NULL));
    // int numar;
    // int  raspuns;
    // int incercari=0;

    // raspuns=(rand()% 100)+1;

    // do{
    //     cout<<"Da un numar intre 1-100: ";
    //     cin>>numar;
        
    //     if(numar>raspuns)
    //         cout<<"Prea mare\n";
    //     if(numar<raspuns)
    //         cout<<"Prea mic\n";
    //     if(numar!=raspuns)
    //     cout<<"Mai incearca...\n";
    //     incercari++;
    // }while(numar!=raspuns);

    // cout<<"Ai ghicit numarul "<<raspuns<< " in "<<incercari <<" incercari"<<endl;

    /****************************************************************/

//     int optiune;
//     double balance=0;
    
//     do
//     {
//     cout<<"\n*********************\n";
//     cout<<"Welcome to the bank! Choose from an option below: \n";
//     cout<<"1. Show balance\n";
//     cout<<"2. Deposit money\n";
//     cout<<"3. Withdraw money\n";
//     cout<<"4. Exit\n";

//     cin>>optiune;

//     switch(optiune)
//     {
//         case 1: 
//                 balanta(balance);
//                 break;
//         case 2:
//                 balance+=deposit();
//                 balanta(balance);
//                 break;
//         case 3:
//                 balance-=withdraw(balance);
//                 balanta(balance);
//                 break;
//         case 4:
//                 cout<<"Thanks for visiting!";
//                 break;
//         default:
//                 cout<<"Invalid option!";
//                 break;
//     }


//     }while(optiune!=4);

//     return 0;
// }
// double balanta(double balance)
// {

//     cout<<"Your balance is "<<setprecision(2)<<fixed<<balance<<" $";



// };
// double deposit()
// {
//     int suma;
//     do
//     {
//     cout<<"Enter amount to deposit: ";
//     cin>>suma;
//     if(suma<=0)
//     {
//         cout<<"Invalid amount!";
//         return 0;
//     }
//     }while(suma<=0);
    
//     return suma;
// };
// double withdraw(double balance)
// {
//     int suma;
//     do
//     {    
//     cout<<"Enter amount to withdraw: ";
//     cin>>suma;

//     if(suma>balance)
//     {
//         cout<<"Insufficient funds!\n";
//         return 0;
//     }       
//     }while(suma>balance);
   
//     return suma;
// };

        /************************************************************************************************* */

        // const int SIZE=33;
        // string nume[SIZE];

        // fill(nume,nume+(SIZE/3),"radu");
        // fill(nume+(SIZE/3),nume+(SIZE/3)*2,"gabi");
        // fill(nume+(SIZE/3)*2,nume+(SIZE),"paceana");

        // for(string valori : nume)    // for(tipul de data + elementele din array, array) , same cu for(int i=0;i<SIZE;i++)
        //     cout<<valori<<endl;


        /*************************************************************************************************/


        //template <typename T>   // face functia max indiferenta de tipul datelor cu care lucreaza
        // auto max(T a, T b)
        // {
        //     return (a>b)? a : b;
        // }       

return 0;
}