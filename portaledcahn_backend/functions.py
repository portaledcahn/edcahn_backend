#Funciones compartidas. 
import re 

def validateSortParam(param):
	pattern = '^desc\(([^)]+)\)$|^asc\(([^)]+)\)$'

	if re.match(pattern, param):
		response = True
	else:
		response = False

	return response

def getSortParam(parametro):
	validarAsc = '^asc\(([^)]+)\)$'
	validarDesc = '^desc\(([^)]+)\)$'

	if re.match(validarAsc, parametro):
		ascendente = True
		valor = re.search(validarAsc, parametro).group(1)
	else:
		ascendente = False
		valor = re.search(validarDesc, parametro).group(1)

	respuesta = {
		"valor": valor,
		"ascendente": ascendente
	}

	return respuesta

def getSortBy(parametro):
	#param = 'asc(username),desc(email),asc(plata)'
	parametros = parametro.split(',')

	columnas = []
	ascendentes = []

	for p in parametros:
		if validateSortParam(p):
			r = getSortParam(p)
			columnas.append(r["valor"])
			ascendentes.append(r["ascendente"])

	respuesta = {
		"columnas": columnas,
		"ascendentes": ascendentes
	}

	return respuesta
