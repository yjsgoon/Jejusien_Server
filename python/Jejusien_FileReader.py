
# coding: utf-8

# In[18]:

import os
import numpy as np
from PIL import Image


# In[19]:

def label_name_to_number_array(label) :
    if label == 'cass':
        return np.array([1, 0, 0, 0, 0])
    elif label == 'jejusien':
        return np.array([0, 1, 0, 0, 0])
    elif label == 'guiness':
        return np.array([0, 0, 1, 0, 0])
    elif label == 'stella':
        return np.array([0, 0, 0, 1, 0])
    elif label == 'heineken':
        return np.array([0, 0, 0, 0, 1])


# In[20]:

def read_data_one(file_path):
    img = Image.open(file_path)
    label = os.path.basename(file_path).split('.')[0][:-1]
    img = img.resize((50,50),Image.ANTIALIAS)
    img = np.array(img, dtype=np.float32)
    img = img / 255
    return img, label_name_to_number_array(label)


# In[21]:

def read_data(folder_path):
    images = []
    labels = []

    for fn in os.listdir(folder_path):
        if fn[-3:] != 'jpg' :
            continue
        img, label = read_data_one(folder_path + "/" + fn)
        images.append(img)
        labels.append(label)
    dataSet = DataSet(np.array(images), np.array(labels))
    return dataSet


# In[22]:

class DataSet(object):
    def __init__(self, images, labels):
        self._images = images
        self._labels = labels
    
    @property
    def images(self):
        return self._images

    @property
    def labels(self):
        return self._labels


# In[ ]:



