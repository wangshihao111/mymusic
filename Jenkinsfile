pipeline {
  agent {
    node {
      label 'node-build'
    }

  }
  stages {
    stage('node-build') {
      steps {
        nodejs('12.18.3') {
          sh '''yarn
yarn build'''
        }

      }
    }

  }
}