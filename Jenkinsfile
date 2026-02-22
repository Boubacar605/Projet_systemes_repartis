pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = "bubacar1234"
        BACKEND_IMAGE = "backend"
        FRONTEND_IMAGE = "frontend"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('1 Clone GitHub') {
            steps {
                git url: 'https://github.com/Boubacar605/Projet_systemes_repartis.git', branch: 'main'
            }
        }

        stage('2 Lint & Test Backend') {
           steps {
            dir('backend') {
             sh '''
                python3 -m venv venv
                . venv/bin/activate
                python -m pip install --upgrade pip
                python -m pip install -r requirements.txt
                python -m pip install flake8
                flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics --exclude=venv
                deactivate
            '''
            }
          }
        }

        stage('3 Lint Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                        npm install
                    '''
                }
            }
        }

        stage('4 Build Backend Image') {
            steps {
                sh "docker build -t ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG} -f docker/backend.Dockerfile ."
            }
        }

        stage('5 Build Frontend Image') {
            steps {
                sh "docker build -t ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG} -f docker/frontend.Dockerfile ."
            }
        }

        stage('6 Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                }
            }
        }

        stage('7 Push Images') {
            steps {
                sh """
                    docker push ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG}
                    docker push ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG}
                """
                sh """
                    docker tag ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG} ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:latest
                    docker tag ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG} ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:latest
                    docker push ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:latest
                    docker push ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:latest
                """
            }
        }

        stage('8 Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    // Utilisation de guillemets doubles pour interpoler les variables Jenkins
                    sh """
                        sed -i "s|image:.*backend.*|image: ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG}|g" k8s/backend.yaml
                        sed -i "s|image:.*frontend.*|image: ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG}|g" k8s/frontend.yaml
                        kubectl apply -f k8s/postgres.yaml
                        kubectl rollout status deployment/postgres
                        kubectl apply -f k8s/backend.yaml
                        kubectl apply -f k8s/frontend.yaml
                        kubectl rollout status deployment/backend
                        kubectl rollout status deployment/frontend
                    """
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
        success {
            echo 'Pipeline terminé avec succès !'
        }
        failure {
            echo 'Échec du pipeline.'
        }
    }
}