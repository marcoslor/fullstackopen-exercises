const formModelNameMapping :
  Record<string, { label: string; name: string }>
 = {
    'healthCheckRating': {
      label: 'Health Rating',
      name: 'health-check-rating',
    },
    'dischargeDate': {
      label: 'Discharge Date',
      name: 'hospital-discharge-date',
    },
    'dischargeCriteria': {
      label: 'Discharge Criteria',
      name: 'hospital-discharge-criteria',
    },
    'employerName': {
      label: 'Employer Name',
      name: 'occupational-employer-name',
    },
    'sickLeaveStartDate': {
      label: 'Sick Leave Start Date',
      name: 'occupational-sick-leave-start-date',
    },
    'sickLeaveEndDate': {
      label: 'Sick Leave End Date',
      name: 'occupational-sick-leave-end-date',
    },
    'consultDate': {
      label: 'Consult Date',
      name: 'consult-date',
    },
    'specialist': {
      label: 'Specialist',
      name: 'specialist',
    },
    'description': {
      label: 'Description',
      name: 'description',
    },
  };

  export { formModelNameMapping}