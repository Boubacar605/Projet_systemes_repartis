pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = "bubacar1234"
        BACKEND_IMAGE = "backend"
        FRONTEND_IMAGE = "frontend"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('1 Clone GitHub') {
            steps {
                git url: 'https://github.com/Boubacar605/Projet_systemes_repartis.git', branch: 'main'
            }
        }

        stage('2 Build Backend') {
            steps {
                sh '''
                docker build -t $DOCKER_HUB_USER/$BACKEND_IMAGE:$IMAGE_TAG ./backend
                '''
            }
        }

        stage('3 Build Frontend') {
            steps {
                sh '''
                docker build -t $DOCKER_HUB_USER/$FRONTEND_IMAGE:$IMAGE_TAG ./frontend
                '''
            }
        }

        stage('4 Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                    sh '''
                    echo $PASSWORD | docker login -u $USERNAME --password-stdin
                    '''
                }
            }
        }

        stage('5 Push Images') {
            steps {
                sh '''
                docker push $DOCKER_HUB_USER/$BACKEND_IMAGE:$IMAGE_TAG
                docker push $DOCKER_HUB_USER/$FRONTEND_IMAGE:$IMAGE_TAG
                '''
            }
        }

        stage('6 Deploy Kubernetes') {
            steps {
                sh '''
                kubectl apply -f k8s/
                '''
            }
        }
    }
}