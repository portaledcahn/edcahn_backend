$('.opcionFiltroBusquedaPagina').on('click',function(e){
    $(e.currentTarget).addClass('active')
  })
  tippy('#buscarInformacion', {
    arrow: true,
    arrowType: 'round',
    content:'Haz click para buscar'
  });
var selector='descargas';
$(function(){
  InicializarTabla('#descargas','Descargas');
  ObtenerDescargas('#descargas');
  /*$('#'+selector+'Buscar').on({
    change:function(e){
      AgregarResultados(1);
    }
  });
  $('#'+selector+'Buscar').next('i').on({
    click:function(e){
      AgregarResultados(1);
    }
  });
  $('#'+selector+'CantidadResultados').on({
    change:function(e){
      AgregarResultados(1);
    }
  });*/
  
})
var descargasGenerales=[
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_01.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_01.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_01.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_01.xlsx"
      },
      "year": "2012",
      "month": "01",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "df92511c178d47995b0e376c5c57bc0b",
      "md5_json": "cf4864da85f8768a5e8a45de46b05b49",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_02.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_02.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_02.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_02.xlsx"
      },
      "year": "2012",
      "month": "02",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "7fab2a98aeba6bb040c57431dba69ce2",
      "md5_json": "e50b79549fd1a8f92f93f99b504a09b6",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_03.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_03.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_03.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_03.xlsx"
      },
      "year": "2012",
      "month": "03",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "f30d5b3f38ce65087b349b3a54a421d0",
      "md5_json": "bbdb3c93aabbb6d4bdadfbbafa4da652",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_04.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_04.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_04.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_04.xlsx"
      },
      "year": "2012",
      "month": "04",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "910c61bdc2d6f84b44bf7b0d36a27eba",
      "md5_json": "305586e43c9942fcb9157a762c8241c3",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_05.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_05.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_05.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_05.xlsx"
      },
      "year": "2012",
      "month": "05",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "ffcab521b8689350d8ca1c586649ccf1",
      "md5_json": "46941e30635a8fc8f33dd160de5c16e5",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_06.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_06.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_06.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_06.xlsx"
      },
      "year": "2012",
      "month": "06",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "5d9768d9730875407fa2bbf0adb53471",
      "md5_json": "3cce1110f10d511a31d64c1f58a17164",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_07.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_07.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_07.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_07.xlsx"
      },
      "year": "2012",
      "month": "07",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "2e81ae70a3b4e4cf9c753bb1c059d74b",
      "md5_json": "72d16c8a542748cd1cf8b43da032065a",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_08.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_08.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_08.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_08.xlsx"
      },
      "year": "2012",
      "month": "08",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "2ec8d44b233c7afedec1bf32fd2ae7f2",
      "md5_json": "ce795ed62ff57fed19cc520d825a2213",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_09.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_09.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_09.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_09.xlsx"
      },
      "year": "2012",
      "month": "09",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "ea1d28bf9f9bb7d3e9f48b0dc67edf7e",
      "md5_json": "b5ae6fe48ed0741936a46da11a78a2be",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_10.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_10.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_10.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_10.xlsx"
      },
      "year": "2012",
      "month": "10",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "896c149a3116d023fd7eb21720d0398a",
      "md5_json": "f65ff245aff3261a1242bc247b0fa405",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_11.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_11.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_11.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_11.xlsx"
      },
      "year": "2012",
      "month": "11",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "e98558c6c253a997e719e610fcb5c541",
      "md5_json": "b820d09c79120de1efd3d14791339b79",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_12.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_12.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_12.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2012_12.xlsx"
      },
      "year": "2012",
      "month": "12",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "75bade3ce47308f8a1be61104223edff",
      "md5_json": "6df277c7f924af3c3ce13b21cb3a988e",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_01.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_01.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_01.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_01.xlsx"
      },
      "year": "2013",
      "month": "01",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "210fbee86a347e79c00ad5ae58613957",
      "md5_json": "3ee84e4ddde3465904fd1a992cd6603b",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_02.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_02.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_02.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_02.xlsx"
      },
      "year": "2013",
      "month": "02",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "3c6095fd2a296c381d0f0decf12b7e4a",
      "md5_json": "28633f2ef991a02a089ad476558cc290",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_03.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_03.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_03.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_03.xlsx"
      },
      "year": "2013",
      "month": "03",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "4447ce941a90eb50f2b2ab812b04ba4f",
      "md5_json": "a424322d1107bc3cb3aad44f2271926e",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_04.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_04.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_04.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_04.xlsx"
      },
      "year": "2013",
      "month": "04",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "bf7184ddc028eda55e3b65814970c074",
      "md5_json": "1ae3e7db09c9dd3b287939f97bef6f24",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_05.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_05.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_05.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_05.xlsx"
      },
      "year": "2013",
      "month": "05",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "1cef6b034c607cb4ec72258fea043871",
      "md5_json": "d06a09e0bfb353ae071cbf31c270b1b1",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_06.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_06.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_06.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_06.xlsx"
      },
      "year": "2013",
      "month": "06",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "8074a8f27111cbc5ed5e59eaa3b15fc5",
      "md5_json": "9061e3249a307ae794657536566b1ab1",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_07.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_07.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_07.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_07.xlsx"
      },
      "year": "2013",
      "month": "07",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "f0731442bf73059881663edba1a93a07",
      "md5_json": "9be069df96f2e8b96d728cd297065b51",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_08.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_08.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_08.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_08.xlsx"
      },
      "year": "2013",
      "month": "08",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "d58ce23bbf3debc6b2ae6d28a0d19b9b",
      "md5_json": "a05cb156f698b26ec5a3c65d9fde048b",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_09.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_09.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_09.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_09.xlsx"
      },
      "year": "2013",
      "month": "09",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "d3ca6f846adb2096a1015052fe102402",
      "md5_json": "efe8aa2d6a315a9cbc9bffe5db16fea9",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_10.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_10.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_10.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_10.xlsx"
      },
      "year": "2013",
      "month": "10",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "4aa38dd66560a5822547f845fc6ff1b6",
      "md5_json": "9039fc9f432f04f235af5ab8f6fccdd8",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_11.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_11.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_11.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_11.xlsx"
      },
      "year": "2013",
      "month": "11",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "0f8098e5bf93a43a28d5b40f06c2c362",
      "md5_json": "b232a68287bb69aa9836d0f794ec6797",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_12.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_12.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_12.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2013_12.xlsx"
      },
      "year": "2013",
      "month": "12",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "3f18a530dcb7b9e7c79bdb2e04116837",
      "md5_json": "b44a931e740f01a0fd03d9bae9473665",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2014_01.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2014_01.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2014_01.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2014_01.xlsx"
      },
      "year": "2014",
      "month": "01",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "aa2aaeb8843d729a9ab32573878efbbf",
      "md5_json": "937df9cf564015e857f3255223ac1b6b",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2014_02.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2014_02.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2014_02.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2014_02.xlsx"
      },
      "year": "2014",
      "month": "02",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "355196186866d291b8db9bad73b276ba",
      "md5_json": "25c1188e4d076b6366033a397d004e9a",
      "publicador": "Secretaria de Finanzas de Honduras"
  },
  {
      "urls": {
          "csv": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2014_03.zip",
          "md5": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2014_03.md5",
          "json": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2014_03.json",
          "xlsx": "http://www.contratacionesabiertas.gob.hn/api/v1/descargas/secretaria_de_fin_HN.SIAFI2_2014_03.xlsx"
      },
      "year": "2014",
      "month": "03",
      "sistema": "Sistema de Informacion Financiero Integrado v2.0",
      "finalizo": true,
      "md5_hash": "d2c652ef52704c17beaffa3cf9c75abb",
      "md5_json": "5c5190fce293800fec640a8e61c71192",
      "publicador": "Secretaria de Finanzas de Honduras"
  }];
