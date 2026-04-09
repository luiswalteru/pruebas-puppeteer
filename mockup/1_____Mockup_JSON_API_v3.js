module.exports = {
  configuration: {
    name: "Boleta 22-09 - prueba C",
    type: "standard",
    education_year_id: "ey-es-07",
    education_year_level: "Primaria",
    education_year_year: "4.º",
    report_date_period: "2025-2026",
    report_date: "22-09-2025",
    school_group: {
      id: "35061210-30cb-11f0-8967-c5540259be55",
      name: "Clase personalización programas",
    },
    students: [
      {
        id: "782fda91-6216-11f0-b18e-33c6fcbca560",
        name: "Agustin",
        lastname: "Estudiante",
      },
      {
        id: "90c23860-3f04-11ed-827c-6107ee593ea2",
        name: "Carmen",
        lastname: "Student",
      },
      {
        id: "36724fc0-450c-11ef-9ef2-13b3f4d1b18e",
        name: "Eli",
        lastname: "Alumna",
      },
    ],
    evaluation_periods: [
      {
        id: "t01",
        name: "Trimestre 1",
      },
      {
        id: "t02",
        name: "Trimestre 2",
      },
      {
        id: "t03",
        name: "Trimestre 3",
      },
    ],
    orientation: "vertical",
    max_number_of_rows: "9",
    font_size: "14",
  },
  advanced: {
    evaluation_scale_id: "fdcfd77e-b15f-4e5c-94d1-b8d87fc4bfdc",
    show_averages: [
      {
        value: "FINAL_AVERAGES",
        label: "Promedios finales",
      },
      {
        value: "AVERAGES_BY_PERIOD",
        label: "Promedios por periodo",
      },
      {
        value: "AVERAGES_BY_SUBJECT",
        label: "Promedios por materia",
      },
      {
        value: "AVERAGES_BY_CLASS",
        label: "Promedios de la clase",
      },
    ],
    show_category_evaluation: true,
    show_materias: true,
  },
  school: {
    information_school: {
      school_name: "Colegio Nacional Alemeda",
      school_logo: [
        {
          id: "2f2358b3-674c-436f-b1e1-a50b3b911762",
          name: "logo04.png",
          url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/2f2358b3-674c-436f-b1e1-a50b3b911762/logo04.png",
        },
      ],
    },
    signatures: {
      signature_left: {
        title: "Director",
        name: "Thom Hansen",
        signature_images: [
          {
            id: "fceaa416-638d-4cc4-b44e-3b8bd1df7dc0",
            name: "firma001.png",
            url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/fceaa416-638d-4cc4-b44e-3b8bd1df7dc0/firma001.png",
          },
        ],
      },
      signature_right: {
        title: "Profesor",
        name: "Ramón Carriso",
        signature_images: [
          {
            id: "0f600d80-9c06-4d9a-b691-30c98ca3f8cf",
            name: "firma003.png",
            url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/0f600d80-9c06-4d9a-b691-30c98ca3f8cf/firma003.png",
          },
        ],
      },
    },
    information_contact: {
      school_adress: "Calle Alemeda Ramos 1500",
      school_phone: "000-0000-000000",
      school_email: "nacionalalameda@mail.com",
    },
    certifications: [
      {
        id: "139bc8a2-3a70-48f6-be6c-980eafe8ae9e",
        name: "mejore_anual.png",
        url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/139bc8a2-3a70-48f6-be6c-980eafe8ae9e/mejore_anual.png",
      },
      {
        id: "0af55455-52bc-42ff-a069-437b376652ba",
        name: "certification001.png",
        url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/0af55455-52bc-42ff-a069-437b376652ba/certification001.png",
      },
      {
        id: "50079601-62d9-4aec-ba6d-f33d4443853f",
        name: "certification002.png",
        url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/50079601-62d9-4aec-ba6d-f33d4443853f/certification002.png",
      },
      {
        id: "a28d0ede-0409-4ecf-bf60-03b8ff36d78b",
        name: "school_destacado.png",
        url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/a28d0ede-0409-4ecf-bf60-03b8ff36d78b/school_destacado.png",
      },
    ],
  },
  students: [
    {
      id: "90c23860-3f04-11ed-827c-6107ee593ea2",
      name: "Fabián Edgar Favret",
      lastname: "Favret",
      global_average: 8.8,
      courses: [
        {
          id: "90c23860-3f04-11ed-827c-6107ee593ea2",
          name: "Matemáticas",
          periods: [
            {
              id: ":id",
              period: "q01",
              name: "Bimestre 1",
              average: 8.5,
              categories: [
                {
                  id: ":cat_id",
                  name: ":cat_name",
                  average: ":average",
                },
              ],
            },
            {
              id: ":id",
              period: "q02",
              name: "Bimestre 2",
              average: 9,
            },
            {
              id: ":id",
              period: "q03",
              name: "Bimestre 3",
              average: 8.8,
            },
          ],
          average: {
            id: ":id",
            average: "score",
          },
        },
      ],
    },
  ],
  groupAverage: {
    score: ":score",
    scoreCalculated: 0.81,
  },
};
