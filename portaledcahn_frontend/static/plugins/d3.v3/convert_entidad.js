function getEntidadNoAbreviada(entidad) {
	//console.log(entidad);
	// casos especificos
	if (entidad.match(/^EMP. DE SERV. SAN./)) {
 		return entidad.replace(/^EMP. DE SERV. SAN./, 'EMPRESA DE SERVICIOS SANITARIOS');
	}
 	else if (entidad.match(/^CÑIA. PYA./)) {
 		return entidad.replace(/^CÑIA. PYA./, 'COMPAÑÍA PARAGUAYA');
	}
 	else if (entidad.match(/^SEC. DE DEF. DEL CONS./)) {
 		return entidad.replace(/^SEC. DE DEF. DEL CONS./, 'SECRETARIA DE DEFENSA DEL CONSUMIDOR');
	}
 	else if (entidad.match(/^SECR. DE TRANS. ÁREA METROP./)) {
 		return entidad.replace(/^SEC. DE TRANS. ÁREA METROP./, 'SECRETARÍA DE TRANSPORTE ÁREA METROPOLITANA');
	}
 	else if (entidad.match(/^AG. NAC. DE EVAL. Y AC. DE LA ED. SUPERIOR/)) {
 		return entidad.replace(/^AG. NAC. DE EVAL. Y AC. DE LA ED. SUPERIOR/, 'AGENCIA NAC. DE EVAL. Y ACREDITACIÓN DE LA EDUCACIÓN SUP.');
	}
 	else if (entidad.match(/^INST. NAC. DE DES. RURAL Y DE LA TIERRA/)) {
 		return entidad.replace(/^INST. NAC. DE DES. RURAL Y DE LA TIERRA/, 'INSTITUTO NACIONAL DE DESARROLLO RURAL Y DE LA TIERRA');
	}
 	else if (entidad.match(/^INST. NAC. DE TEC, NORM. Y METEOROLOGIA/)) {
 		return entidad.replace(/^INST. NAC. DE TEC, NORM. Y METEOROLOGIA/, 'INSTITUTO NACIONAL DE TECNOLOGÍA, NORMALIZACIÓN Y METROLOGIA');
	}
 	else if (entidad.match(/^SER. NAC. DE CALIDAD Y SANIDAD VEG. Y DE SEM./)) {
 		return entidad.replace(/^SER. NAC. DE CALIDAD Y SANIDAD VEG. Y DE SEM./, 'SERVICIO NACIONAL DE CALIDAD Y SANIDAD VEGETAL Y DE SEMILLAS');
	}
 	else if (entidad.match(/^CAJA DE SEG. SOC. DE EMP. Y OBR. FERROV./)) {
 		return entidad.replace(/^CAJA DE SEG. SOC. DE EMP. Y OBR. FERROV./, 'CAJA DE SEGURIDAD SOCIAL DE EMPLEADOS Y OBREROS FERROVIARIOS');
	}
 	else if (entidad.match(/^CAJA DE JUB. DE EMPL. DE BANCOS Y AFINES/)) {
 		return entidad.replace(/^CAJA DE JUB. DE EMPL. DE BANCOS Y AFINES/, 'CAJA DE JUBILACIONES Y PENSIONES DE EMPL. DE BANCOS Y AFINES');
	}
	else if (entidad.match(/^CAJA DE PRES. DEL MIN. DE DEFENSA NAC./)) {
 		return entidad.replace(/^CAJA DE PRES. DEL MIN. DE DEFENSA NAC./, 'CAJA DE PRÉSTAMOS DEL MINISTERIO DE DEFENSA NACIONAL');
	}
 	else if (entidad.match(/^ADM. NAC. DE NAV. Y PUERTOS (ANNP)/)) {
 		return entidad.replace(/^ADM. NAC. DE NAV. Y PUERTOS (ANNP)/, 'ADMINISTRACIÓN NACIONAL DE NAVEGACIÓN Y PUERTOS (ANNP)');
	}
	// casos genericos
 	else if (entidad.match(/^MIN./)) {
 		return  entidad.replace(/^MIN./, 'MINISTERIO');
 	}
 	else if (entidad.match(/^MUN./)) {
 		return  entidad.replace(/^MUN./, 'MUNICIPALIDAD');
	}
 	else if (entidad.match(/^GOB. DEP./)) {
 		return  entidad.replace(/^GOB. DEP./, 'GOBIERNO DEPARTAMENTAL');
	}
 	else if (entidad.match(/^UNIV. NAC./)) {
 		return  entidad.replace(/^UNIV. NAC./, 'UNIVERSIDAD NACIONAL');
	}
 	else if (entidad.match(/^ADM. NAC./)) {
 		return  entidad.replace(/^ADM. NAC./, 'ADMINISTRACIÓN NACIONAL');
	}
    else if (entidad.match(/^DIR. NAC./)) {
        return  entidad.replace(/^DIR. NAC./, 'DIRECCIÓN NACIONAL');
    }
    else if (entidad.match(/^DIRE./)) {
        return  entidad.replace(/^DIRE./, 'DIRECCION');
    }
 	else if (entidad.match(/^DIR./)) {
 		return  entidad.replace(/^DIR./, 'DIRECCIÓN');
	}
 	else if (entidad.match(/^SECR./)) {
 		return  entidad.replace(/^SECR./, 'SECRETARÍA');
	}
 	else if (entidad.match(/^SEC./)) {
 		return  entidad.replace(/^SEC./, 'SECRETARIA');
	}
 	else if (entidad.match(/^INST. NAC./)) {
 		return  entidad.replace(/^INST. NAC./, 'INSTITUTO NACIONAL');
	}
 	else if (entidad.match(/^INST. PYO./)) {
 		return  entidad.replace(/^INST. PYO./, 'INSTITUTO PARAGUAYO');
	}
 	else if (entidad.match(/^SERV. NAC./)) {
 		return entidad.replace(/^SERV. NAC./, 'SERVICIO NACIONAL');
	}
 	else if (entidad.match(/^CAJA DE JUB. Y PEN./)) {
 		return entidad.replace(/^CAJA DE JUB. Y PEN./, 'CAJA DE JUBILACIONES Y PENSIONES');
	}
 	else if (entidad.match(/^CAJA DE SEG. SOC./)) {
 		return entidad.replace(/^CAJA DE SEG. SOC./, 'CAJA DE SEGURIDAD SOCIAL');
	}
 	
 	else {
 		return  entidad;
	}
}

