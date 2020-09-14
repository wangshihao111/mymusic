pipeline {
  agent {
    docker {
      image 'node:alpine'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh '''npm install

npm run build'''
      }
    }

    stage('Docker build') {
      steps {
        sh 'docker build -t test-ci-build .'
      }
    }

  }
}