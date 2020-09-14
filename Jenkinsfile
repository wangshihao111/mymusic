pipeline {
  agent {
    node {
      label 'node_build'
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