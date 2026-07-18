# DevSecOps Test Project

A project where CI/CD pipelines don't just deliver code—they enforce security best practices. By embracing the "Shift Left" principle, this project abandons the outdated practice of treating security as an afterthought in the software development lifecycle. Through automated security testing integrated directly into the CI/CD pipelines, vulnerabilities are detected and remediated early. This transforms secure software delivery into a continuous process rather than a final checkpoint.

---

## Table of Contents
- [Introduction to the Project](#devSecOps-test-project)
- [✨ Features](#features)
- [🏛 Architecture](#architecture)
  - [🧠 Architectural Decisions](#architectural-decisions)
  - [⚠️ Tradeoffs](#tradeoffs)
- [🚀 Tech Stack](#Tech-Stack)

---

## ✨ Features

1. **Student Management**: Student profile Creation, Persistence and management.
2. **Application Management**: Application creation, Persistence and managment
3. **Infrastructure & Orchestration**: Docker Compose for local orchestration.

---

## 🏛 Architecture

<!-- <img width="1536" height="1024" alt="ChatGPT Image Nov 6, 2025, 05_04_33 PM" src="https://github.com/user-attachments/assets/d106deff-3f67-4bad-aa2f-4c0a147f9956" /> -->

### 🧠 Architectural Decisions 

1. **Three Tier Application**
    The project follows a three-tier architecture consisting of:
    - Presentation layer: Frontend web application responsible for the user interface.
    - Application layer: Backend REST API done implementing business logic such as hostel allocation, authentication and booking management.
    - Data layer: Database responsible for persistent storage of users, rooms, bookings and related information.
2. **Containerization**
    - All projects are containerized to ensure consistent execution across development, testing and deployment environments. Containerization also enables automated security scanning of deployable artifacts before release.
3. **CI/CD as the Delivery Mechanism**
    - GitHub Actions is used to automate build, security verification and artifact publishing. Treating the pipeline as part of the system architecture ensures every code change passes identical quality and security gates before an image is produced.
4. **Shift-Left Security**
    - The pipeline follows a Shift-Left Security approach by introducing automated security validation early in the software delivery lifecycle. Vulnerabilities are detected during continuous integration rather than after deployment, reducing remediation cost and improving developer feedback.
5. **Static Application Security Testing** 
    - Static Application Security Testing is executed independently for both frontend and backend source code before any container images are built. This prevents insecure code from progressing further through the pipeline.
    - Running SAST separately allows each application tier to fail independently while providing focused security reports. 
5. **Build Images Only After Security Validation**
    - Container image creation is intentionally dependent on successful SAST execution. Images are only produced when source code passes predefined security checks, preventing insecure artifacts from entering the registry.
6. **Software Composition Analysis (SCA)**
    - After image creation, Software Composition Analysis is performed against both backend and frontend images. This identifies vulnerabilities in third-party libraries and operating system packages included within the container.
    - Security scan results are uploaded to GitHub Code Scanning, providing a centralized view of vulnerabilities directly within the repository. This enables developers to track, triage and remediate findings without leaving the development workflow.
7. **Security Gates**
    The pipeline incorporates security gates that prevent progression when critical stages fail.
    - SAST failures prevent image creation.
    - Images are scanned before being considered suitable for deployment.

### ⚠️ Tradeoffs

1. **SonarQube Quality Gate Enforcement**
    - To integrate Static Application Security Testing (SAST), the CI/CD pipeline uses SonarQube to analyze both the frontend and backend codebases. However, the pipeline is configured with sonar.qualitygate.wait=false, meaning it does not wait for the SonarQube Quality Gate result before continuing.
    - This decision was made because the SonarQube Community (free) tier enforces quality gate conditions that are difficult to satisfy in a demonstration project. By default, the quality gate requires at least 80% test coverage on newly added code, causing the pipeline to fail even when no security vulnerabilities are present and the focus of the project is on demonstrating DevSecOps security practices rather than comprehensive automated testing.
    - This approach allows the pipeline to complete successfully and demonstrate automated SAST integration without being blocked by code coverage requirements. However, it also means the pipeline does not automatically enforce SonarQube's quality gate, so issues related to code quality or insufficient test coverage will not prevent image creation. In a production environment, the recommended approach would be to enable sonar.qualitygate.wait=true and enforce quality gate checks alongside adequate automated test coverage to ensure both security and code quality standards are met.

---

## 🚀 Tech Stack

1. **Frontend Layer**
   - **Technology:**  Angular v20
2. **Backend Layer**
   - **Technology:** ASP .NET Core 
3. **Database Layer**
   - **Technology:** MySQL database
4. **Orchestration Layer**
   - **Technology:** Docker Compose  
---

## What's Next

The next phase is extending the pipeline into a security-driven CD process:

1. Detect newly built Docker images.
2. Run Dynamic Application Security Testing (DAST) using OWASP ZAP.
3. Only promote the application to production after all security gates have been successfully passed.
