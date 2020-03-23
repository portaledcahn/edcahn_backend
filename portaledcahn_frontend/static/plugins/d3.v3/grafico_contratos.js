/** Servicios internos * */
var dataService = new function() {
	var serviceBase = '/datos/parametros/',
	/***************************************************************************
	 * Obtiene la lista de categorías posibles de un llamado, ejecutando el
	 * callback en caso de éxito.
	 **************************************************************************/
	getCategorias = function(callback) {
		$.getJSON(serviceBase + 'categorias', function(data) {
			callback(data);
		});
	};

	/***************************************************************************
	 * Obtiene la lista de instituciones convocantes posibles de un llamado,
	 * ejecutando el callback en caso de éxito.
	 **************************************************************************/
	getTiposDeProcedimiento = function(callback) {
		$.getJSON(serviceBase + 'tipos-procedimiento', function(data) {
			callback(data);
		});
	};

	/***************************************************************************
	 * Obtiene la lista de modalidades posibles de un llamado, ejecutando el
	 * callback en caso de éxito.
	 **************************************************************************/
	getConvocantes = function(callback) {
		$.getJSON(serviceBase + 'convocantes', function(data) {
			callback(data);
		});
	};

	return {
		getCategorias : getCategorias,
		getTiposDeProcedimiento : getTiposDeProcedimiento,
		getConvocantes : getConvocantes,
	};

}();
var loc = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')
var loc='https://www.contrataciones.gov.py';
//datos/interno/contratosPorAnioNivel/2020/PODER%20EJECUTIVO
var urlBase = loc + "/datos";
//var urlBase = "http://localhost:9001/datos";

var loadingSpinner = (function() {
    var spinner;
    var spin = function(target, options){
        spinner = new Spinner(options);
        spinner.spin(target);
    };
    var stop = function(){
        spinner.stop();
    };
    return {spin: spin, stop: stop};
})();

/** Gráfico de contratos sumarizados por nivel entidad y entidad * */
var anioActual = ((new Date().getFullYear())), nivelActual = "poder-ejecutivo", entidadActual, chart = null, popactual = null, data, height;

var idToNivel = {
	'poder-ejecutivo' : 'PODER EJECUTIVO',
	'gobiernos-departamentales' : 'GOBIERNOS DEPARTAMENTALES',
	'entes-autonomos-autarquicos' : 'ENTES AUTÓNOMOS Y AUTÁRQUICOS',
	'universidades-nacionales' : 'UNIVERSIDADES NACIONALES',
	'municipalidades' : 'MUNICIPALIDADES',
	'poder-legislativo-judicial' : 'PODER LEGISLATIVO Y JUDICIAL',
	'otros' : 'OTROS'
};

var es_ES = {
	"decimal" : ".",
	"thousands" : "\xa0",
	"grouping" : [ 3 ],
	"currency" : [ "", " руб." ],
	"dateTime" : "%A, %e %B %Y г. %X",
	"date" : "%d.%m.%Y",
	"time" : "%H:%M:%S",
	"periods" : [ "AM", "PM" ],
	"days" : [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes",
			"Sábado" ],
	"shortDays" : [ "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab" ],
	"months" : [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
			"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre",
			"Diciembre" ],
	"shortMonths" : [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago",
			"Sep", "Oct", "Nov", "Dic" ]
}
var ES = d3.locale(es_ES);

