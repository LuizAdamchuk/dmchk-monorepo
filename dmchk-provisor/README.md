### K8S

cd -/k8s/templates
`kubectl apply -f provisor-service.yaml`
`kubectl apply -f provisor-deployment.yaml`

### TO-DO:

- Retirar o externalId como obrigatorio, e nao salvar mais assignor no dominio de provisor. Apens governance vai ficar responsavel por entidades de autenticacao.
