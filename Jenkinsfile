pipeline {
  agent {
    node {
      label 'node_build'
    }

  }
  stages {
    stage('node-build') {
      steps {
        sh '''yarn
yarn build
'''
      }
    }

  }
}