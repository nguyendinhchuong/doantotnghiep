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

const sortSemester = (a, b) => {
  if (a.semester > b.semester) return 1;
  if (a.semester < b.semester) return -1;
  return 0;
};

export const addSemester = (semester, subjects, semesters) => {
  let data = [...semesters];

  const index = data.findIndex(ele => ele.semester === semester);
  if (index > -1) {
    data[index].subjects = [...data[index].subjects, ...subjects];
  } else {
    let newSemester = { semester, subjects };
    data = [...data, newSemester];
  }
  data.sort(sortSemester);
  return data;
};
