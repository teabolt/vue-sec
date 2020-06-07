# Optionally run the mysql server through Docker
sudo docker run \
  --name vuesec-db \
  -p 3306:3306 \
  --env-file=mysql.env \
  -d mysql:8.0
