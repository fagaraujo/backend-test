# ZSSN
ZSSN (Zombie Survival Social Network)

## Version: 1.0.0

**License:** Licenca Livre


# /survivor/add

#### POST
##### Description:
Adiciona um membro a populacao de Sobreviventes
##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| member | body | Dados do sobrevivente para ser inserido na populacao | Yes | [Survivor](#survivor) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | object |

# /survivor/reportInfection

#### POST
##### Description:

Report um membro da populacao como Infectado

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | body |  | Yes | [SurvivorID](#survivorid) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | object |

# /survivor/tradeSingle

#### POST
##### Description:

Faz troca de itens do inventario entre 2 sobreviventes

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| trade | body |  | Yes | [Trade](#trade) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | object |

# /survivor/updateLocation

#### POST
##### Description:

Atualizaca a localizado do Sobrevivente

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| loc | body |  | Yes | [SurvivorLocation](#survivorlocation) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | object |

# /reports/population

#### POST
##### Description:

Retorna a lista de Sobreviventes da populucao com todas as suas informacoes

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [ [Survivor](#survivor) ] |

# /reports/infections

#### POST
##### Description:

Relatorio geral de infeccoes da populacao

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [ReportInfection](#reportinfection) |

# /reports/resources

#### POST
##### Description:

Relatorio geral de recursos da populacao

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [SurvivorResources](#survivorresources) |

# /reports/lostpoints

#### POST
##### Description:

Pontos perdidos de Sobreviventes infectados

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Ok | [ReportLostPoints](#reportlostpoints) |

# Models


## Location

Informacoes de localizacao

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| latitude | double |  | Yes |
| longitude | double |  | Yes |

## SurvivorResources

Recursos dos Sobreviventes

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| water | double |  | Yes |
| food | double |  | Yes |
| medicine | double |  | Yes |
| ammunition | double |  | Yes |

## Survivor

Informacoes de um Sobrevivente

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| uniqueID | double | uniqueID gerado automaticamente | Yes |
| name | string |  | Yes |
| age | double |  | Yes |
| gender | string |  | Yes |
| location | [Location](#location) |  | Yes |
| resources | [SurvivorResources](#survivorresources) |  | Yes |

## SurvivorID

Identificacao de um Sobrevivente: **name** tem precendencia sobre o **id**

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| uniqueID | double |  | No |
| name | string |  | No |

## Trade

Informacoes para realizacao de Trocas entre os Sobreviventes

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| survivor1 | [SurvivorID](#survivorid) |  | Yes |
| tradeItems1 | [SurvivorResources](#survivorresources) |  | Yes |
| survivor2 | [SurvivorID](#survivorid) |  | Yes |
| tradeItems2 | [SurvivorResources](#survivorresources) |  | Yes |

## SurvivorLocation

Alteracao de localizacao de um Sobrevivente

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | [SurvivorID](#survivorid) |  | Yes |
| location | [Location](#location) |  | Yes |

## ReportInfection

Informacoes gerais de infeccao da populacao

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| infected | string | Estatisticas dos infectados | Yes |
| noninfected | string | Estatisticas dos nao infectados | Yes |

## ReportLostPoints

Pontos perdidos devido a infeccoes

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| total | double | Total de pontos | Yes |
| survivors | object | Pontos por sobrevivente | Yes |