pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = "boubacar1234"
        BACKEND_IMAGE = "${DOCKER_HUB_USER}/backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "${DOCKER_HUB_USER}/frontend:${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Boubacar605/Projet_systemes_repartis.git'
            }
        }

        stage('Lint Backend (simulé)') {
            steps {
                echo "Linting backend OK (simulé)"
            }
        }

        stage('Lint Frontend (simulé)') {
            steps {
                echo "Linting frontend OK (simulé)"
            }
        }

        stage('Build Backend Image') {
            steps {
                sh "docker build -t ${BACKEND_IMAGE} -f docker/backend.Dockerfile ."
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh "docker build -t ${FRONTEND_IMAGE} -f docker/frontend.Dockerfile ."
            }
        }

        stage('Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh """
                    docker push ${BACKEND_IMAGE}
                    docker push ${FRONTEND_IMAGE}
                """
            }
        }

         stage('Start Minikube') {
            steps {
                sh '''
                if ! minikube status | grep -q "Running"; then
                    minikube start --driver=docker --cpus=2 --memory=4096
                else
                    echo "Minikube already running"
                fi
                '''
            }
        }

      stage('Deploy to Kubernetes') {
            steps {
                sh '''
                set -e
                export KUBECONFIG=/var/lib/jenkins/.kube/config

                sed -i "s|image:.*backend.*|image: ${BACKEND_IMAGE}|g" k8s/backend.yaml
                sed -i "s|image:.*frontend.*|image: ${FRONTEND_IMAGE}|g" k8s/frontend.yaml

                kubectl apply -f k8s/
                kubectl rollout status deployment/backend --timeout=600s
                kubectl rollout status deployment/frontend --timeout=600s
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        success {
            echo "Pipeline terminé avec succès !"
        }
        failure {
            echo "Pipeline échoué."
        }
    }
}