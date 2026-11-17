
var aviso = document.getElementById('aviso-copia');

document.querySelectorAll('.copy').forEach(function (btn) {
  var timer;

  var marcar = function (ok) {
    clearTimeout(timer);
    btn.classList.toggle('done', ok);
    btn.classList.toggle('fail', !ok);

    if (ok) {
      aviso.textContent = 'Copiado: ' + btn.getAttribute('data-copy');
    } else {
      var seleccion = window.getSelection();
      var rango = document.createRange();
      rango.selectNodeContents(btn.previousElementSibling);
      seleccion.removeAllRanges();
      seleccion.addRange(rango);
      aviso.textContent = 'No se pudo copiar. Ya quedó seleccionado, cópialo a mano.';
    }

    var mensaje = aviso.textContent;
    timer = setTimeout(function () {
      btn.classList.remove('done', 'fail');
      // Solo borra el aviso si no lo cambió otro botón mientras tanto.
      if (aviso.textContent === mensaje) aviso.textContent = '';
    }, ok ? 2000 : 5000);
  };

  btn.addEventListener('click', function () {
    if (!navigator.clipboard) {
      marcar(false);
      return;
    }
    navigator.clipboard.writeText(btn.getAttribute('data-copy'))
      .then(function () { marcar(true); })
      .catch(function () { marcar(false); });
  });
});
