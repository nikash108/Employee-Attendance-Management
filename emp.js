document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('attendanceForm');
  const tableBody = document.getElementById('attendanceTableBody');

  if (!form || !tableBody) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const employeeId = document.getElementById('employeeId').value.trim();
    const employeeName = document.getElementById('employeeName').value.trim();
    const department = document.getElementById('department').value;
    const workingDays = document.getElementById('workingDays').value.trim();
    const presentDays = document.getElementById('presentDays').value.trim();
    const leaveDays = document.getElementById('leaveDays').value.trim();

    if (!employeeId || !employeeName || !department || !workingDays || !presentDays || !leaveDays) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    const row = document.createElement('tr');
    [employeeId, employeeName, department, workingDays, presentDays, leaveDays].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
    form.reset();
  });
});
