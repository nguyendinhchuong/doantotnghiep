export const filterSubjects = (e, subjects) => {
  const re = new RegExp(e.query.toLowerCase());
  const results = subjects
    ? subjects.filter(item => {
        return re.test(item.SubjectName.toLowerCase());
      })
    : [];
  return results;
};

export const addSubjectInOnchange = (subjects, subject) => {
  if (checkExistsSubject(subjects, subject)) {
    return subjects;
  }
  return [...subjects, subject];
};

const checkExistsSubject = (subjects, subject) => {
  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i].SubjectName === subject.SubjectName) {
      return true;
    }
  }
  return false;
};
