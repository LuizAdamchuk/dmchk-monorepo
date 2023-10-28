# Project INFRA

## Local URLs

- Grafana: [http://localhost:32204/](http://localhost:32204/)
- Governance: [http://localhost:8888/](http://localhost:8888/)

## Environment

I am using Helm to install Grafana and Prometheus for observability.

### Useful Commands

- Create a Helm chart: `helm create dmchk-governance`
- Install the Helm chart: `helm install dmchk-governance .`
- Upgrade Grafana with custom values: `helm upgrade grafana stable/grafana -f values.yaml`
- Update Helm dependencies: `helm dependency update`

### Setting up a Kubernetes (K8s) Environment

When setting up a Kubernetes environment, follow this order:

1. Navigate to `k8s/dmchk-governance/templates`.
2. Apply the following Kubernetes resources:

   - `kubectl apply -f secret.yaml`
   - `kubectl apply -f configmap.yaml`
   - `kubectl apply -f pvc.yaml`
   - `kubectl apply -f mysql-statefulset.yaml`
   - `kubectl apply -f mysql-service.yaml`
   - `kubectl apply -f grafana-pvc.yaml`
   - `kubectl apply -f governance-deployment.yaml`
   - `kubectl apply -f governance-service.yaml`

## Tests

These end-to-end (E2E) tests set up a new MySQL instance on port 3307 for test execution.

### Useful Commands

- Run E2E tests: `npm run test:e2e`
- Start Prisma Studio with test environment: `npx dotenv -e .env.test -- prisma studio`

## Deployment

To deploy the project, simply push a commit to GitHub. GitHub Actions will build 'dmchk-governance' and deploy it to Docker Hub. To update your local Kubernetes environment, navigate to `k8s/dmchk-governance/templates` and use the following commands:

- Delete the existing deployment: `kubectl delete -f your-deployment-file.yaml`
- Apply the updated deployment: `kubectl apply -f your-deployment-file.yaml`

## General Commands

Here are some general commands you may find useful:

- Retrieve Grafana admin password:
  ```shell
  kubectl get secret dmchk-governance-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
  ```
