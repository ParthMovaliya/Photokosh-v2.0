# Photokosh-v2.0
## What is Photokosh-v2.0?
Photokosh-v2.0 aims to develop a face recognition-based photo segregation system that allows the process of organizing photos. Applying the concept of deep learning algorithms with the accuracy of face detection and face recognition, the system can provide users with an easy and efficient way to manage their images. The ultimate goal is to enhance productivity, save time, and improve the overall user experience in dealing with large volumes of photographs.

## Project Scope:
The potential applications of such a system are vast. Photographers, individuals, and businesses alike can benefit from an automated process that organizes photos into individual folders based on the faces present in the images. This enables efficient searching, retrieval, and management of images associated with specific individuals or groups, thus making the execution of the whole process much simpler.

The possible implications of such a system could be used in the fields of marriage and wedding photography, maybe a group tour, or any situation that includes a cluster of people and mages.

## Tools Used:
  - React JS
  - Python
  - MongoDB
  - Flask
  - Deep Learning
  - Javascript

## Face Detection:
The [face_recognition](https://github.com/ageitgey/face_recognition) library automatically detects the number of faces present in the picture. After detecting the face it determines the co-ordinates of the faces and crops it to cancel the noise. Example:

![image](https://github.com/siddharth6758/Photokosh-v2.0/assets/90406492/82be6576-27e4-400d-8205-9a683c6ef7d2)

credit https://github.com/ageitgey/face_recognition

## Face Recognition:
Face_recognition library after detecting face trains the model using the face features such as distance between nose and lips, distance between eyes, and various other features.

![image](https://github.com/siddharth6758/Photokosh-v2.0/assets/90406492/a9cf6915-f226-4a69-8d14-a8e771df5e6d)

credit https://github.com/ageitgey/face_recognition

## System Processes:
The following image depicts the activities that can be performed on the system.

  ![image](https://github.com/siddharth6758/Photokosh-v2.0/assets/90406492/c83f9b68-b3d9-422e-85ae-c1c5c0c21c23)

The activity/interaction of user is described in the following sequence diagram:

![image](https://github.com/siddharth6758/Photokosh-v2.0/assets/90406492/837a9ed7-dbcb-40e0-94a8-ec09bd732872)

The procedure followed by the photographer is described as follows:

![image](https://github.com/siddharth6758/Photokosh-v2.0/assets/90406492/2bfdb773-b00d-4ea1-a44f-3cc338bbf62e)


