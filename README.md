# Vaccine Appointment System

It's a simple system where you can make an appointment for your vaccine. 

![VAS Main Page](https://github.com/nslcoder/vaccine-appointment-system/blob/main/screenshots/login.png)

## Dependencies: 

- tailwindcss
- bcrypt
- connect-ensure-login
- dotenv
- ejs
- express
- express-session
- method-override
- mongoose
- passport
- passport-local
- pdfkit
- uniqid

## What It Does:

- Registers a user account with name, email and password 
- Uses bcrypt to hash the password
- Uses Passport's local strategy to authenticate the user 
- Creates an appointment and saves it in the MongoDB database (One appointment for one user)
- Generates an appointment PDF and saves it in the filesystem
- Edits an appointment and regenerates the PDF
- Allows the user to view and print the PDF

## How It Looks Like:
![VAS Register](https://github.com/nslcoder/vaccine-appointment-system/blob/main/screenshots/register.png)

![VAS Dashboard](https://github.com/nslcoder/vaccine-appointment-system/blob/main/screenshots/dashboard.png)

![VAS Create Your Appointment](https://github.com/nslcoder/vaccine-appointment-system/blob/main/screenshots/create-your-appointment.png)

![VAS Edit Your Appointment](https://github.com/nslcoder/vaccine-appointment-system/blob/main/screenshots/edit-your-appointment.png)

## Sample Appointment PDF
![Sample Appointment PDF](https://github.com/nslcoder/vaccine-appointment-system/blob/main/screenshots/sample-vax-appointment.png)

## License
This project uses [the MIT License](https://github.com/nslcoder/vaccine-appointment-system/blob/main/LICENSE.md).