var initChart = function(nivel, rScale) {
	// console.log(data.length);
	var cant = data.length;
	if (cant == 1 || cant == 2)
		height = 50 + cant * 55 + 50;
	else
		height = 50 + cant * 55;

	function truncate(str, maxLength, suffix) {
		if (str.length > maxLength) {
			str = str.substring(0, maxLength + 1);
			str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
			str = str + suffix;
		}
		return str;
	}

	var margin = {
		top : 20,
		right : 200,
		bottom : 0,
		left : 20
	}, width = 700;

	var start_year = 1, end_year = 12;

	var c = d3.scale.category20c();

	var x = d3.scale.linear().range([ 0, width ]);

	var xAxis = d3.svg.axis().scale(x).orient("top");

	var x2 = d3.time.scale().domain(
			[ new Date(anioActual, 0, 1), new Date(anioActual, 10, 31) ]).range(
			[ 0, width ]);

	var xAxis2 = d3.svg.axis().scale(x2).orient("top").ticks(d3.time.months)
			.tickSize(5, 0).tickFormat(ES.timeFormat("%B"));

	var formatYears = d3.format("0000");
	xAxis.tickFormat(formatYears);

	var marginleft = margin.left + 320;
	var svg = d3.select("#chart").append("svg").style("width",
			850 + margin.left + margin.right).attr("height",
			height + margin.top + margin.bottom).style("margin-left",
			margin.left + "px").append("g").attr("transform",
			"translate(" + marginleft + "," + margin.top + ")");

	x.domain([ start_year, end_year ]);
	var xScale = d3.scale.linear().domain([ start_year, end_year ]).range(
			[ 0, width ]);

	svg.append("g").attr("class", "x axis").attr("transform",
			"translate(0," + 40 + ")").call(xAxis2);

    if(!rScale){
    	var contratos = _.map(data, function(elem) {
    		return elem.values.contratos
    	});
    	var cantidades = _.chain(contratos).flatten().map(function(contrato) {
    		return parseInt(contrato.cantidad)
    	}).value();
    	rScale = d3.scale.sqrt().domain([ 0, _.max(cantidades) ]).range(
    			[ 0, 25 ]);
    }

	// console.log(_.max(cantidades));
    // console.log(data);
	for (var j = 0; j < data.length; j++) {
		var g = svg.append("g").attr("class", "journal");

		var circles = g.selectAll("circle")
				.data(data[j]['values']['contratos']).enter().append("circle");

		var text = g.selectAll("text").data(data[j]['values']['contratos'])
				.enter().append("text");

		circles.attr("cx", function(d, i) {
			return xScale(d['mes']);
		}).attr("cy", j * 50 + 80).attr("r", function(d) {
			return rScale(d['cantidad']);
		}).style("fill", function(d) {
			return c(j);
		}).on("click", click).on("mouseover", mouseover).on("mouseout", mouseout);
		
		text.attr("y", j * 50 + 85).attr("x", function(d, i) {
			return xScale(d['mes']) - 5;
		}).attr("class", "value").text(function(d) {
			return d['cantidad'];
		}).style("fill", function(d) {
			return c(j);
		}).style("display", "none")
		.on("click", click).on("mouseover", mouseover).on("mouseout", mouseout);

		g.append("text").attr("y", j * 50 + 85).attr("x", -320).attr(
				"class", "label")
		// .text(truncate(data[j]['key'],40,"..."))
		.text(data[j]['key']).style("fill", function(d) {
			return c(j);
		}).on("click", click).on("mouseover", mouseover).on("mouseout", mouseout);
	};

	// chart title
	svg.append("text").text(nivel).attr("x", width / 3).attr("y", 0).attr(
			"class", "titleChart")

	function mouseover(p) {
		var g = d3.select(this).node().parentNode;
		d3.select(g).selectAll("circle").attr("opacity", 0);
		d3.select(g).selectAll("text.value").style("display", "block").classed("active", true); 
	}

	function mouseout(p) {
		var g = d3.select(this).node().parentNode;
		d3.select(g).selectAll("circle").attr("opacity", 1);
		d3.select(g).selectAll("text.value").style("display", "none").classed("active", true);
	}

	function click(p) {
		/*
		 * Obtener el nombre de la entidad en la que hizo click para pasarle al
		 * grafico 2
		 */

		 console.dir('HICE CLICK EN UN MINISTERIO')
		var g = d3.select(this).node().parentNode;
		var nodo = d3.select(g);
		var entidad = nodo.select("text.label").text();
		entidadActual = getEntidadNoAbreviada(entidad).toUpperCase();
		$('#graficoPorEntidad').show();

		$('#titleChart').show();
		$('#titleChart').text(entidadActual);
		drawChart2(entidadActual, "contrato");
		$('html,body').animate({ scrollTop: $("#chart2").offset().top}, 'slow');
		
		$("#buttonOptions > .btn").removeClass("active");
    	$("#contrato").addClass("active");
	}

}

$('#buttonYears').on('click', function(event) {
	anioActual = $(event.target).attr('id');
	$("#buttonYears > .btn").removeClass("active");
	$("#" + anioActual).addClass("active");
	
	$('#graficoPorEntidad').hide();
	$('#titleChart').hide();
	$('.subTitleChart').hide();
	$("#chart2").empty();
	$("#chart").empty();
	drawBySelection(nivelActual);

});

$('#buttonFilters').on('click', function(event) {
	var buttonId = $(event.target).attr('id');
	$("#buttonFilters > .btn").removeClass("active");
	$("#" + buttonId).addClass("active");
	
	$('#graficoPorEntidad').hide();
	$('#titleChart').hide();
    $('.subTitleChart').hide();
	$("#chart2").empty();
	$("#chart").empty();
	
	drawBySelection(buttonId);
});

function drawResponse(response, nivel, rScale) {
    if (!response) {
        alert("Debe indicar al menos un filtro.");
        return null;
    } else {

        var nestData = d3.nest().key(function(d) {
            //var entAbr = getEntidadAbreviada(d.entidad);
            var entAbr = getEntidadAbreviada(d.entidad.toUpperCase());
            return entAbr;
        }).rollup(function(rows) {
            return {
                total : d3.sum(rows, function(g) {
                    return g.cantidad;
                }),
                contratos : rows
            };
        }).entries(response);

        data = nestData;

        /* Para el caso de especial de municipalidades se separa por departamento */
        var nestDistritos = {};
        var nestDepartamentos = {};
        if (nivel === "MUNICIPALIDADES") {
            _.each(distritos, function(d){
            	//nestDistritos[d.municipio]=d.departamento;
                nestDistritos[d.municipio.toLowerCase()]=d.departamento;
            });
            _.each(departamentos, function(d){
            	nestDepartamentos[d.departamento]=d.numero;
            });

            var nestMunicipios = d3.nest().key(function(d) {
                var a = d.key.split(" / ");
                var municipalidad;
                if (a != 0) {
                    municipalidad = a[0];
                } else {
                    municipalidad = d.key;
                }
                var lowerMunicipalidad = municipalidad.toLowerCase();
                //var distrito = municipalidad.replace(/^MUN. DE /, '');
                var distrito = lowerMunicipalidad.replace(/^mun. de /, '');
                //var distritoSinAcento = RemoveAccents(distrito);
                var departamento = nestDistritos[distrito];
                return departamento;
            }).rollup(function(rows) {
                return {
                    contratos : rows
                };
            }).entries(data);
            var rScale = getEscalaCantidad(response);
            
            /* Ordenar por número de departamento antes de graficar */
            nestMunicipios = _.sortBy(nestMunicipios, function(n) {
            	return nestDepartamentos[n['key']];
            });
            
            for (var j = 0; j < nestMunicipios.length; j++){
                data = nestMunicipios[j]['values']['contratos'];
                loadingSpinner.stop();
                initChart(nestMunicipios[j].key, rScale);
            }

        } else {
        	loadingSpinner.stop();
            initChart(nivel, rScale);
        }
    }
}

/**
Retorna la escala para un grupo de contratos, correspondientes a un numero variable de entidades.
**/
function getEscalaCantidad(){
    var contratos = _.reduce(arguments, function(memo, list){return memo.concat(list);}, []);
    var cantidades = _.map(contratos, function(elem){return parseInt(elem.cantidad)});
    return rScale = d3.scale.sqrt().domain([0, _.max(cantidades)]).range([3, 25]);
}

function drawBySelection(id) {
	loadingSpinner.spin(document.getElementById("chart"), {top: '50%'});
	switch (idToNivel[id]) {
	case 'PODER LEGISLATIVO Y JUDICIAL':
		$.when(obtenerContratos(anioActual, 'PODER LEGISLATIVO'),
			   obtenerContratos(anioActual, 'PODER JUDICIAL')
		).done(function(contratosLegislativo, contratosJudicial){
		    var rScale = getEscalaCantidad(contratosLegislativo[0], contratosJudicial[0]);
		    if (contratosLegislativo[0].length > 0)
		    	drawResponse(contratosLegislativo[0], 'PODER LEGISLATIVO', rScale);
		    if (contratosJudicial[0].length > 0)
		    	drawResponse(contratosJudicial[0], 'PODER JUDICIAL', rScale);
		});
		break;
	case 'OTROS':
	    $.when(obtenerContratos(anioActual, 'CONTRALORÍA GENERAL DE LA REPÚBLICA'),
            obtenerContratos(anioActual, 'BANCA CENTRAL DEL ESTADO'),
            // obtenerContratos('OTROS ORGANISMOS DEL ESTADO'),
            obtenerContratos(anioActual, 'ENTIDADES PÚBLICAS DE SEGURIDAD SOCIAL'),
            obtenerContratos(anioActual, 'EMPRESAS PÚBLICAS'),
            obtenerContratos(anioActual, 'EMPRESAS MIXTAS'),
            obtenerContratos(anioActual, 'ENTIDADES FINANCIERAS OFICIALES')
		).done(function(contratosContraloria, contratosBancoCentral, contratosSocial,
		 contratosPublicas, contratosMixtas, contratosFinancieras){
		    var rScale = getEscalaCantidad(contratosContraloria[0], contratosBancoCentral[0], contratosSocial[0],
                                           		 contratosPublicas[0], contratosMixtas[0], contratosFinancieras[0]);
		    //console.log(contratosContraloria[0]);
		    if (contratosContraloria[0].length > 0)
		    	drawResponse(contratosContraloria[0], 'CONTRALORÍA GENERAL DE LA REPÚBLICA', rScale);
		    if (contratosBancoCentral[0].length > 0)
		    	drawResponse(contratosBancoCentral[0], 'BANCA CENTRAL DEL ESTADO', rScale);
		    if (contratosSocial[0].length > 0)
		    	drawResponse(contratosSocial[0], 'ENTIDADES PÚBLICAS DE SEGURIDAD SOCIAL', rScale);
            if (contratosPublicas[0].length > 0)
            	drawResponse(contratosPublicas[0], 'EMPRESAS PÚBLICAS', rScale);
            if (contratosMixtas[0].length > 0)
            	drawResponse(contratosMixtas[0], 'EMPRESAS MIXTAS', rScale);
            if (contratosFinancieras[0].length > 0)
            	drawResponse(contratosFinancieras[0], 'ENTIDADES FINANCIERAS OFICIALES', rScale);
		 });
		// obtenerContratos('EMPRESAS CON ACCIONES EN PARTICIPACIÓN CON EL ESTADO');
		break;
	default:
		$.when(obtenerContratos(anioActual, idToNivel[id])).then(function(response){
			console.dir('PRIMER GRAFICO')
			console.dir(response)
			console.dir(JSON.stringify(response))
			console.dir(idToNivel[id])
		    drawResponse(response, idToNivel[id]);
		});
	}
	nivelActual = id;

}

function obtenerContratos(anio, nivel) {
    return $.ajax({
           		url : urlBase + "/interno/contratosPorAnioNivel/"
           				+ anio + "/" + nivel,
           		type : "get"
           	});
}

drawBySelection(nivelActual); // PODER EJECUTIVO se grafica por defecto

/**
 * Gráfico de contratos por entidad, convocante, categoría y tipo de
 * procedimiento 
 */
var width2 = 960, 
	height2 = 200,
	rectWidth = 20, 
	rectHeight = 10, 
	nodeStrokeW = 0.5, 
	padding = 1, 
	legendRectSize = 18;
	legendSpacing = 4;

var tooltip = d3.select("body").append("div").style("position", "absolute")
		.style("z-index", "10").style("visibility", "hidden").style("color",
				"white").style("padding", "8px").style("background-color",
				"rgba(0, 0, 0, 0.75)").style("border-radius", "6px").style(
				"font", "12px sans-serif").text("tooltip");

var chart = null, force = null, dataChart2, dataChart2Complete, tiposDeProcedimiento, categorias;

var objetosDelLlamado = [ "Bienes", "Consultorías", "Locación inmuebles",
		"Locación muebles", "Obras", "Servicios", "Tierras" ]

var nombreToCodigoObjetoLlamado = {
	"Bienes" : "BIEN",
	"Consultorías" : "CON",
	"Locación inmuebles" : "LOCINM",
	"Locación muebles" : "LOCMUE",
	"Obras" : "OBRAS",
	"Servicios" : "SER",
	"Tierras" : "TIERRAS"
};

var objetosDelLlamadoMap = {
	"BIEN" : "#542788",
	"CON" : "#998EC3",
	"LOCINM" : "#D8DAEB",
	"LOCMUE" : "#FEE0B6",
	"OBRAS" : "#F1A340",
	"SER" : "#B35806",
	"TIERRAS" : "#ddd"
};

var tipos = {
	"centralizado" : [ "Poder Ejecutivo", "Poder Legislativo",
			"Poder Judicial", "Contraloría General de la República",
			"Otros organismos del estado" ],
	"descentralizado" : [ "Banca Central del Estado",
			"Gobiernos Departamentales", "Entes Autónomos y Autárquicos",
			"Entidades Públicas de Seguridad Social", "Empresas Públicas",
			"Empresas Mixtas", "Entidades Financieras Oficiales",
			"Universidades Nacionales" ],
	"municipalidades" : [ "Municipalidades" ]
}

var maximoBurbujas = 250;
var nodes, labels;

/* Valores para la escala de burbujas con montos en dolares */
var anioCambio = {
	"2010": "4741",
    "2011": "4190",
    "2012": "4425",
    "2013": "4311",
    "2014": "4477",
    "2015": "5248",
	"2016": "5800"
};

