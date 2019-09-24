#Funciones compartidas. 
import re 

def validateSortParam(param):
	pattern = '^desc\(([^)]+)\)$|^asc\(([^)]+)\)$'

	if re.match(pattern, param):
		response = True
	else:
		response = False

	return response

# library: Elasticsearch, Pandas
def getSortParam(parametro, library):
	validarAsc = '^asc\(([^)]+)\)$'
	validarDesc = '^desc\(([^)]+)\)$'

	if re.match(validarAsc, parametro):
		if library == 'Elasticsearch':
			ascendente = 'asc'
		else:
			ascendente = True

		valor = re.search(validarAsc, parametro).group(1)
	else:
		if library == 'Elasticsearch':
			ascendente = 'desc'
		else:
			ascendente = False

		valor = re.search(validarDesc, parametro).group(1)

	respuesta = {
		"valor": valor,
		"ascendente": ascendente
	}

	return respuesta

#parametro = 'asc(username),desc(email),asc(plata)'
def getSortBy(parametro):
	parametros = parametro.split(',')

	columnas = []
	ascendentes = []

	for p in parametros:
		if validateSortParam(p):
			r = getSortParam(p, 'Pandas')
			columnas.append(r["valor"])
			ascendentes.append(r["ascendente"])

	respuesta = {
		"columnas": columnas,
		"ascendentes": ascendentes
	}

	return respuesta

#parametro = 'asc(username),desc(email),asc(plata)'
def getSortES(parametro):
	parametros = parametro.split(',')

	respuesta = []

	for p in parametros:
		if validateSortParam(p):
			r = getSortParam(p, 'Elasticsearch')
			respuesta.append({
				"valor": r["valor"],
				"orden": r["ascendente"]
			})

	if len(respuesta) > 0:
		return respuesta
	else:
		return None

def getOperator(param):
	validador = '^(>=|<=|<|>|==|!=)(\d*\.?\d*)$'

	if re.match(validador, param):
		validado = re.search(validador, param)
		operador = validado.group(1)
		valor = validado.group(2)
	else:
		operador = None
		valor = None

	if operador is not None and valor is not None:
		respuesta = {
			"operador": operador,
			"valor": valor
		}
	else:
		respuesta = None

	return respuesta

# yyyy-MM-dd

def getDateParam(dateString):
	validador = '^(>=|<=|<|>|==)(\d{4})\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$'

	if re.match(validador, dateString):
		validado = re.search(validador, dateString)
		operador = validado.group(1)
		yyyy = validado.group(2)
		mm = validado.group(3)
		dd = validado.group(4)
		valor = yyyy + '-' + mm + '-' + dd
	else:
		operador = None
		valor = None

	if operador is not None and valor is not None:
		respuesta = {
			"operador": operador,
			"valor": valor
		}
	else:
		respuesta = None

	return respuesta