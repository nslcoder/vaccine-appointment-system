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

## How It Works:

Fill up the appointment form and submit. You are then taken to your appointment PDF file. It has important details such as name, gender, birthdate, address, email ID, mobile number, place where you want to take the vaccine, vax administration date and lastly a unique vaccine appointment ID. Save the file in your local device.

On the backend, your form data is deconstructed and a unique ID is generated. Using the individuals pieces of data and the ID, a document related to your appointment is created and saved in a MongoDB database. Then a PDF file with your appointment information is generated and saved in the filesystem. Once all this is done, you get redirected to your file from the form page.

## How It Looks Like:
![VAS Register](https://github.com/nslcoder/vaccine-appointment-system/blob/main/screenshots/register.png)

![VAS Dashboard](https://github.com/nslcoder/vaccine-appointment-system/blob/main/screenshots/dashboard.png)

![VAS Create Your Appointment](https://github.com/nslcoder/vaccine-appointment-system/blob/main/screenshots/create-your-appointment.png)

![VAS Edit Your Appointment](https://github.com/nslcoder/vaccine-appointment-system/blob/main/screenshots/edit-your-appointment.png)

## Sample Appointment PDF
![Sample Appointment PDF](https://github.com/nslcoder/vaccine-appointment-system/blob/main/screenshots/sample-vax-appointment.png)

## License
This project uses [the MIT License](https://github.com/nslcoder/vaccine-appointment-system/blob/main/LICENSE.md).