var initForce = function(showAll) {
	if (force) {
       force.stop();
    }
	var totalHeight = height2 + 200;
	/*if(showAll){
	    dataChart2 = dataChart2Complete;
	}else{
		dataChart2 = _.chain(dataChart2).sortBy(function(d){ return d.monto_adjudicado; }).take(maximoBurbujas).value();
	}*/
	var totalContratos = dataChart2Complete["cantidad"];
	/*var maxElem = d3.max(dataChart2, function(d) {
		return d.monto_adjudicado;
	})
	var area = d3.scale.sqrt().domain([ 0, maxElem ]).range([ 0, 10 ]);*/
	var montos = _.map(dataChart2, function(elem){
			var now = elem.fecha_firma_contrato;
			var test = now.substring(0,10);
			var m = moment(test);
			var montoEscalable;
			if (elem._moneda == "PYG") {
				montoEscalable = elem.monto_adjudicado;
			} else {
				var anio = m.year();
				montoEscalable = elem.monto_adjudicado * anioCambio[anio];
			}
			//return parseInt(elem.monto_adjudicado)
			return parseInt(montoEscalable)
		});
	var rScale = d3.scale.sqrt().domain([0, _.max(montos)]).range([3, 25]);

	for (var j = 0; j < dataChart2.length; j++) {
		/* La x se genera en base a la fecha */
		var now = dataChart2[j].fecha_firma_contrato;
		var test = now.substring(0,10);
		var m = moment(test);
		var day = m.dayOfYear() - 1;
		
		// escalar el monto segun la moneda
		var montoEscalable;
		if (dataChart2[j]._moneda == "PYG") {
			montoEscalable = dataChart2[j].monto_adjudicado;
		} else {
			var anio = m.year();
			montoEscalable = dataChart2[j].monto_adjudicado * anioCambio[anio];
		}
		
		//dataChart2[j].r = rScale(dataChart2[j].monto_adjudicado);
		dataChart2[j].r = rScale(montoEscalable);
		dataChart2[j].x = day;
		dataChart2[j].y = Math.random() * height2;
		dataChart2[j].dia = day; //seterle el dia segun la fecha
		dataChart2[j].mes = m.month(); //setearle el mes segun la fecha
		//console.log(dataChart2[j].monto_adjudicado);
		//console.log(dataChart2[j]._moneda);
		//console.log(dataChart2[j].monto_escalable);
    }
	
	chart = d3.select("#chart2")
		.append("svg")
			.style("width", "1080px")
		  	.attr("height", totalHeight)
		  	.attr("pointer-events", "all")
	  	.append("g")
	    	.attr("transform", "translate(70,10)")
	  	.append('g');

	chart.append('rect')
	   	.style('width', width2)
	   	.attr('height', totalHeight)
	   	.attr('fill', 'white');
	
	var xScale = d3.scale.linear().domain([ 0, 366 ]).range([ 0, width2 ])

	var xScaleTime = d3.scale.ordinal()
			.domain(["Enero", "Abril", "Agosto", "Diciembre"])
			.rangePoints([0, width2]);
			//.range([ 0, width2 ]);
	   
	var axis = d3.svg.axis().scale(xScaleTime).orient("bottom")
	
	var xAxis = chart.append("g")
		.attr("class", "x axis")
		//.style({ 'stroke': '#000', 'fill': 'none', 'stroke-width': '0.2'})
		.call(axis)
		
	xAxis.selectAll('text')
		.style({ 'stroke-width': '0.1', 'fill': '#000'});

    drawLines(1, width2);
    drawLegend(chart, totalHeight);
    
	nodes = chart.selectAll("circle").data(dataChart2);
	nodes.enter().append("circle")
		.attr("class", "node")
	    .attr("cx", function(d) { return xScale(d.x) })
	    .attr("cy", function(d) { return d.y })
	    .attr("r", function(d) { return d.r })
		.style("fill", function(d) {
			return alternatingColorScale(d._objeto_licitacion,true);})
	  	.style("stroke", "black")
		.style("stroke-width", nodeStrokeW)
      	.style("display", function(){ return (dataChart2.length > maximoBurbujas) ? "none" : "block"; })
      	//.on("mouseover", function (d) { showPopover.call(this, d); })
		//.on("mouseout",	function (d) { removePopovers(); })
		.on("mouseover", mouseover)
		.on("mouseout", mouseout)
		.on("mousemove", mousemove)
		.on("click", clickBubble)
	
   	force = d3.layout.force()
	    //.gravity(0)
	    //.charge(0)
	    .friction(0)
   		//.alpha(0.8);
	   	.nodes(dataChart2)
	    .size([width2, totalHeight]);


    if(dataChart2.length > maximoBurbujas){
        force.on("start", function(){
            loadingSpinner.spin(document.getElementById("chart2"), {top: '85%'});
        });

        force.on("end", function(){
            loadingSpinner.stop();
            nodes.style("display", "block");
        });
    }


    var msg = "Mostrando " + dataChart2.length.toString() + " contratos de un total de " + totalContratos + ".";
    if(dataChart2.length < totalContratos){
        msg += " Ver todos los contratos haciendo click <a id='showAll' href='#'>aquí</a>."
    }
    if(dataChart2.length > maximoBurbujas){
        msg += " Ver los " + maximoBurbujas.toString() + " contratos con mayor monto adjudicado haciendo click <a id='showSome' href='#'>aquí</a>."
    }
    $('.subTitleChart').remove();
    $('#titleChart').after('<div class="subTitleChart">'+ msg +'</div>');
    $('#showAll').click(function(e){
        e.preventDefault();
        $("#chart2").empty();
        //initForce(true);
        loadingSpinner.spin(document.getElementById("chart2"), {top: '95%'});
    	obtenerContratosPorEntidad(anioActual, nivelActual, entidadActual, totalContratos);
    });
    $('#showSome').click(function(e){
        e.preventDefault();
        $("#chart2").empty();
        //initForce(false);
        loadingSpinner.spin(document.getElementById("chart2"), {top: '95%'});
    	obtenerContratosPorEntidad(anioActual, nivelActual, entidadActual, 250);
    });

	/* que se grafique en el tree layout con sus centros */
	var centers = getCenters("dia", [width2, height2]);
	force.on("tick", tick(centers, "dia"));
    force.start();
    
}

