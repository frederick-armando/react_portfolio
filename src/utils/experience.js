/**
 * Calculates years of experience since a start date.
 * Default start date: September 1st, 2018
 */
function getYearsOfExperience(startDate = new Date('2017-03-01')) {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  const m = now.getMonth() - startDate.getMonth();

  if (m < 0 || (m === 0 && now.getDate() < startDate.getDate())) {
    years--;
  }

  return years;
}

export const YEARS_OF_EXPERIENCE = getYearsOfExperience();