var camposTabla=[
  {
    id:'publicador',
    etiqueta:'Publicador',
    tipo:'texto'
  },{
    id:'fuente',
    etiqueta:'Fuente',
    tipo:'texto'
  },{
    id:'fecha',
    etiqueta:'Año',
    tipo:'texto',
    clase:'textoAlineadoCentrado'

  },
  {
    id:'mes',
    etiqueta:'Mes',
    tipo:'texto',
    clase:'textoAlineadoCentrado'

  }, {
  id:'urls',
  etiqueta:'',
  tipo:'descarga',
  formato:function(descarga){
    return $('<div>',{class:'contenedorClasesArchivos'}).append(
        descarga.json?$('<a>',{href:descarga.json,target:'_blank'}).append(

          $('<div>',{class:'textoColorSecundario textoAlineadoDerecha p-1 cursorMano transparencia enlaceArchivoDescarga transicion titularColor ',style:'display:inline-block;font-size:14px'}).append(
            $('<i>',{class:'fas fa-file-download'}),
            ' .JSON'
          )
        ):null,
        descarga.csv?$('<a>',{href:descarga.csv,target:'_blank'}).append(
          $('<div>',{class:'textoColorSecundario textoAlineadoDerecha p-1 cursorMano transparencia enlaceArchivoDescarga transicion titularColor',style:'display:inline-block;font-size:14px'}).append(
            $('<i>',{class:'fas fa-file-download'}),
            ' .CSV'
          )
        ):null,
        $('<br>'),

        descarga.xlsx?$('<a>',{href:descarga.xlsx,target:'_blank'}).append(
          $('<div>',{class:'textoColorSecundario textoAlineadoDerecha p-1 cursorMano transparencia enlaceArchivoDescarga transicion titularColor',style:'display:inline-block;font-size:14px'}).append(
            $('<i>',{class:'fas fa-file-download'}),
            ' .XLSX'
          )
        ):null,
        descarga.md5?$('<a>',{href:descarga.md5,target:'_blank'}).append(
          $('<div>',{class:'textoColorSecundario textoAlineadoDerecha p-1 cursorMano transparencia enlaceArchivoDescarga transicion titularColor',style:'display:inline-block;font-size:14px'}).append(
            $('<i>',{class:'fas fa-file-download'}),
            ' .MD5'
          )
        ):null
      );
  }
  }
];
function InicializarTabla(selector,titulo){
$(selector).append(
  $('<div>',{class:'cajonSombreado'}).append(
    $('<div>',{class:'row'}).append(
      $('<div>',{class:'col-md-12 mt-1'}).append(
        
        )
    ),
    $('<div>',{class:'row mt-1 mb-3'}).append(
      $('<div>',{class:'col-lg-6'}).append(
        $('<h1>',{class:'textoColorPrimario mt-3 tituloDetalleProceso'}).text(titulo)
       /* $('<div>',{class:'campoAzulBusquedaPadre normal',style:'margin-left:0'}).append(
          $('<input>',{class:'form-control form-control-lg campoAzulBusqueda',type:''})
        )*/
      ),
      $('<div>',{class:'col-lg-6 textoAlineadoDerecha'}).append(
        $('<h5>',{class:'tituloTablaGeneral textoColorTitulo mt-3 mb-0 enLinea'}).html('Mostrar&nbsp;'),
        $('<select>',{class:'campoSeleccion ancho70 mt-3 enLinea cantidadResultados',on:{change:function(e){
          AgregarResultados(1);
        }}}).append(
          $('<option>',{value:5,text:'5'}),
          $('<option>',{value:10,text:'10'}),
          $('<option>',{value:20,text:'20'}),
          $('<option>',{value:50,text:'50'}),
          $('<option>',{value:100,text:'100'})
        ),
        $('<h5>',{class:'tituloTablaGeneral textoColorTitulo mt-3 mb-0 enLinea'}).html('&nbsp;Resultados')
        )
    ),
    $('<table>',{class:'tablaGeneral mostrarEncabezados'}).append(
      $('<thead>',{}).append(
        $('<tr>').append(
          ObtenerEncabezados(camposTabla)
        )
      ),
      $('<tbody>',{ class:'resultadosTabla'}).append(
        $('<tr>').append(
          $('<td>',{style:'height:300px;position:relative',colspan:ObtenerEncabezados(camposTabla).length,class:'contenedorCargando'})
        )
      )

),
    $('<div>',{class:'row'}).append(
      $('<div>',{class:'col-md-12 textoAlineadoCentrado'}).append(
        $('<h5>',{class:'tituloTablaGeneral textoColorPrimario mt-3 mb-0 mostrandoTablaGeneral'})
      ),
      $('<div>',{class:'col-md-12 textoAlineadoCentrado'}).append(
        $('<nav>',{class:'navegacionTablaGeneral'})
        )
    )
  )
);
}


function ObtenerEncabezados(campos){
  var elementos=[];
  campos.forEach(function(campo){
      elementos.push( ObtenerCampo(campo));
        });
      return elementos;
        
}
function ObtenerCampo(campo){
  switch(campo.tipo){
    case 'descarga':
        return (
          $('<th>',{class:'textoAlineadoCentrado campoFiltrado'}).append(
            $('<table>',{class:'alineado'}).append(
              $('<tbody>').append(
                $('<tr>').append(
                  $('<td>').append(
                    $('<span>').append(
                      $('<span>',{text:campo.etiqueta})
                    )
                  )
                )
              )
              
            )
          )
        );
      break;
    default:
        return (
          $('<th>',{class:'textoAlineadoCentrado campoFiltrado'}).append(
            $('<table>',{class:'alineado'}).append(
              $('<tbody>').append(
                $('<tr>').append(
                  $('<td>').append(
                    $('<span>').append(
                      $('<span>',{text:campo.etiqueta})
                    )
                  )
                )
              )
             
            ),
            $('<input>',{class:'campoBlancoTextoSeleccion', placeholder:campo.etiqueta,identificador:campo.id, type:'text',on:{
              change:function(e){
                AgregarResultados(1);
              }
            }
            })
          )
        );
        break;
      }
}
    
 
/*
  <th class="textoAlineadoCentrado campoFiltrado" filtro="identificacion" tipo="texto">
                           <table class="alineado">
                                 <tr><td><span toolTexto="contracts[n].suppliers[n].id">Identificador</span></td>
                                 
                                 <td><span class="ordenEncabezado" opcion="{{ordenidentificacion}}">
                                       <div class="contenedorFlechasOrden">
                                             <i class="fas fa-sort-up flechaArriba" {% if ordenidentificacion == 'descendente' %}style="display:none"{% endif %}></i>
                                             <i class="fas fa-sort-down flechaAbajo" {% if ordenidentificacion == 'ascendente' %}style="display:none"{% endif %}></i>
                                       </div>
                                    </span></td></tr>
                              </table>
      
                           
                           
                              <input   class="campoBlancoTextoSeleccion" placeholder="Identificador" type="text" value="{% if identificacion %}{{identificacion}}{% endif %}">
                        </th>*/



