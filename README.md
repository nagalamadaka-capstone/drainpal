# <img width="25" alt="Screen Shot 2022-08-09 at 11 51 03 AM" src="https://user-images.githubusercontent.com/77798750/183738338-2cec0138-cc2f-4a68-b8ee-b1ba1fad96b8.png"> DrainPal 



## 🧐 Project Philosophy
DrainPal was developed as a tool to bridge the communication gap between patients receiving palliative care interventions and providers. This provides patients with support while simultaneously preventing emergency room visits and readmissions. Patients are able to log their symptoms for each day, including drain color and drain output volume. They are also able to troubleshoot any problems they are facing with the troubleshooting feature. Providers are able to log in and view their patients' symptoms over time. Providers are also able to view any alarming patients based on drain color. It currently only supports patients who have percutaneous nephrostomy tubules (when patients with failing kidneys need to drain their waste), but will expand to support more drain types as well. 

## ⚡ Key Features
- user login and account creation
- login option with Facebook
- patients can track drain data and symptoms each day
- patients can view past logs
- patients are able to troubleshoot drain issues
- providers can view all their patients' logs
- providers see graphs of patient progress over time
- providers see and filter alarming patients (based on drain color)
- all users can edit their profile information

## 👨‍💻 Tech Stack

Here's a brief high-level overview of the tech stack that DrainPal uses:
- React framework front end
- express server back end to handle all routes
- Parse database to store user data and handle authentication
- Firebase to store user images (due to Parse's file size limit)
- Imagga API to handle color extraction of images

## ✍️ Contributing
Interested in contributing to DrainPal? Thanks so much for your interest! I am always looking for improvements to this project and appreciate any contributions. Please reach out to me at preeti_nagalamadaka@brown.edu if you would like to contribute!

## 🌟 Acknowledgements
I would like to thank David Yi and Ben Gorman for their continued support and advice while developing this project.
