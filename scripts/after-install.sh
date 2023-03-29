#!/bin/sh

cd /home/ubuntu/dm2023-next

# test
sudo docker stop dm2023-next
sudo docker rm dm2023-next

sudo docker build -t dm2023-next .
sudo docker run -d -p 80:3000 --name dm2023-next dm2023-next