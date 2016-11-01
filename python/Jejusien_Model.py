
# coding: utf-8

# In[1]:

#!/usr/bin/python
import sys
import tensorflow as tf


# In[2]:

x = tf.placeholder("float", shape=[None, 50,50,3], name="x")
y_ = tf.placeholder("float", shape=[None, 5], name="y_")

def weight_variable(shape):
    initial = tf.truncated_normal(shape, stddev=0.1)
    return tf.Variable(initial)

def bias_variable(shape):
    initial = tf.constant(0.1, shape=shape)
    return tf.Variable(initial)

def conv2d(x, W):
    return tf.nn.conv2d(x, W, strides=[1, 1, 1, 1], padding='SAME')

def max_pool_2x2(x):
    return tf.nn.max_pool(x, ksize=[1, 2, 2, 1], strides=[1, 2, 2, 1], padding='SAME')

W_conv1 = weight_variable([5, 5, 3, 32])
b_conv1 = bias_variable([32])

h_conv1 = tf.nn.relu(conv2d(x, W_conv1) + b_conv1)
h_pool1 = max_pool_2x2(h_conv1)

W_conv2 = weight_variable([5, 5, 32, 64])
b_conv2 = bias_variable([64])

h_conv2 = tf.nn.relu(conv2d(h_pool1, W_conv2) + b_conv2)
h_pool2 = max_pool_2x2(h_conv2)

W_fc1 = weight_variable([13 * 13 * 64, 32])
b_fc1 = bias_variable([32])

h_pool2_flat = tf.reshape(h_pool2, [-1, 13*13*64])
h_fc1 = tf.nn.relu(tf.matmul(h_pool2_flat, W_fc1) + b_fc1)

keep_prob = tf.placeholder("float", name="keep_prob")
h_fc1_drop = tf.nn.dropout(h_fc1, keep_prob)

W_fc2 = weight_variable([32, 5])
b_fc2 = bias_variable([5])

y_conv=tf.nn.softmax(tf.matmul(h_fc1_drop, W_fc2) + b_fc2)

cross_entropy = -tf.reduce_sum(y_*tf.log(y_conv))

train_step = tf.train.AdamOptimizer(1e-4).minimize(cross_entropy)
correct_prediction = tf.equal(tf.argmax(y_conv,1), tf.argmax(y_,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, "float"))

sess = tf.Session()
sess.run(tf.initialize_all_variables())


# In[3]:

from Jejusien_FileReader import read_data_one


# In[4]:

img_path = sys.argv[1]


# In[5]:

one_img,foo  = read_data_one(img_path)


# In[7]:

one_img = one_img.reshape(1,50,50,3)


# In[8]:

saver = tf.train.Saver()

# Later, launch the model, use the saver to restore variables from disk, and
# do some work with the model.
with tf.Session() as sess:
    saver.restore(sess, "./model/model.ckpt")
    feed_dict = {x: one_img, keep_prob: 1.0}
    classification = sess.run(tf.argmax(y_conv,1), feed_dict)
    label = classification[0]


# In[9]:

if label == 0 :
    print('cass')
elif label == 1:
    print('jejusien')
elif label == 2:
    print('guiness')
elif label == 3:
    print('stella artois')
elif label == 4:
    print('heineken')


# In[ ]:



