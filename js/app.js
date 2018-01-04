angular.module('app', ['ngStorage'])
    .filter('khw', function() {
        return function(x) {
            if(x == undefined){return "";}
            return x + ' Kwh';
        }
    })
  .controller('landing', function($scope, $interval, $localStorage) {
    $scope.actividades = [];
    $scope.categorias = ['Soporte Institucionales', 'Soporte Factorum'];
    $scope.form = {};
      $scope.form.time = '0';
    $scope.inCount = {actividad:"",time:0};
    $scope.indi = -1;
    $scope.archivadas = "false";
    $scope.report = true;
    console.log($localStorage.datos);
    if($localStorage.datos == undefined){
      $localStorage.datos = [];
    }
    $scope.actividades = $localStorage.datos;

    $scope.eliminarsession = function(){
      $scope.actividades = [];
      $scope.getTotalTime();
    }
      
      $scope.getdaynow = function () {
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear();

          if(dd<10) {
              dd='0'+dd
          }

          if(mm<10) {
              mm='0'+mm
          }
          return yyyy+'-'+mm+'-'+dd;

      }
    var a = 0;
    $scope.empezar = function(){
      $scope.form.archivar = "false";
      $scope.form.time = parseInt($scope.form.time*60);
        $scope.form.fecha = $scope.getdaynow();
      console.log($scope.form);
      $scope.actividades.push($scope.form);
      console.log("Actividades");
      console.log($scope.actividades);
      $scope.startCount($scope.actividades[$scope.actividades.length - 1]);
        $scope.form = {};
        $scope.form.time = 0;
    }

    $scope.cambiararchi = function(){
      console.log("archivando");
      console.log($scope.archivadas);
      if($scope.archivadas == "true"){
        $scope.archivadas = "false";
      }else{
        $scope.archivadas = "true";
      }    
    }

    $scope.cambiar = function(valor){
      console.log("archivando");
      console.log(valor.archivar);
      if(valor.archivar == "true"){
        valor = "false";
      }else{
        valor.archivar = "true";
      }    
      console.log(valor.archivar);  
    }

    $scope.startCount = function(actividad){
      $scope.inCount = actividad;      
    }
    $scope.detener = function(){
      $scope.inCount = {actividad:"",time:0};
    }
    $scope.createcopy = function(actividad){
      console.log(actividad);
      $scope.form = angular.copy(actividad);
      $scope.form.time= 0;
      $scope.form.archivar = 'false';
      $scope.actividades.push($scope.form);
      $scope.archivadas = 'false';
    }
    $scope.deleted = function(actividad){
      console.log(actividad);
        $scope.actividades.splice(actividad,1);
    }

    $scope.editar = function(actividad, index){
      $scope.indi = index;
      $scope.form = angular.copy(actividad);
        $scope.form.time = $scope.form.time / 60;
            console.log($scope.indi)
    }
    $scope.update = function(){
      console.log("actualizando");
      console.log($scope.form);
      console.log($scope.indi);
      console.log($scope.timesheet);
      console.log($scope.timesheet.length);
      for(var x = 0; x < $scope.timesheet.length; x++){
        console.log(x);
        console.log($scope.indi);
        if(x == $scope.indi){
          console.log("timesheet")
          console.log($scope.form);
          console.log("cambiar por")
          console.log($scope.timesheet[x]);
          $scope.timesheet[x].actividad = $scope.form.actividad;
          $scope.timesheet[x].categoria = $scope.form.categoria;
          $scope.timesheet[x].time = $scope.form.time*60;
          $scope.startCount($scope.timesheet[x]);
          $scope.indi = -1;
        }
      }
      $scope.form = {};
      console.log("----------------------");
    }
    $scope.getTotalTime = function(){
      if($scope.actividades != undefined){
        var a = 0;
        var b = 0;
      for(var x = 0; x < $scope.actividades.length; x++){
        a += $scope.actividades[x].time;
        if($scope.actividades[x].archivar == 'false'){
          b += $scope.actividades[x].time;
        }
      }
      $scope.totaltime = a; 
      $scope.totaltimebyday = b; 
      }
      
    }
    
    $interval(function () {
      $scope.getTotalTime();
      $localStorage.datos = $scope.actividades;
      if($scope.inCount.actividad != ""){
        $scope.inCount.time = parseInt($scope.inCount.time);
        $scope.inCount.time += 1;
        a += 1;
        $scope.getTotalTime();
      }
        
    }, 1 * 1000);


  }).controller('wesolar', function($scope, $interval, $localStorage) {
    $scope.consumo_kwh= 1800;
    $scope.consumo_kwh_minimo= "800";
    $scope.capacidad_panel = "75.88";
    $scope.precio_panel = "540";
    $scope.tipo_cambio = 19.50;
    $scope.monitoreo = "313";
    $scope.descuento = 6;
    $scope.resultado = {};
    $scope.tarifas = [{"tarifa":"1C","costo_min":"650"},{"tarifa":"1D","costo_min":"800"}];

    $scope.calcular_tarifa = function(){
        var consumo = 0;
        console.log("calculando consumo kwh")
        for (var i = 1; i < 9000; i++) {
            if(i <= 150){
                consumo = consumo + 0.793 ;
            }
            if(i <= 400 && i > 150){
                consumo = consumo + 0.956;
            }
            if(i> 400){
                consumo = consumo + 2.802;
            }
            console.log(consumo + " - " + i + " - " + (i * 0.793));

            if(consumo >= $scope.consumo_pesos){
                $scope.consumo_kwh = i - 1;
                console.log("final");
                break;
            }
        }
    }
    
    $scope.calcular_consumo = function(){
        console.log("calculando");
        var consumo = angular.copy($scope.consumo_kwh);
        var consumo_total = consumo - $scope.consumo_kwh_minimo;
        console.log(consumo_total)
        var paneles = Math.round(consumo_total / $scope.capacidad_panel);
        console.log(paneles)
        $scope.calcular(angular.copy($scope.consumo_kwh),paneles);
        console.log($scope.resultado)
    };
    $scope.recalcular = function(){
        console.log("Recalculando")
        $scope.calcular(angular.copy($scope.consumo_kwh),$scope.resultado.paneles);
    }
    $scope.calcular = function(consumo, paneles){
        //if(paneles < 4){paneles = 4;}
        var produccion_paneles = Math.round($scope.capacidad_panel * paneles);
        console.log(produccion_paneles)
        var nuevo_consumo = consumo - produccion_paneles;
        console.log(nuevo_consumo)
        var costo_paneles = paneles * $scope.precio_panel;
        console.log(costo_paneles)
        var monto_total = (parseInt(costo_paneles) + parseInt($scope.monitoreo) );
        console.log(monto_total)
        var monto_total_inversion = monto_total * $scope.tipo_cambio;
        console.log(monto_total_inversion)
        var monto_iva = monto_total_inversion * 0.16;
        console.log(monto_iva)
        var monto_descuento = (monto_total_inversion + monto_iva) * ($scope.descuento/100);
        console.log(monto_descuento)
        var monto_final = (monto_total_inversion + monto_iva) - monto_descuento;
        console.log(monto_final)

        $scope.resultado = {
            'consumo':consumo,
            //'consumo_total':consumo_total,
            'paneles':paneles,
            'costo_paneles':costo_paneles,
            'monto_total':monto_total,
            'produccion_paneles':produccion_paneles,
            'nuevo_consumo':nuevo_consumo,
            'monto_total_inversion':monto_total_inversion,
            'monto_descuento': monto_descuento,
            'monto_final': monto_final,
            'monto_iva': monto_iva
        };
    }
});