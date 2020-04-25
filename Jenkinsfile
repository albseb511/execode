pipeline {
  agent {
    docker {
      args '-p 3000:3000'
      image 'jenkinsci/blueocean'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'cd client/src'
        sh '''echo "{
  "build": {
    "env": {
      "REACT_APP_POSTHOG_TOKEN": "OxQBmOgLaQCtIVARW811DW-WfcATnoK9NS9f8F3B-xY",
      "REACT_APP_SERVER_URL": "http://bf49d8bc.ngrok.io"
    }
  }
}" >> now.json'''
          sh 'echo "REACT_APP_POSTHOG_TOKEN=OxQBmOgLaQCtIVARW811DW-WfcATnoK9NS9f8F3B-xY\\nREACT_APP_SERVER_URL=http://bf49d8bc.ngrok.io" >> .env'
          sh 'npm install now && npm install'
        }
      }

    }
  }