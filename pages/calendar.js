//- Script que gera a visualização do calendário do sistema;

//- Todas as paginas principais utilizam.

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'pt-br'
    });
    calendar.render();
  });