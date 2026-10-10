pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'node --version'
                bat 'npm --version'
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test --project=chromium --workers=1'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**, test-results/**',
                allowEmptyArchive: true
            )

            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])
        }
    }
}