function ObtenerDescargas(selector){
  DebugFecha();
  MostrarEspera(selector+' .contenedorCargando');

  
  
  $.get(/*url+"/static/js/descargas.json"*/ api+"/v1/descargas/"/*'http://www.contratacionesabiertas.gob.hn/api/v1/descargas/'*/,function(datos){

      //var datos=descargasGenerales.concat([]);
      descargasGenerales=[];
      DebugFecha();
      console.dir(datos)
      OcultarEspera(selector+' .contenedorCargando');
      if(datos&&!$.isEmptyObject(datos)){
        $.each(datos,function(indice,valor){
          if(valor&&!$.isEmptyObject(valor.urls)){
            descargasGenerales.push(
              { 
                "fuente":valor.sistema,
                "fecha":valor.year,
                urls:{
                  "json":valor.urls.json,
                  "md5":valor.urls.md5,
                  "csv":valor.urls.csv,
                  "xlsx":valor.urls.xlsx,
                },
               
                "mes":ObtenerMesNombre(valor.month),
                "publicador":valor.publicador
             }
            );
            
          }
        })
      };
      descargasGenerales=descargasGenerales.sort(function(a, b){return ((a.fecha > b.fecha) ? 1 : -1)});
      AgregarResultados(1);
      
      
  }).fail(function() {
  console.dir('error get');
  
});
}
function ObtenerResultadosFiltrados(){
  var comparar=[];
  $('#'+selector+' .campoFiltrado input.campoBlancoTextoSeleccion').each(function(i,campo){
    if(ValidarCadena($(campo).val())){
      comparar.push(
        $(campo).attr('identificador')
      );
    }
  });
  return descargasGenerales.filter(function(elemento){
    if(comparar.length==0){
      return true;
    }
    for(let i=0;i<comparar.length;i++){
      var termino=$('#'+selector+' .campoFiltrado input.campoBlancoTextoSeleccion[identificador="'+comparar[i]+'"]').val().trim();
      if(!ContenerCadena(elemento[comparar[i]],termino)){
        return false;
      }
    }
    return true;
    
    /*if(ValidarCadena(termino)){
      return (ContenerCadena(elemento.fuente,termino)||ContenerCadena(elemento.fecha,termino)||ContenerCadena(elemento.publicador,termino)||ContenerCadena(ObtenerMesNombre(elemento.mes),termino));

    }else{
      return true;
    }*/
  });
}

