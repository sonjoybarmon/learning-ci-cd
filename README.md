# CI/CD Learning Project

This repository contains a simple Express.js application designed to help you learn and practice Continuous Integration and Continuous Deployment (CI/CD) concepts.

## What is CI/CD?

**Continuous Integration (CI)** and **Continuous Deployment (CD)** are software development practices that help teams deliver code changes more frequently and reliably.

### Continuous Integration (CI)
- **Definition**: The practice of frequently merging code changes into a central repository
- **Key Benefits**:
  - Early detection of integration issues
  - Automated testing on every code change
  - Faster feedback to developers
  - Reduced merge conflicts

### Continuous Deployment (CD)
- **Definition**: The practice of automatically deploying code changes to production after passing all tests
- **Key Benefits**:
  - Faster time to market
  - Reduced manual errors
  - Consistent deployment process
  - Quick rollback capabilities

## Project Structure

```
leaning-ci-cd/
├── index.js          # Server entry point
├── app.js            # Express.js application
├── package.json      # Node.js dependencies and scripts
├── yarn.lock         # Yarn dependency lock file
├── tests/            # Test directory
│   └── app.test.js   # Application tests
├── .mocharc.json     # Mocha test configuration
├── Dockerfile        # Docker container configuration
├── .dockerignore     # Files to exclude from Docker build
├── .gitignore        # Files to exclude from Git
└── README.md         # This file
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Docker (optional, for containerization)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd leaning-ci-cd
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Run the application**:
   ```bash
   yarn start
   ```

4. **Run tests**:
   ```bash
   yarn test
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:8080`

### Docker Development

1. **Build the Docker image**:
   ```bash
   docker build -t leaning-ci-cd .
   ```

2. **Run the Docker container**:
   ```bash
   docker run -p 3000:3000 leaning-ci-cd
   ```

## CI/CD Pipeline Components

A typical CI/CD pipeline includes the following stages:

### 1. Source Code Management
- **Git**: Version control system
- **Branching Strategy**: Feature branches, main/master branch
- **Pull Requests**: Code review process

### 2. Build Stage
- **Dependency Installation**: `npm install`
- **Code Compilation**: If using TypeScript or other compiled languages
- **Asset Generation**: CSS, JavaScript bundling

### 3. Test Stage
- **Unit Tests**: Test individual components
- **Integration Tests**: Test component interactions
- **End-to-End Tests**: Test complete user workflows
- **Code Quality**: Linting, formatting checks

### 4. Security & Quality Checks
- **Vulnerability Scanning**: Check for security issues
- **Code Coverage**: Ensure adequate test coverage
- **Static Code Analysis**: Code quality metrics

### 5. Build Artifacts
- **Docker Images**: Containerized applications
- **Application Bundles**: Packaged applications
- **Documentation**: Generated docs

### 6. Deployment Stages
- **Development Environment**: For initial testing
- **Staging Environment**: Pre-production testing
- **Production Environment**: Live application

## Common CI/CD Tools

### CI/CD Platforms
- **GitHub Actions**: Integrated with GitHub repositories
- **GitLab CI/CD**: Built into GitLab
- **Jenkins**: Open-source automation server
- **CircleCI**: Cloud-based CI/CD platform
- **Azure DevOps**: Microsoft's DevOps platform
- **AWS CodePipeline**: Amazon's CI/CD service

### Container & Orchestration
- **Docker**: Containerization platform
- **Kubernetes**: Container orchestration
- **Docker Compose**: Multi-container applications

### Cloud Platforms
- **AWS**: Amazon Web Services
- **Google Cloud Platform**: Google's cloud services
- **Azure**: Microsoft's cloud platform
- **Heroku**: Platform-as-a-Service (PaaS)
- **Netlify/Vercel**: Static site hosting with CI/CD

## Sample CI/CD Workflow (GitHub Actions)

Here's an example GitHub Actions workflow for this project:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linter
      run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker image
      run: docker build -t leaning-ci-cd:${{ github.sha }} .
    
    - name: Push to registry
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push leaning-ci-cd:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Deploy to production
      run: echo "Deploying to production..."
```

## Best Practices

### Code Quality
- **Write Tests**: Maintain good test coverage
- **Code Reviews**: Use pull requests for code review
- **Consistent Formatting**: Use tools like Prettier and ESLint
- **Documentation**: Keep documentation up to date

### Security
- **Environment Variables**: Store secrets securely
- **Dependency Scanning**: Regular security audits
- **Access Control**: Limit who can deploy to production
- **Container Security**: Scan Docker images for vulnerabilities

### Deployment
- **Feature Flags**: Control feature rollouts
- **Blue-Green Deployment**: Zero-downtime deployments
- **Rollback Strategy**: Quick rollback procedures
- **Monitoring**: Application and infrastructure monitoring

### Performance
- **Caching**: Use caching strategies effectively
- **Database Optimization**: Efficient queries and indexing
- **CDN**: Content Delivery Networks for static assets
- **Load Testing**: Test application under load

## Learning Resources

### Books
- "Continuous Delivery" by Jez Humble and Dave Farley
- "The DevOps Handbook" by Gene Kim, Jez Humble, Patrick Debois, and John Willis
- "Accelerate" by Nicole Forsgren, Jez Humble, and Gene Kim

### Online Courses
- GitHub Learning Lab
- Docker Official Documentation
- Kubernetes Documentation
- Cloud Provider Training (AWS, GCP, Azure)

### Hands-on Practice
- Set up your own CI/CD pipeline
- Contribute to open source projects
- Practice with different deployment strategies
- Experiment with various tools and platforms

## Next Steps

1. **✅ Add Testing**: Unit and integration tests are implemented using Mocha, Chai, and Supertest
2. **Set up CI Pipeline**: Configure GitHub Actions or another CI/CD tool
3. **Add Linting**: Implement ESLint and Prettier
4. **Environment Configuration**: Add development, staging, and production configs
5. **Monitoring**: Add logging and monitoring capabilities
6. **Security**: Implement security best practices and scanning

## Current Testing Setup

This project uses:
- **Mocha**: Test framework
- **Chai**: Assertion library  
- **Supertest**: HTTP assertion library for testing Express apps
- **ES Modules**: Modern JavaScript module system

The project is configured to use ES modules (`"type": "module"` in package.json), so all imports use the modern `import/export` syntax.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the ISC License.