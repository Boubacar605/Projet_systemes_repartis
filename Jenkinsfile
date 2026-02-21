pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = "boubacar1234"
        IMAGE_NAME = "mon-projet"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('1 Clone GitHub') {
            steps {
                git url: 'https://github.com/Boubacar605/Projet_systemes_repartis.git', branch: 'main'
            }
        }

        stage('2 Build Docker Image') {
            steps {
                sh '''
                docker build -t $DOCKER_HUB_USER/$IMAGE_NAME:$IMAGE_TAG ./docker
                '''
            }
        }

        stage('3 Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'boubacar1234',
                    passwordVariable: 'BUBA132002'
                )]) {
                    sh '''
                    echo $PASSWORD | docker login -u $USERNAME --password-stdin
                    '''
                }
            }
        }

        stage('4 Push Image') {
            steps {
                sh '''
                docker push $DOCKER_HUB_USER/$IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }

        stage('5 Deploy') {
            steps {
                sh '''
                docker-compose down || true
                docker-compose up -d
                '''
            }
        }
    }
}