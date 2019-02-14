## My Payments - Frontend
This is client-side of the project "My Payments".

##### Deployment order:
1) Clone this project;
2) Create files `environment.dev.ts` and `environment.prod.ts` from `src/environments/environment.ts` in the same folder;
3) Before configuration these files you have to create developer accounts at [Google](https://console.developers.google.com) and [Stripe](https://dashboard.stripe.com/account/apikeys) for using Google authentication and making payments by Stripe;
4) Configure `environment.dev.ts` like in the sample `src/environments/environment.ts`;
5) Run `npm install` to install all libraries;
6) Start project `npm start`.

### Project details
##### About project
Donation project where a user can donate using Stripe service checks his transactions list and see different statistics of all payments within the application.

##### Technology stack:
1. Angular;
2. Google OAuth (client side);
3. Stripe (client side);
4. RxJS;
5. Material.io;
6. amCharts 4 (graphs library).

##### Authorization:
A user can authorize in the application using Google OAuth. When a user
authorized he has an option to switch dashboard to view his own spends within the application.

##### Donation:
A user is able to donate the sum of money from $1 to $15 using Stripe.

##### Dashboard:
When a user opens the application, he can see a dashboard with three charts where he can see statistic of all payments within the application:
1. Amount of users who have donate;
2. Amount of payment, - sum of usual payments;
3. Amount of money obtained by application from users.

##### Transaction:
A user can navigate to “Transactions” page where he can see list of all his transaction with their statuses and error messages.
