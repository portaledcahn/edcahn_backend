var departamentos = [
	{  
	    "numero": 0,
	    "departamento":"ASUNCION"
	 },
	 {  
		"numero": 1,
	    "departamento":"CONCEPCION"
	 },
	 {  
		"numero": 2,
	    "departamento":"SAN PEDRO"
	 },
	 {  
		"numero": 3,
	    "departamento":"CORDILLERA"
	 },
	 {  
		"numero": 4,
	    "departamento":"GUAIRA"
	 },
	 {  
		"numero": 5,
	    "departamento":"CAAGUAZU"
	 },
	 {  
	    "numero": 6,
	    "departamento":"CAAZAPA"
	 },
	 {  
		"numero": 7,
	    "departamento":"ITAPUA"
	 },
	 {  
		"numero": 8,
	    "departamento":"MISIONES"
	 },
	 {  
		"numero": 9,
	    "departamento":"PARAGUARI"
	 },
	 {  
		"numero": 10,
	    "departamento":"ALTO PARANA"
	 },
	 {  
		"numero": 11,
	    "departamento":"CENTRAL"
	 },
	 {  
	    "numero": 12,
	    "departamento":"ÑEEMBUCU"
	 },
	 {  
		"numero": 13,
	    "departamento":"AMAMBAY"
	 },
	 {  
		"numero": 14,
	    "departamento":"CANINDEYU"
	 },
	 {  
		"numero": 15,
	    "departamento":"PRESIDENTE HAYES"
	 },
	 {  
		"numero": 16,
	    "departamento":"BOQUERON"
	 },
	 {  
	    "numero": 17,
	    "departamento":"ALTO PARAGUAY"
	 }
]

