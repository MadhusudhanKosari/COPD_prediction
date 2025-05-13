Title: COPD Risk Prediction System Using Machine Learning
________________________________________
Submitted by:
•	Madhusudhan Kosari
•	Sruvana
•	Achyuth
•	Saishesh
•	Vivek Vardhan Reddy
Under the guidance of:
•	Srinivasarao Sir (Project Guide)
•	Pallavi Lanke (Domain Incharge)
Institution:
B V Raju Institute of Technology
Course:
HTML, CSS, JavaScript, Python, Flask, and Machine Learning
________________________________________
Abstract
Chronic Obstructive Pulmonary Disease (COPD) is a progressive respiratory illness that significantly affects the quality of life. Early detection and timely intervention can prevent complications and support lifestyle changes. This project presents a machine learning-based COPD prediction system that evaluates risk levels based on lifestyle and medical inputs provided by the user. The system uses multiple ML models with a Voting Classifier to enhance accuracy and provides real-time risk prediction along with further assistance like doctor connectivity.
________________________________________
Table of Contents
1.	Introduction
2.	Problem Statement
3.	Objectives
4.	Literature Survey
5.	System Architecture
6.	Design Specification
7.	Implementation
8.	UI Screens (To be added manually)
9.	Charts and Graphs (To be added manually)
10.	Results
11.	Conclusion
12.	Future Scope
13.	References
14.	Acknowledgements
________________________________________
1. Introduction
COPD is a life-threatening condition that includes diseases such as emphysema and chronic bronchitis. A system that can predict the risk levels based on health and lifestyle data will allow users to take preventive measures early. Our proposed system applies data-driven methods to predict the risk and educate users about better health decisions.
________________________________________
2. Problem Statement
Early symptoms of COPD are often ignored due to lack of awareness. Manual detection is time-consuming and expensive. A web-based solution that collects relevant inputs and provides a prediction using machine learning is essential to raise awareness and guide users to make informed decisions.
________________________________________
3. Objectives
•	To build a user-friendly web interface for data entry
•	To develop a robust machine learning model for COPD prediction
•	To ensure accurate predictions using ensemble techniques
•	To assist high-risk users in connecting with medical experts
•	To visualize insights and suggestions in an engaging way
________________________________________
4. Literature Survey
Numerous studies have shown success in predicting chronic diseases using machine learning. However, very few focus specifically on COPD with real-time interfaces. Our work bridges the gap between theoretical models and practical application using Flask for deployment and ensemble ML for improved accuracy.
________________________________________
5. System Architecture
•	Frontend: HTML, CSS, JavaScript
•	Backend: Python, Flask
•	Machine Learning: Logistic Regression, Random Forest, KNN, Voting Classifier
•	Database: SQLite
Architecture Diagram: 
			 
________________________________________
6. Design Specification
Input Features:
•	Age
•	Smoking status
•	Number of cigarettes per day
•	Exercise frequency
•	Family history of respiratory issues
•	Cough frequency and severity
Output:
•	COPD Risk Level: Low / High
________________________________________
7. Implementation
•	Dataset used: 265 real/patient-simulated records
•	ML Models trained and evaluated using accuracy, precision, recall
•	Voting Classifier selected for final prediction due to highest accuracy (~98%)
•	Flask used to serve predictions via web interface
Code Snippets and Algorithms: 
		 
________________________________________
8. UI Screens

  
________________________________________
9. Charts and Graphs
 ________________________________________
