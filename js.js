"use strict"
class Calculadora{
	//let total = 0;
	constructor(){
		//$(".ConteOpereciones").append(template());
	}

	template(){
		const tpl =
		`
		<div class="mdl-grid operacion">
			<div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone">
				<input type="number" placeholder="Cantidad" class="mdl-textfield__input">
			</div>
			<div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone del">
				<input type="text" placeholder="Descripcion" class="mdl-textfield__input">
			</div>
			<div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone">
				<input type="number" placeholder="Precio" class="mdl-textfield__input">
			</div>
			<div class="mdl-cell mdl-cell--3-col mdl-cell--1-col-phone">
				<input type="text" placeholder="Total" class="mdl-textfield__input total" disabled="disabled">
			</div>
		</div>
		`;
		return tpl;
	}

	multiplica(a=1,b=1){
		return a*b;
	}

	diferencia(a,b,c){
		var operacion = `${a.val()}-${b.val()}`;
		c.val(eval(operacion));
	}
}
var Calcu = new Calculadora();
$(".ConteOpereciones").append(Calcu.template);
$(".ConteOpereciones").on("dblclick",".operacion input[disabled='disabled']",function(event) {
	$(".ConteOpereciones").append(Calcu.template);
});

$(".ConteOpereciones").on('click', '.operacion input[type="number"]', function(event) {
	//event.preventDefault();
	//alert($(this).parent(".mdl-grid operacion").tagName);
	$(this).keyup(function(event) {
		$(this).parents().map(function(index, elem) {
			if (this.className == "mdl-grid operacion") {
				//alert($(this).find('input[type="number"]nth-child(0)').val() + "--" + $(this).find('input[type="number"]:nth-child(1)').val());
				//alert($(this).find('input[type="number"]').length);
				var cantidad,precio;
				$(this).find('input').each(function(index, el) {
					if (index == 0) {cantidad = el.value;}
					if (index == 2) {precio = el.value;}
					if (index == 3) {el.value = Calcu.multiplica(cantidad,precio);}
					//alert(index+" - "+el.value);
				});
				//alert((JSON.stringify($(this).find('input:nth-child(0)'))));
				var sumando = 0;
				$(".total").each(function(index, el) {
					//alert(index);
					sumando = sumando + parseFloat(el.value);
				});
				//total = sumando;
				$("#total").val(sumando);
						//return false;
					}
				});
		//alert($(this).val());
		if ( $("#Recivido").val() != "" ) {
			Calcu.diferencia( $("#total") , $("#Recivido") , $("#Diferencia") );
		}
	});
});

$(".ConteOpereciones").on("dblclick",".operacion .del",function(event) {
	//Remover la fila
	$(this).parents().map(function(index, elem) {
		if (this.className == "mdl-grid operacion") {
			$(this).remove();
			var total = 0;
			$('.total').each(function(index, el) {
				total = total + parseFloat(el.value);
			});
			$("#total").val(total);
		}
		/*const clase = this.className;
        return false;*/
	});
	if ( $("#Recivido").val() != "" ) {
		Calcu.diferencia( $("#total") , $("#Recivido") , $("#Diferencia") );
	}
});

$("#Recivido").keyup(function(event) {
	Calcu.diferencia( $("#total") , $("#Recivido") , $("#Diferencia") );
});


