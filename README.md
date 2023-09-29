# Chat API Backend Challenge

### Overview

This is a Nodejs based boilerplate which runs an HTTP Server configured to answer the endpoints defined in
the challenge you received. All endpoints are configured in `index.js` and if you go deeper to the controllers
for each route, you will find a _TODO_ comments where you are free to implement your solution.

### Running it locally

#### Prerequisites

**Node.js**: Ensure you have Node.js installed, preferably version 8.x or higher.

### How to run it

To run the application locally, run the following commands:

```
npm install
npm start
```

### Running it with Kubernetes

#### Prerequisites

- **Kubernetes Cluster**: You need access to a Kubernetes cluster. You can use a local setup like Minikube for this.

- **kubectl**: Make sure you have kubectl installed and configured to manage your Kubernetes cluster.

#### Deployment Steps

To run the application, follow these steps:

1. **Create Deployment**: Apply the deployment manifest to create instances of the application in the cluster. Run the following command from the root of the project:

   ```
   kubectl apply -f ./k8s/deployment.yaml
   ```

   Make sure **Minikube** or a similar tool is running.

2. **Get Access URL**: Once the deployment is finished, you can obtain the access URL for the application using the following command:

```
minikube service chat-api-service --url | awk -F/ '{print $3}'
```
