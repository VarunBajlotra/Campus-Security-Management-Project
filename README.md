# Campus-Security-Management-Project

## Objective
The prime objective of the project is the development of a fully functional Security Management System that can be adopted by Institutions so as to ensure a safe working environment for every concerned individual. It aims at the implementation of the following essential features - 
1. Campus Entry-Exit System - A proper mechanism to monitor the entry and exit to the campus, and to determine the people present inside the campus at any given moment.
2. Gender Specific Hostel Entry System - A system to monitor the students attempting to enter the hostels. Only girls should be allowed to enter the hostels allocated to girls, and only boys in those allocated to boys.
3. Restricted Entry to certain areas - A system to monitor the entry to certain areas that contain information that is considered crucial and confidential.
4. Complaint Management System - A portal on which any person within the campus is able to file complaints regarding any possible issues - grievances, conflicts or cases of harassment.
5. 24 x 7 CCTV Surveillance - A system that enables security personnel to quickly access the footage recorded using the surveillance cameras. It is essential to ensure that almost every nook and corner of the campus must be under strict surveillance. 
The project aims to make a reliable, highly secure software that is scalable, flexible, portable and maintainable.

## Innovation
### 1. CAMPUS ENTRY EXIT MANAGEMENT
* To allow entry on campus to only authorized users, we have developed a system which requires the user to present his credentials - in the form of a USERNAME and a PASSWORD - at the entrance to the campus. 
* These credentials are then verified from the user database. Only if the credentials are valid, entry is granted. 
* The security personnel can view the details of all the users that are currently inside the campus, along with the time of their entry. In case of any unfortunate incident, it is easy to determine the people currently inside the campus.

### 2. ENTRY TO GIRLS’ HOSTEL - Safety for women
* In today’s world, it is the duty of a security system to make sure that women feel safe inside the campus. We have deployed MACHINE LEARNING TECHNIQUES to ensure the same.
* A picture of the person is clicked, and is passed to our Gender Classification Model.
  * Using a haar cascade face recognition algorithm, the face of the person is extracted. 
  * The face is passed on to the pre trained Caffe Model (based on Convolutional Neural Networks) which gives the probability of the face belonging to MALE and FEMALE classes. 
  * If it belongs to the FEMALE class, entry is granted. Otherwise, authorities are notified.
![Gender Classification using Machine Learning](https://github.com/VarunBajlotra/Campus-Security-Management-Project/blob/main/images/3.png)

### 3. ENTRY TO RESTRICTED AREAS
* Not everyone should be allowed to enter certain areas - Staff Rooms, Examination Department, Accounts Department, Cabins for professors, laboratories etc.
* Only staff members are allowed to enter these places
* This is monitored using a similar login system.

### 4. COMPLAINT MANAGEMENT SYSTEM
* Any user can file a complaint to the security portal telling about their location and their complaint description. The user immediately receives an auto generated system EMail containing the details of his/her complaint.
* Moreover, for ease in communication, the user is also promptly informed via an auto generated system SMS.
* These complaints are received by the personnel and they process the complaints.
* After a complaint is solved, the personnel have an option to mark it as resolved.
* The user is straight away informed via both EMail and SMS that his/her complaint has been resolved.
* The history of all the previous complaints can be viewed by the personnel.

### 5. 24x7 CCTV SURVEILLANCE
* The campus is monitored constantly by CCTV cameras to prevent any unfortunate accidents.
* The personnel can access the footage anytime in one click.

## Conclusion
The proposed project has been successfully completed well within the allocated time. Following are a few screenshots that depict the functioning of the various mentioned features.
