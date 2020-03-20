#Funciones compartidas. 
import re 
import datetime
import dateutil

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

"""
	Paramtero nuero de mes = 01, 02, 03, 04, .... , 11, 12
	Retorna el nombre del mes.
"""
def NombreDelMes(numero_mes):
	
	m = {
		"01":"Enero",
		"02":"Febrero",
		"03":"Marzo",
		"04":"Abril",
		"05":"Mayo",
		"06":"Junio",
		"07":"Julio",
		"08":"Agosto",
		"09":"Septiembre",
		"10":"Octubre",
		"11":"Noviembre",
		"12":"Diciembre"
	}

	try:
		respuesta = m[numero_mes]
		return respuesta
	except:
		return "No definido"

"""
	Parametros
		paquetes = lista de models PackageData.
		request = objeto de solicitud.
	retorna:
		diccionario con los metadatos de un paquete. 
"""
def generarMetaDatosPaquete(paquetes, request):

	uri = ''
	license = ''
	version = '1.1'
	publisher = {}
	extensions = []
	publishedDate = ''
	publicationPolicy = ''
	releases = []
	dominio = 'http://contratacionesabiertas.gob.hn/descargas/'

	metaDatosPaquete = {}

	fechaActual = datetime.datetime.now(dateutil.tz.tzoffset('UTC', -6*60*60))
	publishedDate = fechaActual.isoformat()

	for p in paquetes:
		paquete = p.data

		license = paquete['license']
		version = paquete['version']
		publisher = paquete['publisher']
		publicationPolicy = paquete['publicationPolicy']

		for e in paquete['extensions']:
			if not e in extensions:
				extensions.append(e)

	metaDatosPaquete["uri"] = request.build_absolute_uri()
	metaDatosPaquete["version"] = version
	metaDatosPaquete["publishedDate"] = publishedDate
	metaDatosPaquete["publisher"] = publisher
	metaDatosPaquete["extensions"] = extensions
	metaDatosPaquete["license"] = license
	metaDatosPaquete["publicationPolicy"] = publicationPolicy

	return metaDatosPaquete

"""
	retorna un valor para filtrar en bucket selector. 
	val: signo valor ej. >500
"""
def validateNumberParam(val):

	validador = '^(>=|<=|<|>|==)([-+]?[0-9]*\.?[0-9]+)$'

	if re.match(validador, val):
		validado = re.search(validador, val)
		operador = validado.group(1)
		numero = validado.group(2)
		decimal = float(numero)

		value = operador + str(decimal)
	else:
		value = None

	return value
