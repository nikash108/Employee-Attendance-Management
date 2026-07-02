document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('attendanceForm');
  const tableBody = document.getElementById('attendanceTableBody');

  if (!form || !tableBody) return;

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 75) return 'Good';
    if (percentage >= 50) return 'Average';
    return 'Poor';
  };

  const formatPercentage = (percentage) => {
    if (Number.isInteger(percentage)) {
      return `${percentage}%`;
    }
    return `${percentage.toFixed(2)}%`;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const employeeId = document.getElementById('employeeId').value.trim();
    const employeeName = document.getElementById('employeeName').value.trim();
    const department = document.getElementById('department').value;
    const workingDaysValue = document.getElementById('workingDays').value.trim();
    const presentDaysValue = document.getElementById('presentDays').value.trim();
    const leaveDaysValue = document.getElementById('leaveDays').value.trim();

    if (!employeeId || !employeeName || !department || !workingDaysValue || !presentDaysValue || !leaveDaysValue) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    const workingDays = Number(workingDaysValue);
    const presentDays = Number(presentDaysValue);
    const leaveDays = Number(leaveDaysValue);

    if (!Number.isInteger(workingDays) || workingDays <= 0) {
      alert('Working days must be a positive whole number.');
      return;
    }

    if (!Number.isInteger(presentDays) || presentDays < 0) {
      alert('Present days must be a non-negative whole number.');
      return;
    }

    if (!Number.isInteger(leaveDays) || leaveDays < 0) {
      alert('Leave days must be a non-negative whole number.');
      return;
    }

    if (presentDays > workingDays) {
      alert('Present days cannot exceed working days.');
      return;
    }

    if (leaveDays > workingDays) {
      alert('Leave days cannot exceed working days.');
      return;
    }

    if (presentDays + leaveDays > workingDays) {
      alert('Present days and leave days together cannot exceed working days.');
      return;
    }

    const attendancePercentage = (presentDays / workingDays) * 100;
    const status = getAttendanceStatus(attendancePercentage);

    const row = document.createElement('tr');
    const values = [
      employeeId,
      employeeName,
      department,
      workingDays,
      presentDays,
      leaveDays,
      formatPercentage(attendancePercentage),
      `<span class="status-badge ${status.toLowerCase()}">${status}</span>`
    ];

    values.forEach((value) => {
      const cell = document.createElement('td');
      cell.innerHTML = value;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
    form.reset();
  });
});
