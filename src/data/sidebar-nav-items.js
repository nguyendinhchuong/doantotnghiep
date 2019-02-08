export default function() {
  return [{
      title: "Chương trình đào tạo",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/educate-program",
    },
    {
      title: "Chuẩn đầu ra",
      htmlBefore: '<i class="material-icons">assignment_turned_in</i>',
      to: "/outcome-standard",
    },
    {
      title: "Đăng kí môn học",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/course-register",
    },
    {
      title: "Course maps",
      htmlBefore: '<i class="material-icons">map</i>',
      to: "/course-maps",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }
  ];
}