10. Results
•	Achieved 98% accuracy on validation data using Voting Classifier
•	Real-time risk classification with user-friendly interface
•	Provided actionable feedback for lifestyle changes
________________________________________
11. Conclusion
This project successfully combines machine learning and web technologies to create a proactive health system. The platform is scalable, informative, and beneficial for early identification of COPD risk.
________________________________________
12. Future Scope
•	Integration with wearable devices for continuous monitoring
•	Adding multilingual support for wider reach
•	Direct appointment booking feature for high-risk users
•	Mobile app version for improved accessibility
________________________________________
13. References
•	Liu G, Hu J, Yang J, Song J. 2024. Predicting early-onset COPD risk in adults aged 20–50 using electronic health records and machine learning. PeerJ 12. DOI: 10.7717/peerj.16950. 
•	 Huang C.-H., Chou K.-T., Perng D.-W., Hsiao Y.-H., Huang C.-W. 2024. Using Machine Learning with Impulse Oscillometry Data to Develop a Predictive Model for Chronic Obstructive Pulmonary Dis ease and Asthma. Journal of Personalized Medicine 14(4):398. DOI: 10.3390/jpm14040398. 
•	Tu J.-B., Liao W.-J., Liu W.-C., Gao X.-H. 2024. Using machine learning techniques to predict the risk of osteoporosis based on nationwide chronic disease data. Scientific Reports 14:5245. DOI: 10.1038/s41598 024-56114-1.
•	 Smith L.A., Oakden-Rayner L., Bird A., Zeng M., To M.-S., Mukherjee S., Palmer L.J. (2023). Machine learning and deep learning predictive models for long-term prognosis in patients with chronic obstructive pulmonary disease: a systematic review and meta-analysis. Lancet Digital Health, 5, e872–81. 
•	Chen Y., Yu Y., Yang D., Zhang W., Kouritas V., Chen X. (2024). Developing and validating machine learning-based prediction models for frailty occurrence in those with chronic obstructive pulmonary disease. Journal of Thoracic Disease, 16(4), 2482-2498. DOI: 10.21037/jtd-24 416. 
•	Arnold M., Liou L., Boland M.R. (2024). Development and Opti mization of Machine Learning Algorithms for Predicting In-hospital Patient Charges for Congestive Heart Failure Exacerbations, Chronic Obstructive Pulmonary Disease Exacerbations and Diabetic Ketoacido sis. BioData Mining. DOI: 10.1186/s13040-024-00387-9. 
•	Balasubramanian, S., & Rajadurai, P. (2023). Machine Learning Based Classification of Pulmonary Diseases through Real-Time Lung Sounds. International Journal of Engineering and Technology Innova tion. https://doi.org/10.46604/ijeti.2023.12294 
•	Husnain, A., Hussain, H. K., Shahroz, H. M., Ali, M., & Hayat, Y. (2024). A Precision Health Initiative for Chronic Conditions: Design and Cohort Study Utilizing Wearable Technology, Machine Learning, and Deep Learning. International Journal of Advanced Engineering Technologies and Innovations, 1(2), 118–139.
•	Ramalingam, R., & Chinnaiyan, V. (2023). A comparative analysis of chronic obstructive pulmonary disease using machine learning and deep learning. International Journal of Electrical and Computer Engineering, 13(1), 389-399.https://doi.org/10.11591/ijece.v13i1.pp389-399 
•	 Wang, X., Ren, H., Ren, J., et al. (2023). Machine learning-enabled risk prediction of chronic obstructive pulmonary disease with unbalanced data. Computer Methods and Programs in Biomedicine, 230, 107340. https://doi.org/10.1016/j.cmpb.2023.107340 
•	Reddy, S. M., Lokesh, N., Makala, B. P., & Charan, P. V. (2024). Chronic Obstructive Pulmonary Detection Using Machine Learning Techniques. In Proceedings of the 5th International Conference for Emerging Technology (INCET), Karnataka, India, May 24-26. IEEE. https://doi.org/10.1109/INCET61516.2024.10593632
•	 Zeng, S., Arjomandi, M., Tong, Y., Liao, Z. C., & Luo, G. (2022). Developing a Machine Learning Model to Predict Severe Chronic Obstructive Pulmonary Disease Exacerbations: Retrospective Cohort Study. Journal of Medical Internet Research, 24(1), e28953. https://doi.org/10.2196/28953
________________________________________
14. Acknowledgements
We sincerely thank our guide Srinivasarao Sir for his consistent mentorship and support. We also thank Pallavi Lanke, our domain incharge, for her insights and encouragement. Lastly, we acknowledge B V Raju Institute of Technology for providing the platform and resources to execute this project.

