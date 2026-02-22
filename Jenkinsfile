pipeline {
    agent any

    environment {
        DOCKER_USER = "bubacar1234"
        BACKEND_IMAGE = "backend"
        FRONTEND_IMAGE = "frontend"
        TAG = "latest"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/Boubacar605/Projet_systemes_repartis.git', branch: 'main'
            }
        }

        stage('Build Images') {
            steps {
                sh '''
                docker build -t $DOCKER_USER/backend:latest -f docker/backend.Dockerfile .
                docker build -t $DOCKER_USER/frontend:latest -f docker/frontend.Dockerfile .
                '''
            }
        }

        stage('Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                docker push $DOCKER_USER/backend:latest
                docker push $DOCKER_USER/frontend:latest
                '''
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                sh '''
                kubectl apply -f k8s/
                kubectl get pods
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
    }
}