function ObtenerResultadosPagina(){
  return ObtenerNumero($('#'+selector+' .cantidadResultados').val())?ObtenerNumero($('#'+selector+' .cantidadResultados').val()):5;
}
function AgregarResultados(pagina){
  var filtrados=ObtenerResultadosFiltrados();
  $('#'+selector +' .resultadosTabla').html('');
  console.dir(filtrados)
  $.each(filtrados,function(i,descarga){
    if(!(i<=((ObtenerResultadosPagina()*pagina)-1)&&i>=((ObtenerResultadosPagina()*pagina)-ObtenerResultadosPagina()))){
      return;
    }
    $('#'+selector+' .resultadosTabla').append(
      $('<tr>').append(
        ObtenerFila(descarga)
      )
      /*$('<div>',{class:'cajonDescarga posicionRelativa textoColorBlanco fondoColorClaro transicion'}).append(
        $('<div>',{class:'contenedorFechaDescarga fondoColorSecundario'}).append(
         
          $('<span>',{class:'fechaAnoDescarga textoColorBlanco',text:descarga.fecha}),
          $('<span>',{class:'fechaMesDescarga textoColorBlanco',html: ObtenerMesNombre(descarga.mes)})
        ),
        $('<div>',{class:'contenedorPropiedadesDescarga'}).append(
          $('<div>',{class:'row'}).append(
            $('<div>',{class:'col-12 col-sm-6 col-md-6 col-lg-6'}).append(
              $('<span>',{class:'tituloDescarga textoColorSecundario',text:descarga.fuente}),
              $('<span>',{class:'descripcionDescarga textoColorSecundario',text:descarga.publicador})
            ),
            $('<div>',{class:'col-12 col-sm-6 col-md-6 col-lg-6'}).append(
              $('<div>',{class:'contenedorClasesArchivos'}).append(
                descarga.json?$('<a>',{href:descarga.json,target:'_blank'}).append(
                  $('<span>',{class:'textoColorSecundario textoAlineadoDerecha p-1 cursorMano transparencia enlaceArchivoDescarga transicion titularColor'}).append(
                    $('<i>',{class:'fas fa-file-download'}),
                    ' .JSON'
                  )
                ):null,
                descarga.csv?$('<a>',{href:descarga.csv,target:'_blank'}).append(
                  $('<span>',{class:'textoColorSecundario textoAlineadoDerecha p-1 cursorMano transparencia enlaceArchivoDescarga transicion titularColor'}).append(
                    $('<i>',{class:'fas fa-file-download'}),
                    ' .CSV'
                  )
                ):null,
                descarga.xlsx?$('<a>',{href:descarga.xlsx,target:'_blank'}).append(
                  $('<span>',{class:'textoColorSecundario textoAlineadoDerecha p-1 cursorMano transparencia enlaceArchivoDescarga transicion titularColor'}).append(
                    $('<i>',{class:'fas fa-file-download'}),
                    ' .XLSX'
                  )
                ):null,
                descarga.md5?$('<a>',{href:descarga.md5,target:'_blank'}).append(
                  $('<span>',{class:'textoColorSecundario textoAlineadoDerecha p-1 cursorMano transparencia enlaceArchivoDescarga transicion titularColor'}).append(
                    $('<i>',{class:'fas fa-file-download'}),
                    ' .MD5'
                  )
                ):null
              )
            )
          )
        )
      )*/
    );
  });
  if(filtrados.length==0){
    $('#'+selector+' .resultadosTabla').append(
      $('<tr>',{style:''}).append(
        $('<td>',{'data-label':'','colspan':5}).append(
          $('<h4>',{class:'titularColor textoColorPrimario mt-3 mb-3'}).text('No se Encontraron Pagos')
        ))
    );
  }

  MostrarPaginacion(pagina);

}
function ObtenerFila(dato){
  var elementos=[];

  camposTabla.forEach(
    function(campo){
      elementos.push(
        $('<td>', { 'data-label': campo.etiqueta, class: campo.clase?campo.clase:'' }).html(
            campo.formato?campo.formato(dato[campo.id]):dato[campo.id]
          )
      );
    }
  );  
  
  return elementos;
}


