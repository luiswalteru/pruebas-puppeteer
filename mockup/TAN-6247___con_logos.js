module.exports = {
  configuration: {
    name: "Titulo boleta",
    type: "standard",
    education_year_id: "ey-es-07",
    education_year_level: "Primaria",
    education_year_year: "4.º",
    report_date_period: "2026",
    report_date: "24-03-2026",
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
      {
        id: "f2c00a01-b2f8-11ef-8690-7dd43c8d1854",
        name: "Patris",
        lastname: "Tudent",
      },
      {
        id: "3e3d0441-34b0-11f0-821d-7d1930d5e999",
        name: "Paula Student",
        lastname: "Rubiera",
      },
      {
        id: "42cbc4a1-a310-11f0-9117-47c3dd474dea",
        name: "TestAlu",
        lastname: "Alumnotest",
      },
    ],
    only_students_group: false,
    evaluation_periods: [
      { id: "t01", name: "Trimestre 1" },
      { id: "t02", name: "Trimestre 2" },
      { id: "t03", name: "Trimestre 3" },
      { id: "s01", name: "Semestre 1" },
      { id: "s02", name: "Semestre 2" },
      { id: "annual", name: "Anual" },
    ],
    orientation: "vertical",
    max_number_of_rows: "10",
    font_size: "14",
  },
  advanced: {
    evaluation_scale_id: "268dc408-3b09-4aee-9ae2-e04cdd60ad1e",
    show_averages: [],
    show_category_evaluation: false,
    show_materias: false,
  },
  school: {
    information_school: {
      school_name: "test-happy-path 2",
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
        title: "aaaaaa",
        name: "bbbbbbbb",
        signature_images: [
          {
            id: "0f600d80-9c06-4d9a-b691-30c98ca3f8cf",
            name: "firma003.png",
            url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/0f600d80-9c06-4d9a-b691-30c98ca3f8cf/firma003.png",
          },
        ],
      },
      signature_right: {
        title: "cccc",
        name: "ddddd",
        signature_images: [
          {
            id: "831b03e7-b125-40c7-a3ff-3a9fa83481ab",
            name: "firma004.png",
            url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/831b03e7-b125-40c7-a3ff-3a9fa83481ab/firma004.png",
          },
        ],
      },
    },
    information_contact: {
      school_adress: "dddd",
      school_phone: "eeeeeee",
      school_email: "fffff",
    },
    certifications: [
      {
        id: "a28d0ede-0409-4ecf-bf60-03b8ff36d78b",
        name: "school_destacado.png",
        url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/a28d0ede-0409-4ecf-bf60-03b8ff36d78b/school_destacado.png",
      },
      {
        id: "50079601-62d9-4aec-ba6d-f33d4443853f",
        name: "certification002.png",
        url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/50079601-62d9-4aec-ba6d-f33d4443853f/certification002.png",
      },
      {
        id: "0af55455-52bc-42ff-a069-437b376652ba",
        name: "certification001.png",
        url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/0af55455-52bc-42ff-a069-437b376652ba/certification001.png",
      },
      {
        id: "139bc8a2-3a70-48f6-be6c-980eafe8ae9e",
        name: "mejore_anual.png",
        url: "https://tangerine-dev1-dev-content.s3.eu-central-1.amazonaws.com/139bc8a2-3a70-48f6-be6c-980eafe8ae9e/mejore_anual.png",
      },
    ],
  },
  students: [
    {
      id: "36724fc0-450c-11ef-9ef2-13b3f4d1b18e",
      name: "Eli",
      lastname: "Alumna",
      courses: [
        {
          id: "3b344290-7e66-11f0-8d3e-89b5aa43b165",
          name: "Power lesson 2 niveles",
          periods: [
            {
              id: "98310cd8-3165-4f6d-9b75-78d360f9c2e5",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
        },
        {
          id: "6aa2d2d0-30cd-11f0-8967-c5540259be55",
          name: "Programa power Carmen",
          periods: [
            {
              id: "613252f0-f4a5-47db-ae69-f2058ee928be",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
        },
        {
          id: "449480d0-30cc-11f0-8967-c5540259be55",
          name: "Programa Vanilla Carmen",
          periods: [
            {
              id: "7710df65-32ad-49bf-9f5a-b5fc9abbd932",
              average: null,
              averageCalculated: 0,
              period: "s01",
              name: "Semestre 1",
            },
          ],
        },
      ],
      groupAverage: null,
    },
    {
      id: "42cbc4a1-a310-11f0-9117-47c3dd474dea",
      name: "TestAlu",
      lastname: "Alumnotest",
      courses: [
        {
          id: "449480d0-30cc-11f0-8967-c5540259be55",
          name: "Programa Vanilla Carmen",
          periods: [
            {
              id: "e44c7cdd-8c7d-48de-a4c0-f09ab39c53a9",
              average: null,
              averageCalculated: 0,
              period: "s01",
              name: "Semestre 1",
            },
          ],
        },
      ],
      groupAverage: null,
    },
    {
      id: "782fda91-6216-11f0-b18e-33c6fcbca560",
      name: "Agustin",
      lastname: "Estudiante",
      courses: [
        {
          id: "6aa2d2d0-30cd-11f0-8967-c5540259be55",
          name: "Programa power Carmen",
          periods: [
            {
              id: "3d30c25c-2fe6-49d9-b947-620ed3609645",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
        },
        {
          id: "449480d0-30cc-11f0-8967-c5540259be55",
          name: "Programa Vanilla Carmen",
          periods: [
            {
              id: "1a581c24-d1ae-4d8e-a8f0-1f4f4c6c32fd",
              average: null,
              averageCalculated: 0,
              period: "s01",
              name: "Semestre 1",
            },
          ],
        },
      ],
      groupAverage: null,
    },
    {
      id: "3e3d0441-34b0-11f0-821d-7d1930d5e999",
      name: "Paula Student",
      lastname: "Rubiera",
      courses: [
        {
          id: "6aa2d2d0-30cd-11f0-8967-c5540259be55",
          name: "Programa power Carmen",
          periods: [
            {
              id: "97010308-ec19-4c1e-b83a-1cd32e72aacc",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
        },
        {
          id: "449480d0-30cc-11f0-8967-c5540259be55",
          name: "Programa Vanilla Carmen",
          periods: [
            {
              id: "6a738893-e9e8-44f8-a14b-e22673f727af",
              average: null,
              averageCalculated: 0,
              period: "s01",
              name: "Semestre 1",
            },
          ],
        },
      ],
      groupAverage: null,
    },
    {
      id: "90c23860-3f04-11ed-827c-6107ee593ea2",
      name: "Carmen",
      lastname: "Student",
      courses: [
        {
          id: "3b344290-7e66-11f0-8d3e-89b5aa43b165",
          name: "Power lesson 2 niveles",
          periods: [
            {
              id: "ea123783-c697-4a28-b2ed-1fa059585c49",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
        },
        {
          id: "6aa2d2d0-30cd-11f0-8967-c5540259be55",
          name: "Programa power Carmen",
          periods: [
            {
              id: "a5be26ad-4bd3-4693-a692-51be42cfe531",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
            {
              id: "a10991fb-e07d-414c-ab39-a1db11f85c06",
              average: "8",
              averageCalculated: 0.8,
              period: "t03",
              name: "Trimestre 3",
            },
          ],
        },
        {
          id: "449480d0-30cc-11f0-8967-c5540259be55",
          name: "Programa Vanilla Carmen",
          periods: [
            {
              id: "7ea09216-2310-4611-9984-9a61c80b30e5",
              average: null,
              averageCalculated: 0,
              period: "s01",
              name: "Semestre 1",
            },
          ],
        },
      ],
      groupAverage: null,
    },
    {
      id: "f2c00a01-b2f8-11ef-8690-7dd43c8d1854",
      name: "Patris",
      lastname: "Tudent",
      courses: [
        {
          id: "6aa2d2d0-30cd-11f0-8967-c5540259be55",
          name: "Programa power Carmen",
          periods: [
            {
              id: "b2278f9d-19c8-4b8f-a381-e72f716a9ff1",
              average: null,
              averageCalculated: 0,
              period: "t01",
              name: "Trimestre 1",
            },
          ],
        },
        {
          id: "449480d0-30cc-11f0-8967-c5540259be55",
          name: "Programa Vanilla Carmen",
          periods: [
            {
              id: "fc6e57be-c959-4115-b70f-121cd7f30cb7",
              average: null,
              averageCalculated: 0,
              period: "s01",
              name: "Semestre 1",
            },
          ],
        },
      ],
      groupAverage: null,
    },
  ],
};
