document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('units-container') || document.body;

  // Fetch the data from JSON
  fetch('data/units.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      renderDashboard(data.units, container);
    })
    .catch(error => {
      console.error('Error loading syllabus data:', error);
      container.innerHTML = `<div class="p-4 text-red-500 font-semibold">Failed to load syllabus content. Please check if data/units.json exists.</div>`;
    });
});

function renderDashboard(units, container) {
  let html = `<div class="max-w-4xl mx-auto p-4 space-y-6">`;

  units.forEach(unit => {
    html += `
      <section class="bg-white rounded-xl shadow-md p-6 border border-slate-100">
        <div class="border-b pb-3 mb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Unit ${unit.unit_id}</span>
          <h2 class="text-2xl font-bold text-slate-800">${unit.unit_title}</h2>
        </div>
        
        <div class="space-y-4">
    `;

    unit.lessons.forEach(lesson => {
      html += `
        <div class="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-indigo-900">${lesson.id} ${lesson.title}</h3>
            <span class="text-xs px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-full font-medium">${lesson.genre}</span>
          </div>
          <p class="text-xs text-slate-500 font-medium mb-2">By ${lesson.author}</p>
          <p class="text-sm text-slate-600 mb-3">${lesson.summary}</p>
          
          <div class="flex flex-wrap gap-2 pt-2 border-t border-slate-200 text-xs">
            <span class="font-semibold text-slate-700">Discourses:</span>
            ${lesson.key_discourses.map(d => `<span class="bg-slate-200 text-slate-700 px-2 py-0.5 rounded">${d}</span>`).join('')}
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </section>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}
