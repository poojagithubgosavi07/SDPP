pipeline {
    agent any

    environment { 
        CI = 'true' 
    }

    stages{
        stage("Checkout Code"){
            steps{
                checkout scm //git "github-repository-url"
            }
        }

        stage("Install Dependencies"){
            steps{
                //sh "npm install"
                bat 'node --version' 
                bat 'npm --version' 
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browser'){ 
            steps{ 
                bat 'npx playwright install chromium' 
            } 
        }

        stage("Run Playwright Tests"){
            steps{
                //sh "npx playwright test"
                bat 'npx playwright test --project=chromium --workers=1'
            }
        }
    }

//stage("Generate Report"){
//steps{

post { 
    always { 
        archiveArtifacts( 
            artifacts: 'playwright-report/**, test-results/**', 
            allowEmptyArchive: true
        )

        publishHTML(target:[
            reportDir:"playwright-report",
            reportFiles:"index.html",
            reportName:"Playwright HTML Report"
            keepAll: true, 
            alwaysLinkToLastBuild: true, 
            allowMissing: true
        ])
    }
}
