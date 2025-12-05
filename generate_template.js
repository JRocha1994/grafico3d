import * as XLSX from 'xlsx';

const data = [
    { Projeto: "Desenvolvimento Frontend", Horas: 40, Link: "https://github.com/project/frontend" },
    { Projeto: "API Backend", Horas: 25, Link: "https://github.com/project/backend" },
    { Projeto: "Reuniões", Horas: 10, Link: "https://meet.google.com" },
    { Projeto: "Code Review", Horas: 15, Link: "https://github.com/pulls" },
    { Projeto: "Estudos", Horas: 5, Link: "https://docs.react.dev" }
];

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(data);

// Adjust column widths for better readability
const wscols = [
    { wch: 25 }, // Projeto
    { wch: 10 }, // Horas
    { wch: 35 }  // Link
];
ws['!cols'] = wscols;

XLSX.utils.book_append_sheet(wb, ws, "Timesheet");
XLSX.writeFile(wb, "template.xlsx");
console.log("Template created: template.xlsx");