/* Funcion para agrupar las burbujas hacia su centro */
function tick (centers, varname) {
      //console.log(centers);
      var foci = {}; // Making an object here for quick look-up
      for (var i = 0; i < centers.length; i++) {
        foci[centers[i].name] = centers[i];
      }
      return function (e) { //A
        for (var i = 0; i < dataChart2.length; i++) {
          var o = dataChart2[i];
          var key = (varname === 'dia') ? o[varname] : o.dia.toString() + o[varname];
          var f = foci[key];
          if(!f){
        	  console.log(o);
        	  console.log(f);
        	  console.log(foci);
        	  console.log(key);
          }
          o.y += ((f.y + (f.dy / 2)) - o.y) * e.alpha;
          o.x += ((f.x + (f.dx / 2)) - o.x) * e.alpha;
        }
        nodes.each(collide(.11)) //B
          .attr("cx", function (d) { return d.x; })
          .attr("cy", function (d) { return d.y; });
      }
    }

/* Funcion para ubicar los centros - Variable de agrupacion: dia */
function getCenters (vname, size) {
    var centersByDay, groups, centers;
    if(vname === 'dia'){
        centersByDay = getCentersByDay(size);
        //centers = centersByDay;
        centers = _.map(centersByDay, function(c){
         return {name: c.name, value: 1, dia: c.dia, x: c.x, y: c.y + 100, dx: c.dx, dy: c.dy }
        });
    }else{
        groups = _.uniq(_.pluck(dataChart2, vname));
        labels = _.map(groups, _.clone);
        size[1] = size[1]/groups.length;
        centersByDay = getCentersByDay(size);
        centers = _.chain(centersByDay).map(function(c){
            return _.map(groups, function(g, i){
                var y = (c.y + i * height2 + 100);
                return {name: c.name.toString() + g, value: 1, dia: c.dia, x: c.x, y: y, dx: c.dx, dy: c.dy };
            });
        }).flatten().value();
    }
    return centers;  //D
};

function getCentersByDay (size){
    var centers, map;
    var circulitos;

    centers = _.range(365).map(function (d) { //A
            return {name: d, value: 1, dia:d};
    });

    map = d3.layout.treemap().size(size).ratio(1/1).sort(function(a,b){return b.dia - a.dia}).mode("slice"); //B
    map.nodes({children: centers}); //C
    return centers; //D
};

/* Leyenda de colores */
function drawLegend(chart, chartHeight){
	var hor = -100;
	var ver = chartHeight - 50;
	var legend = chart.selectAll('.legend').data(objetosDelLlamado).enter()
			.append('g').attr('class', 'legend').attr('transform',
					function(d, i) {
						hor = hor + 150;
						return 'translate(' + hor + ',' + ver + ')';
					});

	legend.append('rect')
	  	.attr('width', legendRectSize)
	  	.attr('height', legendRectSize - 10)
	  	.style('fill', function(d){return alternatingColorScale(d);})
	  	.style('stroke', function(d){return alternatingColorScale(d);});

	legend.append('text')
	  	.attr('x', legendRectSize + legendSpacing)
	  	.attr('y', legendRectSize - legendSpacing - 6)
			.text(function(d) { return d; });
}

