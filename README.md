# HOW TO

Sul peab olema eelnevalt installitud:
* Node.js

Consolis, root kausta kirjuta `npm install`

Seejärel kirjuta `npm start`

## Production setup:
### On second run ignore steps 2.*

Step 1: Create/update Docker Image
`docker build -t dekons/parkla_frontend .`

Step 2.1: Tag the Image
`docker tag dekons/parkla_frontend dekons/parkla_frontend:latest`

Step 2.2: Login to docker hub (password is stored in password.txt)
`cat password.txt | docker login --username dekons --password-stdin`

Step 3: Push Image to Dockerhub
`docker push dekons/parkla_frontend:latest`