var distritos = [
   {  
      "municipio":"VILLA HAYES",
      "departamento":"PRESIDENTE HAYES"
   },
   {  
      "municipio":"ITACURUBÍ DEL ROSARIO",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"ALTO VERÁ",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"PILAR",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"MBUYAPEY",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"SAN ALBERTO",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"SAN PABLO",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"YAGUARON",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"GRAL. HIGINIO MORÍNIGO",
      "departamento":"CAAZAPA"
   },
   {  
      "municipio":"GRAL. FRANCISCO CABALLERO ALVAREZ",
      "departamento":"CANINDEYU"
   },
   {  
      "municipio":"LOMA GRANDE",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"UNIÓN",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"JUAN LEÓN MALLORQUÍN",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"YBY YAÚ",
      "departamento":"CONCEPCION"
   },
   {  
      "municipio":"BENJAMÍN ACEVAL",
      "departamento":"PRESIDENTE HAYES"
   },
   {  
      "municipio":"EDELIRA",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"JOSÉ DOMINGO OCAMPOS",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"CAACUPÉ",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"SAN JUAN NEPOMUCENO",
      "departamento":"CAAZAPA"
   },
   {  
      "municipio":"GUARAMBARÉ",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"VILLETA",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"PRESIDENTE FRANCO",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"CÁRLOS ANTONIO LÓPEZ",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"RAÚL ARSENIO OVIEDO",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"VILLA OLIVA",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"VILLA DEL ROSARIO",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"INDEPENDENCIA",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"BORJA",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"QUYQUYHO",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"SAN LORENZO",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"YGUAZÚ",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"TACUARAS",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"FRAM",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"VALENZUELA",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"ÑUMI",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"MAYOR OTAÑO",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"MARIANO ROQUE ALONSO",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"SANTA MARÍA",
      "departamento":"MISIONES"
   },
   {  
      "municipio":"YASY CAÑY",
      "departamento":"CANINDEYU"
   },
   {  
      "municipio":"YATYTAY",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"SIMÓN BOLIVAR",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"CAAPUCÚ",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"SAN LÁZARO",
      "departamento":"CONCEPCION"
   },
   {  
      "municipio":"ARROYOS Y ESTEROS",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"KATUETE",
      "departamento":"CANINDEYU"
   },
   {  
      "municipio":"SANTA ROSA DEL AGUARAY",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"SAN SALVADOR",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"CHORÉ",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"SAN JUAN BAUTISTA ÑEEMBUCU",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"CARAYAÓ",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"CIUDAD DEL ESTE",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"CORONEL MARTÍNEZ",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"CARMELO PERALTA",
      "departamento":"ALTO PARAGUAY"
   },
   {  
      "municipio":"LA PAZ",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"MBARACAYÚ",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"R.I. 3 CORRALES",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"PASO YOBAI",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"JESÚS",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"CAPIIBARY",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"YRYBUCUÁ",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"NUEVA GERMANIA",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"AYOLAS",
      "departamento":"MISIONES"
   },
   {  
      "municipio":"NUEVA ITALIA",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"PARAGUARÍ",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"NUEVA COLOMBIA",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"HERNANDARIAS",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"TRINIDAD",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"GRAL. JOSÉ EDUVIGIS DÍAZ",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"SALTO DEL GUAIRÁ",
      "departamento":"CANINDEYU"
   },
   {  
      "municipio":"TOBATÍ",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"PASO BARRETO",
      "departamento":"CONCEPCION"
   },
   {  
      "municipio":"PIRIBEBUY",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"GRAL. ELIZARDO AQUINO",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"SANTA RITA",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"AVAÍ",
      "departamento":"CAAZAPA"
   },
   {  
      "municipio":"LA COLMENA",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"J. EULOGIO ESTIGARRIBIA",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"JUAN E. O'LEARY",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"MBOCAYATY DEL GUAIRÁ",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"SANTIAGO",
      "departamento":"MISIONES"
   },
   {  
      "municipio":"YBYRAROBANA",
      "departamento":"CANINDEYU"
   },
   {  
      "municipio":"PEDRO JUAN CABALLERO",
      "departamento":"AMAMBAY"
   },
   {  
      "municipio":"GUAZU CUÁ",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"ACAHAY",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"SANTA ROSA MISIONES",
      "departamento":"MISIONES"
   },
   {  
      "municipio":"BAHIA NEGRA",
      "departamento":"ALTO PARAGUAY"
   },
   {  
      "municipio":"FILADELFIA",
      "departamento":"BOQUERON"
   },
   {  
      "municipio":"VILLA CURUGUATY",
      "departamento":"CANINDEYU"
   },
   {  
      "municipio":"CAAZAPÁ",
      "departamento":"CAAZAPA"
   },
   {  
      "municipio":"LUQUE",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"CORONEL BOGADO",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"MINGA GUAZÚ",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"LIMA",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"ITAUGUA",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"PIRAPÓ",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"JUAN DE MENA",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"ANTEQUERA",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"PIRAYÚ",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"CAPITÁN MEZA",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"CONCEPCIÓN",
      "departamento":"CONCEPCION"
   },
   {  
      "municipio":"ITAPÉ",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"LAMBARÉ",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"CARMEN DEL PARANÁ",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"SAN BERNARDINO",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"NARANJAL",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"QUIINDY",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"J. AUGUSTO SALDIVAR",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"ENCARNACIÓN",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"ITANARÁ",
      "departamento":"CANINDEYU"
   },
   {  
      "municipio":"VILLA FLORIDA",
      "departamento":"MISIONES"
   },
   {  
      "municipio":"ITURBE",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"OBLIGADO",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"GENERAL DELGADO",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"3 DE FEBRERO",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"SAN RAFAEL DEL PARANÁ",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"SAN JUAN DEL PARANÁ",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"SAN COSME Y DAMIÁN",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"CARAGUATAY",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"MCAL. FRANCISCO SOLANO LÓPEZ",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"CAAGUAZÚ",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"SAPUCAI",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"ITAPÚA POTY",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"GRAL. FRANCISCO I. RESQUIN",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"VILLA YGATIMÍ",
      "departamento":"CANINDEYU"
   },
   {  
      "municipio":"GENERAL ARTIGAS",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"MBOCAYATY DEL YHAGUY",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"PUERTO PINASCO",
      "departamento":"PRESIDENTE HAYES"
   },
   {  
      "municipio":"CAPITÁN MIRANDA",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"ÑEMBY",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"SAN JUAN BAUTISTA",
      "departamento":"MISIONES"
   },
   {  
      "municipio":"AREGUA",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"VAQUERÍA",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"BELLA VISTA - AMAMBAY",
      "departamento":"AMAMBAY"
   },
   {  
      "municipio":"YPACARAI",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"SANTA FÉ DEL PARANÁ",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"VILLARRICA",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"ITAKYRY",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"IRUÑA",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"MCAL JOSE F. ESTIGARRIBIA",
      "departamento":"BOQUERON"
   },
   {  
      "municipio":"SAN PEDRO DEL PARANÁ",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"3 DE MAYO",
      "departamento":"CAAZAPA"
   },
   {  
      "municipio":"CORONEL OVIEDO",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"YATAITY DEL NORTE",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"GRAL. BERNARDINO CABALLERO",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"LA PALOMA DEL ESPIRITU SANTO",
      "departamento":"CANINDEYU"
   },
   {  
      "municipio":"SANTA ROSA DEL MONDAY",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"CAMBYRETÁ",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"DESMOCHADOS",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"CORPUS CHRISTI",
      "departamento":"CANINDEYU"
   },
   {  
      "municipio":"SAN MIGUEL",
      "departamento":"MISIONES"
   },
   {  
      "municipio":"BUENA VISTA",
      "departamento":"CAAZAPA"
   },
   {  
      "municipio":"ISLA PUCÚ",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"BELLA VISTA - ITAPÚA",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"DR. RAUL PEÑA",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"SAN ESTANISLAO",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"TTE ESTEBAN MARTINEZ",
      "departamento":"PRESIDENTE HAYES"
   },
   {  
      "municipio":"SAN ANTONIO",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"SAN IGNACIO",
      "departamento":"MISIONES"
   },
   {  
      "municipio":"CAPIATÁ",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"NUEVA ESPERANZA",
      "departamento":"CANINDEYU"
   },
   {  
      "municipio":"SAN PEDRO DEL YCUAMANDIYÚ",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"MINGA PORÁ",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"SANTA ROSA DEL MBUTUY",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"NATALIO",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"JOSÉ FALCÓN",
      "departamento":"PRESIDENTE HAYES"
   },
   {  
      "municipio":"ISLA UMBÚ",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"YHÚ",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"CERRITO",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"SAN CRISTOBAL",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"VILLALBÍN",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"TEBICUARY",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"HUMAITÁ",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"GRAL. EUGENIO A. GARAY",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"REPATRIACIÓN",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"DR. BOTTRELL",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"SAN JOAQUÍN",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"EMBOSCADA",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"SANTA ELENA",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"MAYOR JOSÉ D. MARTINEZ",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"FULGENCIO YEGROS",
      "departamento":"CAAZAPA"
   },
   {  
      "municipio":"ITACURUBÍ DE LAS CORDILLERAS",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"FERNANDO DE LA MORA",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"LIBERACION",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"TAVAPY",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"JUAN MANUEL FRUTOS",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"PRIMERO DE MARZO",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"YBYCUI",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"NUEVA ALBORADA",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"JOSÉ LEANDRO OVIEDO",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"DOMINGO MARTÍNEZ DE IRALA",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"FÉLIX PÉREZ CARDOZO",
      "departamento":"GUAIRA"
   },
   {  
      "municipio":"TOMÁS ROMERO PEREIRA",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"ATYRA",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"LOS CEDRALES",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"BELÉN",
      "departamento":"CONCEPCION"
   },
   {  
      "municipio":"GRAL JOSE M. BRUGUEZ",
      "departamento":"PRESIDENTE HAYES"
   },
   {  
      "municipio":"YBYTIMI",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"EUSEBIO AYALA",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"LIMPIO",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"JUAN E. OLEARY",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"ÑACUNDAY",
      "departamento":"ALTO PARANA"
   },
   {  
      "municipio":"TEBICUARYMI",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"ESCOBAR",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"MACIEL",
      "departamento":"CAAZAPA"
   },
   {  
      "municipio":"VILLA ELISA",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"YPEJHU",
      "departamento":"CANINDEYU"
   },
   {  
      "municipio":"TAVAÍ",
      "departamento":"CAAZAPA"
   },
   {  
      "municipio":"ITÁ",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"SAN JOSÉ DE LOS ARROYOS",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"FUERTE OLIMPO",
      "departamento":"ALTO PARAGUAY"
   },
   {  
      "municipio":"ZANJA PYTA",
      "departamento":"AMAMBAY"
   },
   {  
      "municipio":"YPANÉ",
      "departamento":"CENTRAL"
   },
   {  
      "municipio":"YUTY",
      "departamento":"CAAZAPA"
   },
   {  
      "municipio":"GUAJAYVI",
      "departamento":"SAN PEDRO"
   },
   {  
      "municipio":"HOHENAU",
      "departamento":"ITAPUA"
   },
   {  
      "municipio":"ALTOS",
      "departamento":"CORDILLERA"
   },
   {  
      "municipio":"TEMBIAPORA",
      "departamento":"CAAGUAZU"
   },
   {  
      "municipio":"CARAPEGUÁ",
      "departamento":"PARAGUARI"
   },
   {  
      "municipio":"ASUNCIÓN",
      "departamento":"ASUNCION"
   },
   {  
      "municipio":"PASO DE PATRIA",
      "departamento":"ÑEEMBUCU"
   },
   {  
      "municipio":"LOMA PLATA",
      "departamento":"BOQUERON"
   },
   {  
      "municipio":"TTE IRALA FERNANDEZ",
      "departamento":"PRESIDENTE HAYES"
   }
   ,
   {
      "municipio":"25 DE DICIEMBRE",
      "departamento":"SAN PEDRO"
   }
];