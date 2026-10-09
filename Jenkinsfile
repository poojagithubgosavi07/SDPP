pipeline {


agent any


stages{


stage("Checkout Code"){

steps{

git "github-repository-url"

}

}

stage("Install Dependency"){

steps{

sh "npm install"

}

}



stage("Run Playwright Tests"){

steps{

sh "npx playwright test"

}

}

stage("Generate Report"){

steps{

publishHTML(

target:[

reportDir:
"playwright-report",

reportFiles:
"index.html",

reportName:
"Playwright HTML Report"

]

)

}

}


}

}