function getEntidadAbreviada(entidad) {
	//console.log(entidad);
	// casos especificos
 	if (entidad.match(/^EMPRESA DE SERVICIOS SANITARIOS/)) {
 		return entidad.replace(/^EMPRESA DE SERVICIOS SANITARIOS/, 'EMP. DE SERV. SAN.');
	}
 	else if (entidad.match(/^COMPAÑÍA PARAGUAYA/)) {
 		return entidad.replace(/^COMPAÑÍA PARAGUAYA/, 'CÑIA. PYA.');
	}
 	else if (entidad.match(/^SECRETARIA DE DEFENSA DEL CONSUMIDOR/)) {
 		return entidad.replace(/^SECRETARIA DE DEFENSA DEL CONSUMIDOR/, 'SEC. DE DEF. DEL CONS.');
	}
 	else if (entidad.match(/^SECRETARÍA DE TRANSPORTE ÁREA METROPOLITANA/)) {
 		return entidad.replace(/^SECRETARÍA DE TRANSPORTE ÁREA METROPOLITANA/, 'SECR. DE TRANS. ÁREA METROP.');
	}
 	else if (entidad.match(/^AGENCIA NAC. DE EVAL. Y ACREDITACIÓN DE LA EDUCACIÓN SUP./)) {
 		return entidad.replace(/^AGENCIA NAC. DE EVAL. Y ACREDITACIÓN DE LA EDUCACIÓN SUP./, 'AG. NAC. DE EVAL. Y AC. DE LA ED. SUPERIOR');
	}
 	else if (entidad.match(/^INSTITUTO NACIONAL DE DESARROLLO RURAL Y DE LA TIERRA/)) {
 		return entidad.replace(/^INSTITUTO NACIONAL DE DESARROLLO RURAL Y DE LA TIERRA/, 'INST. NAC. DE DES. RURAL Y DE LA TIERRA');
	}
 	else if (entidad.match(/^INSTITUTO NACIONAL DE TECNOLOGÍA, NORMALIZACIÓN Y METROLOGIA/)) {
 		return entidad.replace(/^INSTITUTO NACIONAL DE TECNOLOGÍA, NORMALIZACIÓN Y METROLOGIA/, 'INST. NAC. DE TEC, NORM. Y METEOROLOGIA');
	}
 	else if (entidad.match(/^SERVICIO NACIONAL DE CALIDAD Y SANIDAD VEGETAL Y DE SEMILLAS/)) {
 		return entidad.replace(/^SERVICIO NACIONAL DE CALIDAD Y SANIDAD VEGETAL Y DE SEMILLAS/, 'SER. NAC. DE CALIDAD Y SANIDAD VEG. Y DE SEM.');
	}
 	else if (entidad.match(/^CAJA DE SEGURIDAD SOCIAL DE EMPLEADOS Y OBREROS FERROVIARIOS/)) {
 		return entidad.replace(/^CAJA DE SEGURIDAD SOCIAL DE EMPLEADOS Y OBREROS FERROVIARIOS/, 'CAJA DE SEG. SOC. DE EMP. Y OBR. FERROV.');
	}
 	else if (entidad.match(/^CAJA DE JUBILACIONES Y PENSIONES DE EMPL. DE BANCOS Y AFINES/)) {
 		return entidad.replace(/^CAJA DE JUBILACIONES Y PENSIONES DE EMPL. DE BANCOS Y AFINES/, 'CAJA DE JUB. DE EMPL. DE BANCOS Y AFINES');
	}
	else if (entidad.match(/^CAJA DE PRÉSTAMOS DEL MINISTERIO DE DEFENSA NACIONAL/)) {
 		return entidad.replace(/^CAJA DE PRÉSTAMOS DEL MINISTERIO DE DEFENSA NACIONAL/, 'CAJA DE PRES. DEL MIN. DE DEFENSA NAC.');
	}
 	else if (entidad.match(/^ADMINISTRACIÓN NACIONAL DE NAVEGACIÓN Y PUERTOS (ANNP)/)) {
 		return entidad.replace(/^ADMINISTRACIÓN NACIONAL DE NAVEGACIÓN Y PUERTOS (ANNP)/, 'ADM. NAC. DE NAV. Y PUERTOS (ANNP)');
	}
	// casos genéricos
 	else if (entidad.match(/^MINISTERIO/)) {
 		return entidad.replace(/^MINISTERIO/, 'MIN.');
 	}
 	else if (entidad.match(/^MUNICIPALIDAD/)) {
 		return entidad.replace(/^MUNICIPALIDAD/, 'MUN.');
	}
 	else if (entidad.match(/^GOBIERNO DEPARTAMENTAL/)) {
 		return entidad.replace(/^GOBIERNO DEPARTAMENTAL/, 'GOB. DEP.');
	}
 	else if (entidad.match(/^UNIVERSIDAD NACIONAL/)) {
 		return entidad.replace(/^UNIVERSIDAD NACIONAL/, 'UNIV. NAC.');
	}
 	else if (entidad.match(/^ADMINISTRACIÓN NACIONAL/)) {
 		return entidad.replace(/^ADMINISTRACIÓN NACIONAL/, 'ADM. NAC.');
	}
    else if (entidad.match(/^DIRECCIÓN NACIONAL/)) {
        return entidad.replace(/^DIRECCIÓN NACIONAL/, 'DIR. NAC.');
    }
 	else if (entidad.match(/^DIRECCIÓN/)) {
 		return entidad.replace(/^DIRECCIÓN/, 'DIR.');
	}
 	else if (entidad.match(/^DIRECCION/)) {
 		return entidad.replace(/^DIRECCION/, 'DIRE.');
	}
 	else if (entidad.match(/^SECRETARÍA/)) {
 		return entidad.replace(/^SECRETARÍA/, 'SECR.');
	}
 	else if (entidad.match(/^SECRETARIA/)) {
 		return entidad.replace(/^SECRETARIA/, 'SEC.');
	}
 	else if (entidad.match(/^INSTITUTO PARAGUAYO/)) {
 		return entidad.replace(/^INSTITUTO PARAGUAYO/, 'INST. PYO.');
	}
 	else if (entidad.match(/^INSTITUTO NACIONAL/)) {
 		return entidad.replace(/^INSTITUTO NACIONAL/, 'INST. NAC.');
	}
 	else if (entidad.match(/^SERVICIO NACIONAL/)) {
 		return entidad.replace(/^SERVICIO NACIONAL/, 'SERV. NAC.');
	}
 	else if (entidad.match(/^CAJA DE JUBILACIONES Y PENSIONES/)) {
 		return entidad.replace(/^CAJA DE JUBILACIONES Y PENSIONES/, 'CAJA DE JUB. Y PEN.');
	}
 	else if (entidad.match(/^CAJA DE SEGURIDAD SOCIAL/)) {
 		return entidad.replace(/^CAJA DE SEGURIDAD SOCIAL/, 'CAJA DE SEG. SOC.');
	}
 	else {
 		return entidad;
	 }
}

function RemoveAccents(strAccents) {
	var strAccents = strAccents.split('');
	var strAccentsOut = new Array();
	var strAccentsLen = strAccents.length;
	var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüŠšŸÿýŽž';
	var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuSsYyyZz";
	for (var y = 0; y < strAccentsLen; y++) {
		if (accents.indexOf(strAccents[y]) != -1) {
			strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
		} else
			strAccentsOut[y] = strAccents[y];
	}
	strAccentsOut = strAccentsOut.join('');
	return strAccentsOut;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

String.prototype.toTitleCase = function(){
	  var smallWords = /^(de|y|del|la|las|el|los|vs?\.?|via)$/i;

	  return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
	    if (index > 0 && index + match.length !== title.length &&
	      match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
	      (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
	      title.charAt(index - 1).search(/[^\s-]/) < 0) {
	      return match.toLowerCase();
	    }

	    if (match.substr(1).search(/[A-Z]|\../) > -1) {
	      return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
	    }

	    return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
	  });
	};