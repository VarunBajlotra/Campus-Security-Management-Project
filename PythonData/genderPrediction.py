import cv2
import numpy as np
import matplotlib.pyplot as plt
import imutils
import sys
import urllib.request as urll

url = sys.argv[1]
# print(url)

def url_to_image(url):
    resp = urll.urlopen(url)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    return image

genderNet = cv2.dnn.readNetFromCaffe('./PythonData/deploy_gender.prototxt', './PythonData/gender_net.caffemodel')

def predict(img):
    MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
    blob = cv2.dnn.blobFromImage(img, 1, (227, 227),MODEL_MEAN_VALUES,swapRB=False)
    
    genderList = ['MALE','FEMALE']
    
    genderNet.setInput(blob)
    genderProbs = genderNet.forward()
    gender = genderList[np.argmax(genderProbs[0])]
    gender = 'male' if genderProbs[0][0] > 0.2 else 'female'
    # return {'gender':gender, 'male':genderProbs[0][0], 'female':genderProbs[0][1]}
    return gender

img = url_to_image(url)
img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)

print(str(predict(img)),end="")
