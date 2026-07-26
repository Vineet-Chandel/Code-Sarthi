export default {
  topics: [
    {
      id: "pods-deployments",
      title: "Pods & Deployments",
      sections: [
        {
          heading: "Pod basics",
          description: "A Pod is the smallest deployable unit — one or more containers sharing network & storage.",
          language: "yaml",
          code: `# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  containers:
    - name:  my-app
      image: my-app:1.0.0
      ports:
        - containerPort: 3000
      env:
        - name:  NODE_ENV
          value: production
      resources:
        requests:
          cpu:    "100m"
          memory: "128Mi"
        limits:
          cpu:    "500m"
          memory: "512Mi"`,
        },
        {
          heading: "Deployment",
          description: "Deployments manage a ReplicaSet — they handle rolling updates and rollbacks automatically.",
          language: "yaml",
          code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name:  my-app
          image: my-app:1.0.0
          ports:
            - containerPort: 3000
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5`,
        },
      ],
    },
    {
      id: "services",
      title: "Services & Ingress",
      sections: [
        {
          heading: "Service types",
          description: "Services expose Pods with stable DNS names. ClusterIP is internal; LoadBalancer is external.",
          language: "yaml",
          code: `# ClusterIP — internal only (default)
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app
  ports:
    - port:       80
      targetPort: 3000
  type: ClusterIP

---
# LoadBalancer — external IP (cloud providers)
apiVersion: v1
kind: Service
metadata:
  name: my-app-lb
spec:
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer`,
        },
        {
          heading: "Ingress — HTTP routing",
          description: "Ingress routes external HTTP traffic to services based on host and path.",
          language: "yaml",
          code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  rules:
    - host: api.devcheats.in
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-app
                port:
                  number: 80
  tls:
    - hosts: [api.devcheats.in]
      secretName: tls-secret`,
        },
      ],
    },
    {
      id: "config",
      title: "ConfigMaps & Secrets",
      sections: [
        {
          heading: "ConfigMap",
          description: "ConfigMaps store non-sensitive configuration — mounted as env vars or files.",
          language: "yaml",
          code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: my-app-config
data:
  NODE_ENV: production
  PORT:     "3000"
  LOG_LEVEL: info

---
# Use in a Pod
spec:
  containers:
    - name: my-app
      image: my-app:1.0.0
      envFrom:
        - configMapRef:
            name: my-app-config
      # Or individual key
      env:
        - name: NODE_ENV
          valueFrom:
            configMapKeyRef:
              name: my-app-config
              key: NODE_ENV`,
        },
        {
          heading: "Secret",
          description: "Secrets store sensitive data base64-encoded. In production, use an external secrets manager.",
          language: "bash",
          code: `# Create secret from literals
kubectl create secret generic db-secret \\
  --from-literal=password=supersecret \\
  --from-literal=url=postgres://user:pass@host/db

# Create from file
kubectl create secret generic tls-secret \\
  --from-file=tls.crt --from-file=tls.key

# Reference in Pod
# spec.containers[].env:
#   - name: DB_PASSWORD
#     valueFrom:
#       secretKeyRef:
#         name: db-secret
#         key: password`,
        },
      ],
    },
    {
      id: "kubectl",
      title: "kubectl Commands",
      sections: [
        {
          heading: "Essential commands",
          description: "kubectl is the CLI for all Kubernetes operations. -n sets the namespace.",
          language: "bash",
          code: `# Apply a manifest
kubectl apply  -f deployment.yaml
kubectl delete -f deployment.yaml

# Get resources
kubectl get pods
kubectl get pods -n production
kubectl get all                     # pods, services, deployments
kubectl get pods -o wide            # more columns
kubectl get pods -w                 # watch for changes

# Describe (detailed info + events)
kubectl describe pod my-app-abc123
kubectl describe deployment my-app

# Logs
kubectl logs my-app-abc123
kubectl logs -f my-app-abc123        # follow
kubectl logs my-app-abc123 --previous  # crashed container

# Shell into a pod
kubectl exec -it my-app-abc123 -- sh

# Port forward for local debugging
kubectl port-forward pod/my-app-abc123 8080:3000`,
        },
        {
          heading: "Scaling & rollouts",
          description: "Kubernetes handles rolling updates and rollbacks with zero downtime.",
          language: "bash",
          code: `# Scale deployment
kubectl scale deployment my-app --replicas=5

# Update image (triggers rolling update)
kubectl set image deployment/my-app my-app=my-app:1.1.0

# Check rollout status
kubectl rollout status deployment/my-app

# Rollout history
kubectl rollout history deployment/my-app

# Rollback to previous version
kubectl rollout undo deployment/my-app

# Rollback to specific revision
kubectl rollout undo deployment/my-app --to-revision=2`,
        },
      ],
    },
  ],
};