/* Línea de puntos en medio del gráfico y/o en cada agrupación */
function drawLines(number, newWidth, esAgrupacion){
    _.times(number, function(i){
    	var x1,x2,y;
    	if((number - 1) === 0){
    	    y = height2 * i + 200;
    	}else{
    	    y = height2 * i + 185 - (i * 17);
    	    if(y > 2500) y -= 12;
    	}

    	if (esAgrupacion) {
    		x1 = 50;
    		x2 = newWidth + 50;
    	} else {
    		x1 = 0;
    		x2 = width2;
    	}
    	chart.append("line")
    	    .attr("class", 'd3-dp-line')
    	    .attr("x1", x1)
    	    .attr("y1", y)
    	    .attr("x2", x2)
    	    .attr("y2", y)
    	    .style("stroke-dasharray", ("1, 1"))
    	    .style("stroke-opacity", 0.9)
    	    .style("stroke-width", 0.3)
    	    .style("stroke", "#000");
    });
}

function drawLabels(number, vname) {
	_.times(number, function(i){
        /* Labels para cada agrupación */
    	//var y = height2 * i + 200 - (i * 40);
    	if((number - 1) === 0){
            y = height2 * i + 215;
        }else{
            y = height2 * i + 205 - (i * 17);
            if(y > 2500) y -= 12;
        }
    	var strippedLabels = _.map(labels, function(l){
    		return l.split("/")[0];
    	});
    	
    	var g = chart.append("g").attr("class", "journal");
		g.append("text")
			.attr("y", y)
			.attr("x", -50)
			.attr("dy", 0)
    	    .attr("dx", 0)
			.attr("class", "label")
			//.call(wrap, labels[i]);
			.text(labels[i]);
    });
}

function groupBy(vname){
    var chart, groups, newWidth, totalHeight, centers, linesHeight;
    groups = _.uniq(_.pluck(dataChart2, vname));
    newWidth = width2 - 150;
    totalHeight = (height2 - 17) * (groups.length - 1) + (2 * height2);
    linesHeight = totalHeight - (height2 + 100);
    //totalHeight = groups.length * height2;
    chart = d3.selectAll("#chart2 svg")
    			.attr("width", newWidth)
    		  	.attr("height", totalHeight);
    
    chart.select('#chart2 svg g')
    	.attr("transform", "translate(100,10)")
    
    chart.select('#chart2 svg rect')
    	.attr('width', newWidth)
        .attr('height', totalHeight);
	
    chart.select(".x.axis").remove();
    
    xScale = d3.scale.linear().domain([ 0, 366 ]).range([width2 - newWidth, width2])

    xScaleTime = d3.scale.ordinal()
    		.domain(["Enero", "Abril", "Agosto", "Diciembre"])
    		.rangePoints([width2 - newWidth, width2]);
    
	var axis = d3.svg.axis().scale(xScaleTime).orient("bottom")
	
	var xAxis = chart.append("g")
		.attr("class", "x axis")
		//.style({ 'stroke': '#000', 'fill': 'none', 'stroke-width': '0.2'})
		.call(axis)
		
	xAxis.selectAll('text')
		.style({ 'stroke-width': '0.1', 'fill': '#000'});
    
    chart.selectAll('line').remove();
    drawLines(groups.length, newWidth, true);
    
    chart.selectAll('.legend').remove();
    drawLegend(chart, totalHeight);
    
    centers = getCenters(vname, [newWidth + 105, linesHeight]);
    
    chart.selectAll('.label').remove();
    drawLabels(groups.length, vname);
    chart.selectAll('.label')
    	.call(wrap, 100);
    
    var foci = {}; // Making an object here for quick look-up
    for (var i = 0; i < centers.length; i++) {
        foci[centers[i].name] = centers[i];
    }
    force.on("tick", tick(centers, vname));
    force.start();
//    chart.selectAll('circle').attr('cy', function(c){
//        var key = c.dia.toString() + c[vname];
//        console.log(c);
//        return c.y + foci[key].y;
//    });

}

function wrap(text, width) {
	
	  text.each(function() {
	    var text = d3.select(this),
	        words = text.text().split(/\s+/).reverse(),
	        diff;
	    //console.log(words);
	    diff = -40;
	    var word,
	        line = [],
	        lineNumber = 0,
	        lineHeight = 1.1, // ems
	        y = parseFloat(text.attr("y")),
	        dy = parseFloat(text.attr("dy")),
	        //dx = parseFloat(text.attr("dx")),
	    y = y + diff;
	    var tspan = text.text(null).append("tspan").attr("x", -50).attr("y", y).attr("dy", dy + "em");
	   
	    while (word = words.pop()) {
	      line.push(word);
	      tspan.text(line.join(" "));
	      if (tspan.node().getComputedTextLength() > width) {
	        line.pop();
	        tspan.text(line.join(" "));
	        line = [word];
	        tspan = text.append("tspan").attr("x", -50).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
	      }
	    }
	  });
	}