function MostrarPaginacion(pagina){
  $('#'+selector+' .mostrandoTablaGeneral').html(
    'Mostrando '+(ObtenerResultadosPagina()*pagina-ObtenerResultadosPagina()+1)+' a '+(Math.ceil(ObtenerResultadosFiltrados().length/ObtenerResultadosPagina())==pagina?ObtenerResultadosFiltrados().length:ObtenerResultadosPagina()*pagina)+' de '+ObtenerResultadosFiltrados().length+' Descargas'
  )
  var paginacion=ObtenerPaginacion(pagina, Math.ceil(ObtenerResultadosFiltrados().length/ObtenerResultadosPagina()))  ;
  $('#'+selector+' .navegacionTablaGeneral').html('');
  if(pagina>1){
    $('#'+selector+' .navegacionTablaGeneral').append(
      $('<a href="javascript:AgregarResultados('+(pagina-1)+')" class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-left"></i></span></a>')
    );
  }
  
  for(var i=0; i<paginacion.length;i++){
    if(paginacion[i]=='...'){
      $('#'+selector+'.navegacionTablaGeneral').append(
        $('<a href="javascript:void(0)" class="numerosNavegacionTablaGeneral numeroNormalNavegacionTablaGeneral">').append($('<span>').text(paginacion[i]))
      );
    }else{
      $('#'+selector+' .navegacionTablaGeneral').append(
        $('<a href="javascript:AgregarResultados('+paginacion[i]+')" class="numerosNavegacionTablaGeneral '+((paginacion[i]==pagina)?'current':'')+'">').append($('<span>').text(paginacion[i]))
      );
    }
  }
  if(pagina<=(/*(ObtenerResultadosPagina()*pagina)*/Math.ceil(ObtenerResultadosFiltrados().length/ObtenerResultadosPagina())-1)){
    $('#'+selector+' .navegacionTablaGeneral').append(
      $('<a href="javascript:AgregarResultados('+(pagina+1)+')" class="numerosNavegacionTablaGeneral"><span><i class="fa fa-angle-right"></i></span></a>')
    );
  }
  
}