function mouseover(d) {
	var moneda;
	if (d._moneda == "USD") {
		moneda = d._moneda;
	} else {
		moneda = "Gs.";
	}
	tooltip.html("<strong>Proveedor </strong> " + d.razon_social + "<br>" +
			"<strong>Llamado </strong> " + d.nombre_licitacion + "<br>" +
			"<strong>Objeto del llamado </strong> " + d.objeto_licitacion + "<br>" +
			"<strong>Categoria </strong> " + d.categoria + "<br>" +
			"<strong>Tipo de procedimiento </strong> " + d.tipo_procedimiento + "<br>" +
			"<strong>Código de contratación</strong> " + d.codigo_contratacion + "<br>" +
			"<strong>Fecha firma contrato </strong> " + moment(d.fecha_firma_contrato.split(" ")[0]).format('DD-MM-YYYY') + 
			"<br><strong>Monto total adjudicado </strong> " + parseInt(d.monto_adjudicado).toLocaleString() + " " + moneda)
			.style("visibility", "visible");
	//d3.select(this).style("fill-opacity", function(d) { return 0.8; });
	d3.select(this).style("stroke-width", "2px");
}

function mousemove(d) {
	tooltip.style("top",
		    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
}

function mouseout(d) {
	tooltip.style("visibility", "hidden");
	//d3.select(this).style("fill-opacity", function(d) { return 1; });
	d3.select(this).style("stroke-width", "0.5px");
}

function clickBubble(d) {

	console.log(urlBase);
	//window.open('http://localhost:9000/datos/visualizaciones/etapas-licitacion?id_llamado=' + d.id_llamado);
	window.open(urlBase+'/visualizaciones/etapas-licitacion?id_llamado=' + d.id_llamado);
}

function randomDate(start, end) {
	return new Date(start.getTime() + Math.random()
			* (end.getTime() - start.getTime()));
}

var alternatingColorScale = function(d,codigo) {
    if (codigo){
        return objetosDelLlamadoMap[d];
    } else {
        return objetosDelLlamadoMap[nombreToCodigoObjetoLlamado[d]];
    }

}

var padding = 5;
var maxRadius = d3.max(_.pluck(dataChart2, 'r'));

function collide(alpha) {
    var quadtree = d3.geom.quadtree(dataChart2);
    return function (d) {
      var r = d.r + maxRadius + padding,
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
      quadtree.visit(function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== d) ) {
          var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.r + quad.point.r + padding;

            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
        }

        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }

function obtenerContratosPorEntidad(anio, nivel, entidad, cantidad) {
	$.ajax({
		url : urlBase + "/interno/contratosPorAnioEntidad/"
				+ anio + "/" + entidad + "?cantidad=" + cantidad,
		type : "get",
		success : function(response) {
			console.dir('RESPUESTA')
			console.dir(response)
			console.dir(JSON.stringify(response))
			// console.log(response);
			if (!response) {
				alert("Debe indicar al menos un filtro.");
				return null;
			} else {
			    dataChart2Complete = response;
				dataChart2 = response["contratos"];
				var nestData = d3.nest().key(function(d) {
					return d.convocante;
				}).entries(dataChart2);
				
				if (nestData.length == 1) {
					$("#convocante").hide();
				} else {
					$("#convocante").show();
				}
				loadingSpinner.stop();
				initForce();
			}
		},
		error : function(xhr) {
			console.log('error');
			return null;
		}
	});
}

var agrupacionActual;

function drawChart2(entidad, agrupacion) {
	$("#chart2").empty();
    loadingSpinner.spin(document.getElementById("chart2"), {top: '95%'});
	agrupacionActual = agrupacion;
	console.dir({
		'ANO':anioActual,
		'NIVEL':nivelActual,
		'ENTIDAD':entidad
	})
	obtenerContratosPorEntidad(anioActual, nivelActual, entidad, 250);

}

$(document).ready(function(){
    $(".nav.nav-pills li").on("click",function(){
      $(".nav.nav-pills li").removeClass("active");
      $(this).addClass("active");
    });
    $("#buttonOptions button").click(function(){
    	$("#buttonOptions > .btn").removeClass("active");
    	$(this).addClass("active");
    	var agr = $(this).attr('id');
    	if (agr == "contrato") {
    		drawChart2(entidadActual, "contrato");
    	} else {
    		groupBy($(this).attr('id'));
    	}
    });
});

